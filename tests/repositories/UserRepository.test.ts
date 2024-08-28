import { UserRepository } from '../../src/repositories/UserRepository';
import { IUser } from '../../src/interface/IUser';
import { Prisma, PrismaClient } from '@prisma/client';


jest.mock('@prisma/client', () => {
  const createMock = jest.fn();
  const findUniqueMock = jest.fn();
  const findManyMock = jest.fn();
  const updateMock = jest.fn();
  const deleteMock = jest.fn();

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        create: createMock,
        findUnique: findUniqueMock,
        findMany: findManyMock,
        update: updateMock,
        delete: deleteMock,
      },
    })),
    Prisma: {
      PrismaClientKnownRequestError: class extends Error {
        code: string;
        constructor(message: string, code: string) {
          super(message);
          this.code = code;
        }
      },
    },
  };
});

describe('UserRepository', () => {
  let sut: UserRepository;
  let mockPrisma: {
    user: {
      create: jest.MockedFunction<typeof PrismaClient.prototype.user.create>;
      findUnique: jest.MockedFunction<typeof PrismaClient.prototype.user.findUnique>;
      findMany: jest.MockedFunction<typeof PrismaClient.prototype.user.findMany>;
      update: jest.MockedFunction<typeof PrismaClient.prototype.user.update>;
      delete: jest.MockedFunction<typeof PrismaClient.prototype.user.delete>;
    };
  };

  beforeEach(() => {
    sut = new UserRepository();
    mockPrisma = new PrismaClient() as unknown as typeof mockPrisma;
  });

  test('should create a new user', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const mockUser = { id: 1, name: user.name ?? null, email: user.email };
    mockPrisma.user.create.mockResolvedValue(mockUser);

    const newUser = await sut.createUser(user);

    expect(newUser).toEqual(mockUser);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: { email: 'john@example.com', name: 'John Doe' },
    });
});

  test('should return user by id', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    const foundUser = await sut.getUserById(1);
    expect(foundUser).toEqual(mockUser);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('should throw error if user is not found by id', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(sut.getUserById(999)).rejects.toThrow('User with ID 999 not found');
  });

  test('should return all users', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];
    mockPrisma.user.findMany.mockResolvedValue(mockUsers);

    const users = await sut.getAllUsers();
    expect(users).toEqual(mockUsers);
    expect(mockPrisma.user.findMany).toHaveBeenCalled();
  });

  test('should update a user', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const updatedUser = { id: 1, name: 'John Updated', email: 'john@example.com' };
    mockPrisma.user.update.mockResolvedValue(updatedUser);

    const result = await sut.updateUser(1, { name: 'John Updated' });

    expect(result).toEqual(updatedUser);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'John Updated' },
    });
  });

  test('should throw error when trying to update a non-existent user', async () => {
    const mockError = new (jest.requireMock('@prisma/client').Prisma.PrismaClientKnownRequestError)('Usuário não encontrado.', 'P2025');
  
    mockPrisma.user.update.mockRejectedValue(mockError);
  
    await expect(sut.updateUser(999, { name: 'Non-existent User' })).rejects.toThrow('Usuário não encontrado.');
  });
  

  test('should delete a user', async () => {
    mockPrisma.user.delete.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

    const isDeleted = await sut.deleteUser(1);
    expect(isDeleted).toBe(true);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('should return false when trying to delete a non-existent user', async () => {
    const mockError = new (jest.requireMock('@prisma/client').Prisma.PrismaClientKnownRequestError)('Registro não encontrado.', 'P2025');
  
    mockPrisma.user.delete.mockRejectedValue(mockError);
  
    const isDeleted = await sut.deleteUser(999);
    expect(isDeleted).toBe(false);
  });

  test('should throw an error if email is not provided when creating a user', async () => {
    const user: IUser = { name: 'John Doe', email: '' }; // Email vazio
    await expect(sut.createUser(user)).rejects.toThrow('Email é obrigatório.');
  });

  test('should throw an error if name is not provided when creating a user', async () => {
    const user: IUser = { name: '', email: 'john@example.com' }; // Nome vazio
    await expect(sut.createUser(user)).rejects.toThrow('Nome é obrigatório.');
  });

  test('should throw an error if updated name is null', async () => {
    // Simulando que o Prisma retorna um usuário com o campo `name` como `null`
    const updatedUser = { id: 1, name: null, email: 'john@example.com' } as any;
    mockPrisma.user.update.mockResolvedValue(updatedUser);

    // Agora verifica se o repositório lança o erro esperado ao receber `name` como `null` do Prisma
    await expect(sut.updateUser(1, { name: 'Valid Name' })).rejects.toThrow('O campo "name" não pode ser nulo.');
  });


  test('should throw error with message when PrismaClientKnownRequestError is not P2025', async () => {
    const mockError = new (jest.requireMock('@prisma/client').Prisma.PrismaClientKnownRequestError)({
        message: 'Erro desconhecido.',
        code: 'PXXXX',
        clientVersion: '3.0.0',
    });

    // Certifique-se de que o mockError.message seja tratado como uma string
    mockError.message = 'Erro desconhecido.';

    mockPrisma.user.update.mockRejectedValue(mockError);

    await expect(sut.updateUser(1, { name: 'John Updated' })).rejects.toThrow('Erro ao atualizar o usuário: Erro desconhecido.');
  });



  test('should throw generic error if caught error is not an instance of Error', async () => {
    mockPrisma.user.delete.mockRejectedValue('Unknown Error'); // Simula erro que não é uma instância de `Error`

    await expect(sut.deleteUser(1)).rejects.toThrow('Erro desconhecido ao deletar o usuário.');
  });

  test('should rethrow a non-PrismaClientKnownRequestError during update', async () => {
    const genericError = new Error('Generic Error');
    mockPrisma.user.update.mockRejectedValue(genericError);

    await expect(sut.updateUser(1, { name: 'John Updated' })).rejects.toThrow('Erro ao atualizar o usuário: Generic Error');
  });
  
  test('should throw an error if createUser fails', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };

    // Simula uma falha ao criar um usuário
    const mockError = new Error('Falha ao criar usuário');
    mockPrisma.user.create.mockRejectedValue(mockError);

    // Espera que o repositório lance um erro com a mensagem formatada
    await expect(sut.createUser(user)).rejects.toThrow('Erro ao criar usuário: Falha ao criar usuário');
  });
  test('should throw an error if deleteUser fails with a general error', async () => {
    const mockError = new Error('Falha ao deletar usuário');
    mockPrisma.user.delete.mockRejectedValue(mockError);

    // Espera que o repositório lance um erro com a mensagem formatada
    await expect(sut.deleteUser(1)).rejects.toThrow('Erro ao deletar o usuário: Falha ao deletar usuário');
  });

  test('should throw an error if neither name nor email is provided for update', async () => {
    // Chama o método updateUser sem fornecer name ou email
    await expect(sut.updateUser(1, {})).rejects.toThrow(
        "Pelo menos um dos campos (name ou email) deve ser fornecido para atualização."
    );
  });

});