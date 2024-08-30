import { UserService } from '../../src/service/UserService';
import { IUserRepository } from '../../src/interface/IUserRepository';
import { IUser } from '../../src/interface/IUser';

describe('UserService', () => {
    let userService: UserService;
    let userRepositoryMock: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        // Mock do repositório
        userRepositoryMock = {
            createUser: jest.fn(),
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
            getAllUsers: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        };

        // Instância do UserService com o repositório mockado
        userService = new UserService(userRepositoryMock);
    });

    it('should create a user successfully', async () => {
        const userData: IUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
        userRepositoryMock.createUser.mockResolvedValue(userData);

        const newUser = await userService.createUser(userData);

        expect(newUser).toBeDefined();
        expect(newUser.id).toBe(1);
        expect(newUser.name).toBe('John Doe');
        expect(newUser.email).toBe('john@example.com');
        expect(userRepositoryMock.createUser).toHaveBeenCalledWith(userData);
    });

    it('should throw an error if the user already exists', async () => {
        const userData: IUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    
        // Mock getUserByEmail to return the user data, simulating that the user already exists
        userRepositoryMock.getUserByEmail.mockResolvedValue(userData);
    
        // Verify that createUser throws an error
        await expect(userService.createUser(userData)).rejects.toThrow(`User with ID ${userData.id} already exists`);
      });

    it('should retrieve a user by ID', async () => {
        const userData: IUser = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
        userRepositoryMock.getUserById.mockResolvedValue(userData);

        const foundUser = await userService.getUserById(userData.id as number);

        expect(foundUser).toBeDefined();
        expect(foundUser?.id).toBe(userData.id);
        expect(foundUser?.name).toBe(userData.name);
        expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(userData.id);
    });

    it('should return null when user ID does not exist', async () => {
        userRepositoryMock.getUserById.mockResolvedValue(null);

        const foundUser = await userService.getUserById(999);

        expect(foundUser).toBeNull();
        expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(999);
    });

    it('should retrieve all users', async () => {
        const usersData: IUser[] = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        ];
        userRepositoryMock.getAllUsers.mockResolvedValue(usersData);

        const users = await userService.getAllUser();

        expect(users).toHaveLength(2);
        expect(users[0].name).toBe('John Doe');
        expect(users[1].name).toBe('Jane Doe');
        expect(userRepositoryMock.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if there are no users', async () => {
        userRepositoryMock.getAllUsers.mockResolvedValue([]);

        const users = await userService.getAllUser();

        expect(users).toHaveLength(0);
        expect(userRepositoryMock.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should update a user successfully', async () => {
        const userData: IUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
        const updatedData: Partial<IUser> = { name: 'John Smith' };
        const updatedUser: IUser = { ...userData, ...updatedData };

        userRepositoryMock.updateUser.mockResolvedValue(updatedUser);

        const result = await userService.updateUser(userData.id as number, updatedData);

        expect(result).toBeDefined();
        expect(result?.name).toBe('John Smith');
        expect(result?.email).toBe('john@example.com');
        expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(userData.id, updatedData);
    });

    it('should return null if user does not exist when updating', async () => {
        userRepositoryMock.updateUser.mockResolvedValue(null);

        const updatedUser = await userService.updateUser(999, { name: 'Non-existent User' });

        expect(updatedUser).toBeNull();
        expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(999, { name: 'Non-existent User' });
    });

    it('should delete a user by ID', async () => {
        userRepositoryMock.deleteUser.mockResolvedValue(true);

        const isDeleted = await userService.deleteUser(1);

        expect(isDeleted).toBe(true);
        expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(1);
    });

    it('should return false if user does not exist when deleting', async () => {
        userRepositoryMock.deleteUser.mockResolvedValue(false);

        const isDeleted = await userService.deleteUser(999);

        expect(isDeleted).toBe(false);
        expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(999);
    });
});
