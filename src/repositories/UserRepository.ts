import { IUserRepository } from '../interface/IUserRepository';
import { IUser } from '../interface/IUser';

export class UserRepository implements IUserRepository {
  private users: IUser[] = [];

  async createUser(user: IUser): Promise<IUser> {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: number): Promise<IUser | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.users;
  }

  async updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return null;
    }

    const updatedUser = { ...this.users[userIndex], ...userData };
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}