import { UserRepository } from "../../src/repositories/UserRepository";
import { IUser } from "../../src/interface/IUser";
import { prismaMock } from '../../src/singleton';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should create a user successfully', async () => {
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

  it('should throw an error when creating a user fails', async () => {
    const errorMessage = 'Error creating user';
    prismaMock.user.create.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.addUser({ id: 1, name: 'John Doe', email: 'teste@email.com' }))
      .rejects
      .toThrow(`Error creating user: ${errorMessage}`);
  });

  it('should retrieve a user by ID', async () => {
    const userData: IUser = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
    prismaMock.user.findUnique.mockResolvedValue(userData as any);

    const foundUser = await userRepository.getUserById(userData.id as number);

    expect(foundUser).toEqual(userData);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: userData.id },
    });
  });

  it('should return null when user ID does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const foundUser = await userRepository.getUserById(999);

    expect(foundUser).toBeNull();
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });

  it('should return a user when a user with the given email exists', async () => {
    const userData: IUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    prismaMock.user.findUnique.mockResolvedValue(userData as any);

    const user = await userRepository.getUserByEmail('johndoe@example.com');

    expect(user).toEqual(userData);
  });

  it('should return null when no user with the given email exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const user = await userRepository.getUserByEmail('nonexistent@example.com');

    expect(user).toBeNull();
  });

  it('should throw an error when there is an issue with the database', async () => {
    const errorMessage = 'Database connection error';
    prismaMock.user.findUnique.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.getUserByEmail('error@example.com')).rejects.toThrow(
      `Error getting user with email error@example.com: ${errorMessage}`
    );
  });

  it('should retrieve all users', async () => {
    const usersData: IUser[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];
    prismaMock.user.findMany.mockResolvedValue(usersData as any);

    const users = await userRepository.getAllUsers();

    expect(users).toEqual(usersData);
    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });

  it('should throw an error when retrieving all users fails', async () => {
    const errorMessage = 'Error getting users';
    prismaMock.user.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.getAllUsers())
      .rejects
      .toThrow(`Error getting users: ${errorMessage}`);
  });

  it('should throw an error when retrieving a user fails', async () => {
    const errorMessage = 'Error getting user';
    prismaMock.user.findUnique.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.getUserById(1))
      .rejects
      .toThrow(`Error getting user with ID 1: ${errorMessage}`);
  });

  it('should update a user successfully', async () => {
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

  it('should throw an error when updating a user fails', async () => {
    const errorMessage = 'Error updating user';
    prismaMock.user.update.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.updateUser(1, { name: 'New Name' }))
      .rejects
      .toThrow(`Error updating user with ID 1: ${errorMessage}`);
  });

  it('should delete a user by ID', async () => {
    prismaMock.user.delete.mockResolvedValue({} as any);

    const isDeleted = await userRepository.deleteUser(1);

    expect(isDeleted).toBe(true);
    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw an error when deleting a user fails', async () => {
    const errorMessage = 'Error deleting user';
    prismaMock.user.delete.mockRejectedValue(new Error(errorMessage));

    await expect(userRepository.deleteUser(1))
      .rejects
      .toThrow(`Error deleting user with ID 1: ${errorMessage}`);
  });
});
