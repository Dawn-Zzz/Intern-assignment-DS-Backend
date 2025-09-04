import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: any;

  beforeEach(async () => {
    const mockAuthService = {
      signup: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signup', async () => {
    const dto = { name: 'Test', email: 'test@test.com', password: '123456' };
    authService.signup.mockResolvedValue({ message: 'Success' });

    const result = await controller.signup(dto);
    
    expect(authService.signup).toHaveBeenCalledWith('Test', 'test@test.com', '123456');
    expect(result.message).toBe('Success');
  });

  it('should login', async () => {
    const dto = { email: 'test@test.com', password: '123456' };
    authService.login.mockResolvedValue({ message: 'Login successful' });

    const result = await controller.login(dto);
    
    expect(authService.login).toHaveBeenCalledWith('test@test.com', '123456');
    expect(result.message).toBe('Login successful');
  });
});
