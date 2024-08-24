import { Request, Response } from 'express';
import { UserController } from './UserController';
import { IUserService } from '../interface/IUserService';
import { IUser } from '../interface/IUser';

// Mocks
const mockUserService: jest.Mocked<IUserService> = {
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe('UserController', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController(mockUserService);
    jest.clearAllMocks();
  });


  test('Espera criar um novo usuario', async () => {
    const user: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    mockUserService.createUser.mockResolvedValue(user);

    mockRequest.body = user;

    await userController.createUser(mockRequest, mockResponse);

    expect(mockUserService.createUser).toHaveBeenCalledWith(user);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  test('Espera retornar 500 quando createUser falhar', async () => {
    mockUserService.createUser.mockRejectedValue(new Error('Creation failed'));

    mockRequest.body = { name: 'John Doe', email: 'johndoe@example.com' };

    await userController.createUser(mockRequest, mockResponse);

    expect(mockUserService.createUser).toHaveBeenCalledWith({ name: 'John Doe', email: 'johndoe@example.com' });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error creating user' });
  });

  test('Espera retornar um usuario pelo ID', async () => {
    const user: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    mockUserService.getUserById.mockResolvedValue(user);

    mockRequest.params = { id: '1' };

    await userController.getUserById(mockRequest, mockResponse);

    expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  test('Espera retornar 404 qaundo usuario nao for encontrado', async () => {
    mockUserService.getUserById.mockResolvedValue(null);

    mockRequest.params = { id: '1' };

    await userController.getUserById(mockRequest, mockResponse);

    expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  test('should return 500 when getUserById fails', async () => {
    mockUserService.getUserById.mockRejectedValue(new Error('Retrieval failed'));

    mockRequest.params = { id: '1' };

    await userController.getUserById(mockRequest, mockResponse);

    expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching user' });
  });

  test('should retrieve all users', async () => {
    const users: IUser[] = [
      { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
    ];
    mockUserService.getAllUser.mockResolvedValue(users);

    await userController.getAllUsers(mockRequest, mockResponse);

    expect(mockUserService.getAllUser).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith(users);
  });

  test('should return 500 when getAllUsers fails', async () => {
    mockUserService.getAllUser.mockRejectedValue(new Error('Retrieval failed'));

    await userController.getAllUsers(mockRequest, mockResponse);

    expect(mockUserService.getAllUser).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching users' });
  });

  test('should update a user', async () => {
    const updatedUser: IUser = { id: 1, name: 'John Smith', email: 'johnsmith@example.com' };
    mockUserService.updateUser.mockResolvedValue(updatedUser);

    mockRequest.params = { id: '1' };
    mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

    await userController.updateUser(mockRequest, mockResponse);

    expect(mockUserService.updateUser).toHaveBeenCalledWith(1, { name: 'John Smith', email: 'johnsmith@example.com' });
    expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
  });

  test('should return 404 when trying to update a non-existent user', async () => {
    mockUserService.updateUser.mockResolvedValue(null);

    mockRequest.params = { id: '1' };
    mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

    await userController.updateUser(mockRequest, mockResponse);

    expect(mockUserService.updateUser).toHaveBeenCalledWith(1, { name: 'John Smith', email: 'johnsmith@example.com' });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  test('should return 500 when updateUser fails', async () => {
    mockUserService.updateUser.mockRejectedValue(new Error('Update failed'));

    mockRequest.params = { id: '1' };
    mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

    await userController.updateUser(mockRequest, mockResponse);

    expect(mockUserService.updateUser).toHaveBeenCalledWith(1, { name: 'John Smith', email: 'johnsmith@example.com' });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error updating user' });
  });

  test('should delete a user', async () => {
    mockUserService.deleteUser.mockResolvedValue(true);

    mockRequest.params = { id: '1' };

    await userController.deleteUser(mockRequest, mockResponse);

    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
  });

  test('should return 404 when trying to delete a non-existent user', async () => {
    mockUserService.deleteUser.mockResolvedValue(false);

    mockRequest.params = { id: '1' };

    await userController.deleteUser(mockRequest, mockResponse);

    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  test('should return 500 when deleteUser fails', async () => {
    mockUserService.deleteUser.mockRejectedValue(new Error('Deletion failed'));

    mockRequest.params = { id: '1' };

    await userController.deleteUser(mockRequest, mockResponse);

    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error deleting user' });
  });
});
