// src/interfaces/IUserService.ts
import { IUser } from './IUser';

export interface IUserService {
  createUser(user: IUser): Promise<IUser>;
  getUserById(id: number): Promise<IUser | null>;
  getAllUser(): Promise<IUser[]>
  deleteUser(id:number): Promise<boolean>
  updateUser(id:number, userData: Partial<IUser>): Promise<IUser | null>
}
