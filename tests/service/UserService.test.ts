import { UserService } from "../../src/service/UserService";
import { IUserRepository } from "../../src/interface/IUserRepository";
import { IUser } from "../../src/interface/IUser";

describe("UserService", () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    // Mock do repositório
    userRepositoryMock = {
      addUser: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      getAllUsers: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    // Instância do UserService com o repositório mockado
    userService = new UserService(userRepositoryMock);
  });

  it("should create a user successfully", async () => {
    const userData: IUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
    userRepositoryMock.addUser.mockResolvedValue(userData);
    userRepositoryMock.getUserByEmail.mockResolvedValue(null);

    const newUser = await userService.createUser(userData);

    expect(newUser).toBeDefined();
    expect(newUser.id).toBe(1);
    expect(newUser.name).toBe("John Doe");
    expect(newUser.email).toBe("john@example.com");
    expect(userRepositoryMock.addUser).toHaveBeenCalledWith(userData);
    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      userData.email
    );
  });

  it("should throw an error if the user already exists when creating", async () => {
    const userData: IUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
    userRepositoryMock.getUserByEmail.mockResolvedValue(userData);

    await expect(userService.createUser(userData)).rejects.toThrow(
      `User with ID ${userData.id} already exists`
    );

    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      userData.email
    );
    expect(userRepositoryMock.addUser).not.toHaveBeenCalled();
  });

  it("should retrieve a user by ID", async () => {
    const userData: IUser = {
      id: 1,
      name: "Jane Doe",
      email: "jane@example.com",
    };
    userRepositoryMock.getUserById.mockResolvedValue(userData);

    const foundUser = await userService.getUserById(userData.id);

    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(userData.id);
    expect(foundUser?.name).toBe(userData.name);
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(userData.id);
  });

  it("should return null when user ID does not exist", async () => {
    userRepositoryMock.getUserById.mockResolvedValue(null);

    const foundUser = await userService.getUserById(999);

    expect(foundUser).toBeNull();
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(999);
  });

  it("should retrieve all users", async () => {
    const usersData: IUser[] = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Doe", email: "jane@example.com" },
    ];
    userRepositoryMock.getAllUsers.mockResolvedValue(usersData);

    const users = await userService.getAllUser();

    expect(users).toHaveLength(2);
    expect(users[0].name).toBe("John Doe");
    expect(users[1].name).toBe("Jane Doe");
    expect(userRepositoryMock.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array if there are no users", async () => {
    userRepositoryMock.getAllUsers.mockResolvedValue([]);

    const users = await userService.getAllUser();

    expect(users).toHaveLength(0);
    expect(userRepositoryMock.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it("should update a user successfully", async () => {
    const userData: IUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
    const updatedData: Partial<IUser> = { name: "John Smith" };
    const updatedUser: IUser = { ...userData, ...updatedData };

    userRepositoryMock.getUserById.mockResolvedValue(userData);
    userRepositoryMock.updateUser.mockResolvedValue(updatedUser);

    const result = await userService.updateUser(userData.id, updatedData);

    expect(result).toBeDefined();
    expect(result?.name).toBe("John Smith");
    expect(result?.email).toBe("john@example.com");
    expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(
      userData.id,
      updatedData
    );
  });

  it("should throw an error if user does not exist when updating", async () => {
    userRepositoryMock.getUserById.mockResolvedValue(null);

    await expect(
      userService.updateUser(999, { name: "Non-existent User" })
    ).rejects.toThrow("User with ID 999 does not exist");

    expect(userRepositoryMock.updateUser).not.toHaveBeenCalled();
  });

  it("should delete a user by ID", async () => {
    userRepositoryMock.getUserById.mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    });
    userRepositoryMock.deleteUser.mockResolvedValue(true);

    const isDeleted = await userService.deleteUser(1);

    expect(isDeleted).toBe(true);
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(1);
    expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(1);
  });

  it("should throw an error if user does not exist when deleting", async () => {
    userRepositoryMock.getUserById.mockResolvedValue(null); 

    await expect(userService.deleteUser(999)).rejects.toThrow(
      "User with ID 999 does not exist"
    );

    expect(userRepositoryMock.deleteUser).not.toHaveBeenCalled();
  });
});
