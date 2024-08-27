import { IPropertyService } from '../interface/IPropertyService';
import { IProperty } from '../interface/IProperty';
import { IPropertyRepository } from '../interface/IPropertyRepository';
import { PropertyRepository } from '../repositories/PropertyRepository';

export class PropertyService implements IPropertyService {
  private propertyRepository: IPropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async getProperties(): Promise<IProperty[]> {
    return await this.propertyRepository.getProperties();
  }

  async getProperty(id: number): Promise<IProperty | null> {
    const property = await this.propertyRepository.getProperty(id);
    return property || null; // Garante que seja null se não encontrado
  }

  async addProperty(property: IProperty): Promise<IProperty> {
    return await this.propertyRepository.addProperty(property);
  }

  async updateProperty(id: number, propertyData: Partial<IProperty>): Promise<IProperty | null> {
    const updatedProperty = await this.propertyRepository.updateProperty(id, propertyData);
    return updatedProperty || null; // Garante que seja null se não encontrado
  }

  async deleteProperty(id: number): Promise<boolean> {
    const deleted = await this.propertyRepository.deleteProperty(id);
    return deleted; // Retorna false se a exclusão falhar
  }
}
                  