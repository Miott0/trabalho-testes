import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../interface/IUserRepository';
import { IUser } from '../interface/IUser';

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {

  async createUser(user: IUser): Promise<IUser> {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
      },
    });
    return newUser;
  }

  async getUserById(id: number): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return prisma.user.findMany();
  }

  async updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      return null;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
