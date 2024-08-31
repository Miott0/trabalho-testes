import prisma from "../client";  // Importando prisma do arquivo compartilhado
import { IPropertyRepository } from "../interface/IPropertyRepository";
import { IProperty } from "../interface/IProperty";

export class PropertyRepository implements IPropertyRepository {
  async addProperty(property: IProperty): Promise<IProperty> {
    try {
      const newProperty = await prisma.property.create({
        data: {
          area: property.area,
          address: property.address,
        },
      });
      return newProperty;
    } catch (err: any) {
      throw new Error(`Error creating property: ${err.message}`);
    }
  }

  async getPropertyById(id: number): Promise<IProperty | null> {
    try {
      const property = await prisma.property.findUnique({
        where: { id },
      });
      return property;
    } catch (err: any) {
      throw new Error(`Error getting property with ID ${id}:${err.message}`);
    }
  }

  async getProperties(): Promise<IProperty[]> {
    try {
      const properties = await prisma.property.findMany();
      return properties;
    } catch (err: any) {
      throw new Error(`Error getting properties: ${err.message}`);
    }
  }

  async updateProperty(id: number, propertyData: Partial<IProperty>): Promise<IProperty | null> {
    try {
      const updatedProperty = await prisma.property.update({
        where: { id },
        data: propertyData,
      });
      return updatedProperty;
    } catch (err: any) {
      throw new Error(`Error updating property with ID ${id}:${err.message}`);
    }
  }

  async deleteProperty(id: number): Promise<boolean> {
    try {
      await prisma.property.delete({
        where: { id },
      });
      return true;
    } catch (err: any) {
      throw new Error(`Error deleting property with ID ${id}: ${err.message}`);
    }
  }
}
