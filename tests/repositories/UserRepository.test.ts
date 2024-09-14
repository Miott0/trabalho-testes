import { UserRepository } from "../../src/repositories/UserRepository";
import { IUser } from "../../src/interface/IUser";
import { prismaMock } from '../../src/singleton';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('deve criar um usuário com sucesso', async () => {
    const userData: IUser = { id: 1, name: 'John Doe', email: 'teste@email.com' };
    prismaMock.user.create.mockResolvedValue(userData as any);

    const newUser = await userRepository.addUser(userData);

    expect(newUser).toEqual(userData);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: userData.email,
        name: userData.name,
      },
    });
  });

  it('deve dar erro ao falhar na criação do usuário', async () => {
    const errorMessage = 'Error creating user';
    prismaMock.user.create.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.addUser({ id: 1, name: 'John Doe', email: 'teste@email.com' }))
      .rejects
      .toThrow(`Error creating user: ${errorMessage}`);
  });

  it('deve retornar um usuário através do ID', async () => {
    const userData: IUser = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
    prismaMock.user.findUnique.mockResolvedValue(userData as any);

    const foundUser = await userRepository.getUserById(userData.id as number);

    expect(foundUser).toEqual(userData);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: userData.id },
    });
  });

  it('deve retornar nulo quando o usuário com o ID solicitado não existir', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const foundUser = await userRepository.getUserById(999);

    expect(foundUser).toBeNull();
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });

  it('deve retornar um usuário quando encontrar o usuário com o e-mail enviado', async () => {
    const userData: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    prismaMock.user.findUnique.mockResolvedValue(userData as any);

    const user = await userRepository.getUserByEmail('johndoe@example.com');

    expect(user).toEqual(userData);
  });

  it('deve retornar nulo quando nenhum usuário com o e-mail enviado foi encontrado', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const user = await userRepository.getUserByEmail('nonexistent@example.com');

    expect(user).toBeNull();
  });

  it('deve dar erro quando há um problema com o BD', async () => {
    const errorMessage = 'Database connection error';
    prismaMock.user.findUnique.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.getUserByEmail('error@example.com')).rejects.toThrow(
      `Error getting user with email error@example.com: ${errorMessage}`
    );
  });

  it('deve retornar todos os usuários', async () => {
    const usersData: IUser[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];
    prismaMock.user.findMany.mockResolvedValue(usersData as any);

    const users = await userRepository.getAllUsers();

    expect(users).toEqual(usersData);
    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });

  it('deve dar erro quando falhar em encontrar todos os usuários', async () => {
    const errorMessage = 'Error getting users';
    prismaMock.user.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.getAllUsers())
      .rejects
      .toThrow(`Error getting users: ${errorMessage}`);
  });

  it('deve dar erro quando falhar ao retornar um usuário', async () => {
    const errorMessage = 'Error getting user';
    prismaMock.user.findUnique.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.getUserById(1))
      .rejects
      .toThrow(`Error getting user with ID 1: ${errorMessage}`);
  });

  it('deve conseguir atualizar um usuário', async () => {
    const userData: IUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const updatedData: Partial<IUser> = { name: 'John Smith' };
    const updatedUser: IUser = { ...userData, ...updatedData };

    prismaMock.user.update.mockResolvedValue(updatedUser as any);

    const result = await userRepository.updateUser(userData.id as number, updatedData);

    expect(result).toEqual(updatedUser);
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: userData.id },
      data: updatedData,
    });
  });

  it('deve dar erro ao falhar em atualizar um usuário', async () => {
    const errorMessage = 'Error updating user';
    prismaMock.user.update.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.updateUser(1, { name: 'New Name' }))
      .rejects
      .toThrow(`Error updating user with ID 1: ${errorMessage}`);
  });

  it('deve excluir um usuário através do ID', async () => {
    prismaMock.user.delete.mockResolvedValue({} as any);

    const isDeleted = await userRepository.deleteUser(1);

    expect(isDeleted).toBe(true);
    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('deve dar erro quando falhar em excluir um usuário', async () => {
    const errorMessage = 'Error deleting user';
    prismaMock.user.delete.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.deleteUser(1))
      .rejects
      .toThrow(`Error deleting user with ID 1: ${errorMessage}`);
  });
});
