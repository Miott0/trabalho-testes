import { Request, Response } from "express";
import { IUserService } from "../interface/IUserService";
import { IUser } from "../interface/IUser";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, name } = req.body;
      if (!email || !name) {
        res.status(400).json({ message: "Email and name are required" });
        return;
      }
      if (!this.isValidEmail(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
      }
      if (name.trim() === "") {
        res.status(400).json({ message: "Name cannot be empty" });
        return;
      }
      const user: IUser = req.body;
      const newUser = await this.userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: `Error creating user: ${error.message}` });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }
      const user = await this.userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUser();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
  }

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
    } catch (error: any) {
      res.status(500).json({ message: `Error updating user: ${error.message}` });
    }
  }

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
    } catch (error: any) {
      res.status(500).json({ message: `Error deleting user: ${error.message}` });
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
