import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'http://localhost:3000/users';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<User>(API_URL, user);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
