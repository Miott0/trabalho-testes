import { UserService } from '../service/UserService';
import { IUser } from '../interface/IUser';

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
      userService = new UserService();
    });
  
    it('should create a user successfully', async () => {
      const userData: IUser = { id: undefined, name: 'John Doe', email: 'john@example.com' };
      
      const newUser = await userService.createUser(userData);
  
      expect(newUser).toBeDefined();
      expect(newUser.id).toBe(1);
      expect(newUser.name).toBe('John Doe');
      expect(newUser.email).toBe('john@example.com');
    });
  
    it('should retrieve a user by ID', async () => {
      const userData: IUser = { id: undefined, name: 'Jane Doe', email: 'jane@example.com' };
      const newUser = await userService.createUser(userData);
  
      const foundUser = await userService.getUserById(newUser.id as number);
      
      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(newUser.id);
      expect(foundUser?.name).toBe(newUser.name);
    });
  
    it('should return null when user ID does not exist', async () => {
      const foundUser = await userService.getUserById(999);
      expect(foundUser).toBeNull();
    });
  
    it('should retrieve all users', async () => {
      const userData1: IUser = { id: undefined, name: 'John Doe', email: 'john@example.com' };
      const userData2: IUser = { id: undefined, name: 'Jane Doe', email: 'jane@example.com' };
  
      await userService.createUser(userData1);
      await userService.createUser(userData2);
  
      const users = await userService.getAllUser();
  
      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('John Doe');
      expect(users[1].name).toBe('Jane Doe');
    });
  
    it('should update a user successfully', async () => {
      const userData: IUser = { id: undefined, name: 'John Doe', email: 'john@example.com' };
      const newUser = await userService.createUser(userData);
  
      const updatedData: Partial<IUser> = { name: 'John Smith' };
      const updatedUser = await userService.updateUser(newUser.id as number, updatedData);
  
      expect(updatedUser).toBeDefined();
      expect(updatedUser?.name).toBe('John Smith');
      expect(updatedUser?.email).toBe('john@example.com');
    });
  
    it('should return null if user does not exist when updating', async () => {
      const updatedUser = await userService.updateUser(999, { name: 'Non-existent User' });
      expect(updatedUser).toBeNull();
    });
  
    it('should delete a user by ID', async () => {
      const userData: IUser = { id: undefined, name: 'John Doe', email: 'john@example.com' };
      const newUser = await userService.createUser(userData);
  
      const isDeleted = await userService.deleteUser(newUser.id as number);
      expect(isDeleted).toBe(true);
  
      const foundUser = await userService.getUserById(newUser.id as number);
      expect(foundUser).toBeNull();
    });
  
    it('should return false if user does not exist when deleting', async () => {
      const isDeleted = await userService.deleteUser(999); // ID que não existe
      expect(isDeleted).toBe(false);
    });
});
