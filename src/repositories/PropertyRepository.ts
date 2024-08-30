import { Prisma, PrismaClient } from "@prisma/client";
import { IPropertyRepository } from "../interface/IPropertyRepository";
import { IProperty } from "../interface/IProperty";

const prisma = new PrismaClient();

export class PropertyRepository implements IPropertyRepository {
  getProperties(): Promise<IProperty[]> {
    throw new Error("Method not implemented.");
  }
  getProperty(id: number): Promise<IProperty | null> {
    throw new Error("Method not implemented.");
  }
  addProperty(property: IProperty): Promise<IProperty> {
    throw new Error("Method not implemented.");
  }
  updateProperty(id: number, property: Partial<IProperty>): Promise<IProperty | null> {
    throw new Error("Method not implemented.");
  }
  deleteProperty(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}
