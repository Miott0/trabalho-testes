import { Request, Response } from "express";
import { IUserService } from "../interface/IUserService";
import { IUser } from "../interface/IUser";

export class UserController {
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Email do usuário
   *               name:
   *                 type: string
   *                 description: Nome do usuário
   *             required:
   *               - email
   *               - name
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso.
   *       400:
   *         description: Falta de email ou nome, ou formato de email inválido.
   *       500:
   *         description: Erro ao criar usuário.
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Busca um usuário pelo ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Dados do usuário.
   *       400:
   *         description: ID de usuário inválido.
   *       404:
   *         description: Usuário não encontrado.
   *       500:
   *         description: Erro ao buscar usuário.
   */
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

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retorna todos os usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários.
   *       500:
   *         description: Erro ao buscar usuários.
   */
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUser();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Atualiza um usuário pelo ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Email do usuário
   *               name:
   *                 type: string
   *                 description: Nome do usuário
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso.
   *       400:
   *         description: ID de usuário inválido.
   *       404:
   *         description: Usuário não encontrado.
   *       500:
   *         description: Erro ao atualizar usuário.
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Exclui um usuário pelo ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário excluído com sucesso.
   *       400:
   *         description: ID de usuário inválido.
   *       404:
   *         description: Usuário não encontrado.
   *       500:
   *         description: Erro ao excluir usuário.
   */
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
}
