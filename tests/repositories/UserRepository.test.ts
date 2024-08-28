import { UserRepository } from '../../src/repositories/UserRepository';
import { IUser } from '../../src/interface/IUser';
import { PrismaClient, Prisma } from '@prisma/client';

// Criando uma versão mock do PrismaClient
const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

// Criando uma classe mock para simular `PrismaClientKnownRequestError`
class MockPrismaClientKnownRequestError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

// Fazendo o mock do PrismaClient para usar nossa versão mock
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
    Prisma: {
      PrismaClientKnownRequestError: MockPrismaClientKnownRequestError,
    },
  };
});

describe('UserRepository', () => {
  let sut: UserRepository;

  beforeEach(() => {
    sut = new UserRepository();
  });

  test('should create a new user', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const mockUser = { id: 1, ...user };
    (mockPrisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const newUser = await sut.createUser(user);

    expect(newUser).toEqual(mockUser);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: { email: 'john@example.com', name: 'John Doe' },
    });
  });

  test('should return user by id', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const foundUser = await sut.getUserById(1);
    expect(foundUser).toEqual(mockUser);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('should throw error if user is not found by id', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(sut.getUserById(999)).rejects.toThrow('User with ID 999 not found');
  });

  test('should return all users', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];
    (mockPrisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const users = await sut.getAllUsers();
    expect(users).toEqual(mockUsers);
    expect(mockPrisma.user.findMany).toHaveBeenCalled();
  });

  test('should update a user', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const updatedUser = { id: 1, name: 'John Updated', email: 'john@example.com' };
    (mockPrisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const result = await sut.updateUser(1, { name: 'John Updated' });

    expect(result).toEqual(updatedUser);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'John Updated' },
    });
  });

  test('should throw error when trying to update a non-existent user', async () => {
    (mockPrisma.user.update as jest.Mock).mockRejectedValue(
      new MockPrismaClientKnownRequestError('Usuário não encontrado.', 'P2025')
    );

    await expect(sut.updateUser(999, { name: 'Non-existent User' })).rejects.toThrow('Usuário não encontrado.');
  });

  test('should delete a user', async () => {
    (mockPrisma.user.delete as jest.Mock).mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

    const isDeleted = await sut.deleteUser(1);
    expect(isDeleted).toBe(true);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('should return false when trying to delete a non-existent user', async () => {
    (mockPrisma.user.delete as jest.Mock).mockRejectedValue(
      new MockPrismaClientKnownRequestError('Registro não encontrado.', 'P2025')
    );

    const isDeleted = await sut.deleteUser(999);
    expect(isDeleted).toBe(false);
  });
});