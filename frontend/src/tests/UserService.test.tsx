import axios from 'axios';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import { User } from '../types/User';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('userService', () => {
  const API_URL = 'http://localhost:3000/users';
  const mockUser: User = { id: 1 as number, name: 'John Doe', email: 'john@example.com' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should fetch users successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: [mockUser] });

      const users = await getUsers();
      expect(users).toEqual([mockUser]);
      expect(mockedAxios.get).toHaveBeenCalledWith(API_URL);
    });

    it('should throw an error if fetching users fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(getUsers()).rejects.toThrow('Failed to fetch users');
      expect(mockedAxios.get).toHaveBeenCalledWith(API_URL);
    });
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      mockedAxios.post.mockResolvedValue({ data: mockUser });

      const user = await createUser(mockUser);
      expect(user).toEqual(mockUser);
      expect(mockedAxios.post).toHaveBeenCalledWith(API_URL, mockUser);
    });

    it('should throw an error if creating user fails', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      await expect(createUser(mockUser)).rejects.toThrow('Failed to create user');
      expect(mockedAxios.post).toHaveBeenCalledWith(API_URL, mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const updatedUser = { ...mockUser, name: 'Jane Doe' };
      mockedAxios.put.mockResolvedValue({ data: updatedUser });

      const user = await updateUser(updatedUser);
      expect(user).toEqual(updatedUser);
      expect(mockedAxios.put).toHaveBeenCalledWith(`${API_URL}/${updatedUser.id}`, updatedUser);
    });

    it('should throw an error if updating user fails', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Network error'));

      await expect(updateUser(mockUser)).rejects.toThrow('Failed to update user');
      expect(mockedAxios.put).toHaveBeenCalledWith(`${API_URL}/${mockUser.id}`, mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      mockedAxios.delete.mockResolvedValue({});

      await deleteUser(mockUser.id as number);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/${mockUser.id}`);
    });

    it('should throw an error if deleting user fails', async () => {
      mockedAxios.delete.mockRejectedValue(new Error('Network error'));

      await expect(deleteUser(mockUser.id as number)).rejects.toThrow('Failed to delete user');
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/${mockUser.id}`);
    });
  });
});
