import { PrismaClient } from "@prisma/client";
import { IPropertyRepository } from "../interface/IPropertyRepository";
import { IProperty } from "../interface/IProperty";

const prisma = new PrismaClient();

export class PropertyRepository implements IPropertyRepository {
  async addProperty(property: IProperty): Promise<IProperty> {
    const newProperty = await prisma.property.create({
      data: property,
    });
    return newProperty;
  }

  async getProperties(): Promise<IProperty[]> {
    return prisma.property.findMany();
  }

  async getProperty(id: number): Promise<IProperty | null> {
    return prisma.property.findUnique({
      where: { id },
    });
  }

  async updateProperty(id: number, propertyData: Partial<IProperty>): Promise<IProperty | null> {
    try {
      const updatedProperty = await prisma.property.update({
        where: { id },
        data: propertyData,
      });
      return updatedProperty;
    } catch (error) {
      return null;
    }
  }

  async deleteProperty(id: number): Promise<boolean> {
    try {
      await prisma.property.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
