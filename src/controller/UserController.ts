import { Request, Response } from "express";
import { IUserService } from "../interface/IUserService";
import { IUser } from "../interface/IUser";

export class UserController {
  private userService: IUserService;

  // Injeção de dependência via construtor
  constructor(userService: IUserService) {
    this.userService = userService;
  }

  // Método para criar um usuário
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      const newUser = await this.userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  }

  // Método para obter um usuário pelo ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid user ID" });
      }
      const user = await this.userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  // Método para obter todos os usuários
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUser();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  // Método para atualizar um usuário
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }
      const userData: Partial<IUser> = req.body;
      const updatedUser = await this.userService.updateUser(id, userData);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  // Método para deletar um usuário
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }
      const isDeleted = await this.userService.deleteUser(id);
      if (isDeleted) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}