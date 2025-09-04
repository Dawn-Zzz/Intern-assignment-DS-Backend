import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: any;
  let jwtService: any;

  beforeEach(async () => {
    const mockPrisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const mockJwt = {
      sign: jest.fn().mockReturnValue('mock-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signup successfully', async () => {
    prismaService.user.findUnique.mockResolvedValue(null);
    prismaService.user.create.mockResolvedValue({
      id: 1,
      name: 'Test',
      email: 'test@test.com',
    });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

    const result = await service.signup('Test', 'test@test.com', '123456');
    
    expect(result.message).toBe('User created successfully');
  });

  it('should login successfully', async () => {
    prismaService.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      passwordHash: 'hashed',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login('test@test.com', '123456');
    
    expect(result.message).toBe('Login successful');
    expect(result.accessToken).toBe('mock-token');
  });
});
