import { IPropertyRepository } from "../interface/IPropertyRepository";
import { IProperty } from "../interface/IProperty";

export class PropertyRepository implements IPropertyRepository {
  private properties: IProperty[] = [];

  async addProperty(property: IProperty): Promise<IProperty> {
    const newProperty = { ...property, id: this.properties.length + 1 };
    this.properties.push(newProperty);
    return newProperty;
  }

  async getProperties(): Promise<IProperty[]> {
    return this.properties;
  }

  async getProperty(id: number): Promise<IProperty | null> {
    const property = this.properties.find((property) => property.id === id);
    return property || null;
  }

  async updateProperty(id: number, propertyData: Partial<IProperty>): Promise<IProperty | null> {
    const propertyIndex = this.properties.findIndex((p) => p.id === id);

    if (propertyIndex === -1) {
      return null;
    }

    const updatedProperty = { ...this.properties[propertyIndex], ...propertyData };
    this.properties[propertyIndex] = updatedProperty;
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const propertyIndex = this.properties.findIndex((property) => property.id === id);
    if (propertyIndex === -1) {
      return false;
    }
    this.properties.splice(propertyIndex, 1);
    return true;
  }
}
