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
    test('deve criar um novo usuário e retornar status 201 (status created)', async () => {
      const user: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
      mockUserService.createUser.mockResolvedValue(user);

      mockRequest.body = user;

      await userController.createUser(mockRequest, mockResponse);

      expect(mockUserService.createUser).toHaveBeenCalledWith(user);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    test('Deve retornar erro 400 se o email estiver faltando', async () => {
      mockRequest.body = { name: 'John Doe' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email and name are required' });
    });
  
    test('deve retornar 400 se não houver nome', async () => {
      mockRequest.body = { email: 'johndoe@example.com' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email and name are required' });
    });
  
    test('deve retornar 400 se o formato de e-mail for invalido', async () => {
      mockRequest.body = { email: 'invalid-email', name: 'John Doe' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid email format' });
    });
  
    test('deve retornar 400 se o nome for vazio', async () => {
      mockRequest.body = { email: 'johndoe@example.com', name: ' ' };
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Name cannot be empty' });
    });

    test('deve retornar 500 (internal server error) quando falhar na criação de usuário', async () => {
      mockUserService.createUser.mockRejectedValue(new Error('Creation failed'));

      mockRequest.body = { name: 'John Doe', email: 'johndoe@example.com' };

      await userController.createUser(mockRequest, mockResponse);

      expect(mockUserService.createUser).toHaveBeenCalledWith({ name: 'John Doe', email: 'johndoe@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error creating user: Creation failed' });
    });
  });

  describe('getUserById', () => {
    test('deve retornar um usuário através do ID', async () => {
      const user: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
      mockUserService.getUserById.mockResolvedValue(user);

      mockRequest.params = { id: '1' };

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    test('deve retornar erro 400 (bad request) quando o ID for inválido', async () => {
      mockRequest.params = { id: 'abc' };

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
    });

    test('deve retornar 404 quando não acha o usuário (not found)', async () => {
      mockUserService.getUserById.mockResolvedValue(null);

      mockRequest.params = { id: '1' };

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('deve retornar 500 quando falhar ao usar o método getUserById', async () => {
      mockUserService.getUserById.mockRejectedValue(new Error('Retrieval failed'));

      mockRequest.params = { id: '1' };

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching user: Retrieval failed' });
    });
  });

  describe('getAllUsers', () => {
    test('deve retornar todos os usuários', async () => {
      const users: IUser[] = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
      ];
      mockUserService.getAllUser.mockResolvedValue(users);

      await userController.getAllUsers(mockRequest, mockResponse);

      expect(mockUserService.getAllUser).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(users);
    });

    test('deve retornar 500 quando falhar ao puxar todos os usuários', async () => {
      mockUserService.getAllUser.mockRejectedValue(new Error('Retrieval failed'));

      await userController.getAllUsers(mockRequest, mockResponse);

      expect(mockUserService.getAllUser).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching users: Retrieval failed' });
    });
  });

  describe('updateUser', () => {
    test('deve atualizar um usuário e retornar o mesmo atualizado', async () => {
      const updatedUser: IUser = { id: 1, name: 'John Smith', email: 'johnsmith@example.com' };
      mockUserService.updateUser.mockResolvedValue(updatedUser);

      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockUserService.updateUser).toHaveBeenCalledWith(1, { name: 'John Smith', email: 'johnsmith@example.com' });
      expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
    });

    test('deve retornar 400 quando o ID é inválido', async () => {
      mockRequest.params = { id: 'abc' };
      mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
    });

    test('deve retornar 404 quando tentar atualizar um usuário que não existe', async () => {
      mockUserService.updateUser.mockResolvedValue(null);

      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'John Smith', email: 'johnsmith@example.com' };

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockUserService.updateUser).toHaveBeenCalledWith(1, { name: 'John Smith', email: 'johnsmith@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('deve retornar 500 quando falhar ao atualizar o usuario', async () => {
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
    test('deve excluir um usuário e retornar uma mensagem informando o sucesso', async () => {
      mockUserService.deleteUser.mockResolvedValue(true);

      mockRequest.params = { id: '1' };

      await userController.deleteUser(mockRequest, mockResponse);

      expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    test('deve retornar 400 quando o ID é inválido', async () => {
      mockRequest.params = { id: 'abc' };

      await userController.deleteUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
    });

    test('deve retornar 404 quando tentar excluir um usuário não existente', async () => {
      mockUserService.deleteUser.mockResolvedValue(false);

      mockRequest.params = { id: '1' };

      await userController.deleteUser(mockRequest, mockResponse);

      expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('deve retornar 500 quando falhar na tentativa de excluir o usuário', async () => {
      mockUserService.deleteUser.mockRejectedValue(new Error('Deletion failed'));

      mockRequest.params = { id: '1' };

      await userController.deleteUser(mockRequest, mockResponse);

      expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error deleting user: Deletion failed' });
    });
  });
});
