import { IUser } from './IUser';

export interface IUserRepository {
  addUser(user: IUser): Promise<IUser>;
  getUserById(id: number): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
  updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: number): Promise<boolean>;
}