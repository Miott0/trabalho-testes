import { IUserService } from '../interface/IUserService';
import { IUser } from '../interface/IUser';
import { IUserRepository } from '../interface/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(user: IUser): Promise<IUser> {
    return await this.userRepository.createUser(user);
  }

  async getUserById(id: number): Promise<IUser | null> {
    return await this.userRepository.getUserById(id);
  }

  async getAllUser(): Promise<IUser[]> {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
    return await this.userRepository.updateUser(id, userData);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.deleteUser(id);
  }
}