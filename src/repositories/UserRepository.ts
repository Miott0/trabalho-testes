import prisma from "../client"; 
import { IUserRepository } from "../interface/IUserRepository";
import { IUser } from "../interface/IUser";
export class UserRepository implements IUserRepository {
  async addUser(user: IUser): Promise<IUser> {
    try {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
        },
      });
      return newUser;
    } catch (err: any) {
      throw new Error(`Error creating user: ${err.message}`);
    }
  }

  async getUserById(id: number): Promise<IUser | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (err: any) {
      throw new Error(`Error getting user with ID ${id}: ${err.message}`);
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (err: any) {
      throw new Error(`Error getting user with email ${email}: ${err.message}`);
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (err: any) {
      throw new Error(`Error getting users: ${err.message}`);
    }
  }

  async updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (err: any) {
      throw new Error(`Error updating user with ID ${id}: ${err.message}`);
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (err: any) {
      throw new Error(`Error deleting user with ID ${id}: ${err.message}`);
    }
  }
}
