import { PrismaClient, Prisma } from "@prisma/client";
import { IUserRepository } from "../interface/IUserRepository";
import { IUser } from "../interface/IUser";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async createUser(user: IUser): Promise<IUser> {
    // Validação de dados antes de tentar criar o usuário
    if (!user.email) {
      throw new Error("Email é obrigatório.");
    }

    if (!user.name) {
      throw new Error("Nome é obrigatório.");
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name ?? undefined, // Se name for null, define como undefined
        },
      });

      return {
        ...newUser,
        name: newUser.name ?? undefined, // Garantindo que `name` seja `undefined` e não `null`
      } as IUser;
    } catch (error: any) {
      // Lançamos um novo erro ou retornamos um valor específico
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
    // Não há necessidade de return aqui pois todos os caminhos terminam com return ou throw
  }

  async getUserById(id: number): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return {
      ...user,
      name: user.name ?? undefined,
    } as IUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await prisma.user.findMany();

    return users.map((user) => ({
      ...user,
      name: user.name ?? undefined, // Mapeia `null` para `undefined` no campo `name`
    })) as IUser[];
  }

  async updateUser(
    id: number,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    // Validação de dados
    if (!userData.name && !userData.email) {
      throw new Error(
        "Pelo menos um dos campos (name ou email) deve ser fornecido para atualização."
      );
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
      });

      // Verificar e lançar erro caso `name` seja `null`
      if (updatedUser.name === null) {
        throw new Error('O campo "name" não pode ser nulo.');
      }

      // Retornar o usuário atualizado, mapeando `null` para `undefined` se necessário
      return {
        ...updatedUser,
        name: updatedUser.name ?? undefined,
      } as IUser;
    } catch (error: any) {
      // Converter error.message para string de forma segura
      const errorMessage = typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Tratamento de erros específicos do Prisma
          if (error.code === "P2025") {
              // P2025: Registro não encontrado
              throw new Error("Usuário não encontrado.");
          }
          // Adicione outros códigos de erro do Prisma que você deseja tratar aqui
      }
  
      // Repassa o erro original para ser tratado mais adiante
      throw new Error(`Erro ao atualizar o usuário: ${errorMessage}`);
  }
  
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        // P2025: Registro não encontrado
        return false;
      }

      // Verifica se o erro é do tipo `Error`
      if (error instanceof Error) {
        throw new Error(`Erro ao deletar o usuário: ${error.message}`);
      } else {
        // Se `error` não for do tipo `Error`
        throw new Error("Erro desconhecido ao deletar o usuário.");
      }
    }
  }
}
