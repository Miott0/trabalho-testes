import { Request, Response } from 'express';
import { UserController } from '../../src/controller/UserController';
import { IUserService } from '../../src/interface/IUserService';
import { IUser } from '../../src/interface/IUser';

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

  describe('createUser', () => {
    test('should create a new user and return status 201', async () => {
      const user: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
      mockUserService.createUser.mockResolvedValue(user);

      mockRequest.body = user;

      await userController.createUser(mockRequest, mockResponse);

      expect(mockUserService.createUser).toHaveBeenCalledWith(user);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    test('should return 400 if email is missing', async () => {
      mockRequest.body = { name: 'John Doe' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email and name are required' });
    });
  
    test('should return 400 if name is missing', async () => {
      mockRequest.body = { email: 'johndoe@example.com' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email and name are required' });
    });
  
    test('should return 400 if email format is invalid', async () => {
      mockRequest.body = { email: 'invalid-email', name: 'John Doe' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid email format' });
    });
  
    test('should return 400 if name is empty', async () => {
      mockRequest.body = { email: 'johndoe@example.com', name: ' ' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Name cannot be empty' });
    });

    test('should return 500 when createUser fails', async () => {
      mockUserService.createUser.mockRejectedValue(new Error('Creation failed'));

      mockRequest.body = { name: 'John Doe', email: 'johndoe@example.com' };

      await userController.createUser(mockRequest, mockResponse);

      expect(mockUserService.createUser).toHaveBeenCalledWith({ name: 'John Doe', email: 'johndoe@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error creating user: Creation failed' });
    });
  });

  describe('getUserById', () => {
    test('should return a user by ID', async () => {
      const user: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
      mockUserService.getUserById.mockResolvedValue(user);

      mockRequest.params = { id: '1' };

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    test('should return 400 when ID is invalid', async () => {
      mockRequest.params = { id: 'abc' };

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
    });

    test('should return 404 when user not found', async () => {
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
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching user: Retrieval failed' });
    });
  });

  describe('getAllUsers', () => {
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
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching users: Retrieval failed' });
    });
  });

  describe('updateUser', () => {
    test('should update a user and return updated user', async () => {
      const updatedUser: IUser = { id: 1, name: 'John Smith', email: 'johnsmith@example.com' };
      mockUserService.updateUser.mockResolvedValue(updatedUser);

      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockUserService.updateUser).toHaveBeenCalledWith(1, { name: 'John Smith', email: 'johnsmith@example.com' });
      expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
    });

    test('should return 400 when ID is invalid', async () => {
      mockRequest.params = { id: 'abc' };
      mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
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
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error updating user: Update failed' });
    });
  });

  describe('deleteUser', () => {
    test('should delete a user and return success message', async () => {
      mockUserService.deleteUser.mockResolvedValue(true);

      mockRequest.params = { id: '1' };

      await userController.deleteUser(mockRequest, mockResponse);

      expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    test('should return 400 when ID is invalid', async () => {
      mockRequest.params = { id: 'abc' };

      await userController.deleteUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
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
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error deleting user: Deletion failed' });
    });
  });
});
