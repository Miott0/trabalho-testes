import { Prisma, PrismaClient } from "@prisma/client";
import { IPropertyRepository } from "../interface/IPropertyRepository";
import { IProperty } from "../interface/IProperty";

const prisma = new PrismaClient();

export class PropertyRepository implements IPropertyRepository {
  
  // Método para adicionar uma nova propriedade
  async addProperty(property: IProperty): Promise<IProperty> {
    try {
      const newProperty = await prisma.property.create({
        data: {
          area: property.area ?? null, // Usar `null` explicitamente se area for `undefined`
          address: property.address ?? null, // Usar `null` explicitamente se address for `undefined`
        },
      });

      return {
        id: newProperty.id,
        area: newProperty.area ?? undefined, // Mapeando `null` para `undefined` ao retornar
        address: newProperty.address ?? undefined, // Mapeando `null` para `undefined` ao retornar
      } as IProperty;
    } catch (error: any) {
      throw new Error(`Erro ao adicionar a propriedade: ${error.message}`);
    }
  }

  // Método para obter todas as propriedades
  async getProperties(): Promise<IProperty[]> {
    try {
      const properties = await prisma.property.findMany();
      return properties.map(property => ({
        id: property.id,
        area: property.area ?? undefined, // Mapeando `null` para `undefined` ao retornar
        address: property.address ?? undefined, // Mapeando `null` para `undefined` ao retornar
      }));
    } catch (error: any) {
      throw new Error(`Erro ao buscar propriedades: ${error.message}`);
    }
  }

  // Método para obter uma propriedade por ID
  async getProperty(id: number): Promise<IProperty | null> {
    try {
      const property = await prisma.property.findUnique({
        where: { id },
      });

      if (!property) {
        return null;
      }

      return {
        id: property.id,
        area: property.area ?? undefined, // Mapeando `null` para `undefined` ao retornar
        address: property.address ?? undefined, // Mapeando `null` para `undefined` ao retornar
      };
    } catch (error: any) {
      throw new Error(`Erro ao buscar a propriedade com ID ${id}: ${error.message}`);
    }
  }

  // Método para atualizar uma propriedade existente
  async updateProperty(id: number, propertyData: Partial<IProperty>): Promise<IProperty | null> {
    try {
      const existingProperty = await prisma.property.findUnique({
        where: { id },
      });

      if (!existingProperty) {
        throw new Error(`Propriedade com ID ${id} não encontrada.`);
      }

      const updatedProperty = await prisma.property.update({
        where: { id },
        data: {
          area: propertyData.area ?? existingProperty.area,
          address: propertyData.address ?? existingProperty.address,
        },
      });

      return {
        id: updatedProperty.id,
        area: updatedProperty.area ?? undefined, // Mapeando `null` para `undefined` ao retornar
        address: updatedProperty.address ?? undefined, // Mapeando `null` para `undefined` ao retornar
      };
    } catch (error: any) {
      throw new Error(`Erro ao atualizar a propriedade com ID ${id}: ${error.message}`);
    }
  }

  // Método para deletar uma propriedade
  async deleteProperty(id: number): Promise<boolean> {
    try {
      await prisma.property.delete({
        where: { id },
      });
      return true;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        // P2025: Registro não encontrado
        return false;
      }
      throw new Error(`Erro ao deletar a propriedade com ID ${id}: ${error.message}`);
    }
  }
}
