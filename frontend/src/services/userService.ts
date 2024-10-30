import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'http://localhost:3000/users';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // re-lança o erro para tratamento adicional
  }
};
export const createUser = async (user: User) => (await axios.post<User>(API_URL, user)).data;
export const updateUser = async (user: User) =>
  (await axios.put<User>(`${API_URL}/${user.id}`, user)).data;
export const deleteUser = async (id: number) => await axios.delete(`${API_URL}/${id}`);