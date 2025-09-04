import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get profile', async () => {
    const mockRequest = {
      user: { id: 1, name: 'Test', email: 'test@test.com' }
    };

    const result = await controller.getProfile(mockRequest);
    
    expect(result.message).toBe('User profile retrieved successfully');
    expect(result.user).toEqual(mockRequest.user);
  });
});
