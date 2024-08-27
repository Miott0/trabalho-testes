import { UserRepository } from './UserRepository'
import { IUser } from '../interface/IUser';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  test('should create a new user', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const newUser = await userRepository.createUser(user);

    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe('John Doe');
    expect(newUser.email).toBe('john@example.com');
  });

  test('should return user by id', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const newUser = await userRepository.createUser(user);

    const foundUser = await userRepository.getUserById(newUser.id!);
    expect(foundUser).not.toBeNull();
    expect(foundUser?.id).toBe(newUser.id);
  });

  test('should return null if user is not found by id', async () => {
    const foundUser = await userRepository.getUserById(999);
    expect(foundUser).toBeNull();
  });

  test('should return all users', async () => {
    const user1: IUser = { name: 'John Doe', email: 'john@example.com' };
    const user2: IUser = { name: 'Jane Doe', email: 'jane@example.com' };
    await userRepository.createUser(user1);
    await userRepository.createUser(user2);

    const users = await userRepository.getAllUsers();
    expect(users).toHaveLength(2);
    expect(users[0].name).toBe('John Doe');
    expect(users[1].name).toBe('Jane Doe');
  });

  test('should update a user', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const newUser = await userRepository.createUser(user);

    const updatedUser = await userRepository.updateUser(newUser.id!, { name: 'John Updated' });

    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.name).toBe('John Updated');
  });

  test('should return null when trying to update a non-existent user', async () => {
    const updatedUser = await userRepository.updateUser(999, { name: 'Non-existent User' });
    expect(updatedUser).toBeNull();
  });

  test('should delete a user', async () => {
    const user: IUser = { name: 'John Doe', email: 'john@example.com' };
    const newUser = await userRepository.createUser(user);

    const isDeleted = await userRepository.deleteUser(newUser.id!);
    expect(isDeleted).toBe(true);

    const foundUser = await userRepository.getUserById(newUser.id!);
    expect(foundUser).toBeNull();
  });

  test('should return false when trying to delete a non-existent user', async () => {
    const isDeleted = await userRepository.deleteUser(999);
    expect(isDeleted).toBe(false);
  });
});