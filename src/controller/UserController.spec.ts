/* import request from 'supertest';
import express, { Express } from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from './UserController';
import { IUserService } from '../interface/IUserService';
import { IUser } from '../interface/IUser';

// Mock the UserService
jest.mock('../service/UserService');

const mockUserService: jest.Mocked<IUserService> = {
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

import { UserService } from '../service/UserService';
(UserService as jest.Mock).mockImplementation(() => mockUserService);

const app: Express = express();
app.use(express.json());
app.post('/users', createUser);
app.get('/users/:id', getUser);
app.get('/users', getAllUsers);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

describe('User Controller', () => {
  
  it('should create a new user', async () => {
    const user: IUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockUserService.createUser.mockResolvedValue(user);

    const response = await request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(201);

    // Check if the response body matches the expected user object
    expect(response.body).toEqual(user);
    expect(mockUserService.createUser).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com' });
  });

  it('should return a user by ID', async () => {
    const user: IUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockUserService.getUserById.mockResolvedValue(user);

    const response = await request(app).get('/users/1').expect(200);

    expect(response.body).toEqual(user);
    expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
  });

  it('should return 404 if user not found', async () => {
    mockUserService.getUserById.mockResolvedValue(null);

    const response = await request(app).get('/users/1').expect(404);

    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('should update an existing user', async () => {
    const updatedUser: IUser = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
    mockUserService.updateUser.mockResolvedValue(updatedUser);

    const response = await request(app)
      .put('/users/1')
      .send({ name: 'Jane Doe', email: 'jane@example.com' })
      .expect(200);

    expect(response.body).toEqual(updatedUser);
    expect(mockUserService.updateUser).toHaveBeenCalledWith(1, { name: 'Jane Doe', email: 'jane@example.com' });
  });

  it('should delete a user', async () => {
    mockUserService.deleteUser.mockResolvedValue(true);

    const response = await request(app).delete('/users/1').expect(200);

    expect(response.body).toEqual({ message: 'User deleted successfully' });
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
  });

  it('should return 404 when deleting a non-existent user', async () => {
    mockUserService.deleteUser.mockResolvedValue(false);

    const response = await request(app).delete('/users/1').expect(404);

    expect(response.body).toEqual({ message: 'User not found' });
  });
});
 */

