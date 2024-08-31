import { IPropertyService } from '../interface/IPropertyService';
import { IProperty } from '../interface/IProperty';
import { IPropertyRepository } from '../interface/IPropertyRepository';


export class PropertyService implements IPropertyService {
  private propertyRepository: IPropertyRepository;

  constructor(propertyRepository: IPropertyRepository) {
    this.propertyRepository = propertyRepository
  }

  async getProperties(): Promise<IProperty[]> {
    return await this.propertyRepository.getProperties();
  }

  async getProperty(id: number): Promise<IProperty | null> {
    const property = await this.propertyRepository.getPropertyById(id);
    return property;
  }

  async createProperty(property: IProperty): Promise<IProperty> {
    return await this.propertyRepository.addProperty(property);
  }

  async updateProperty(id: number, propertyData: Partial<IProperty>): Promise<IProperty | null> {
    const updatedProperty = await this.propertyRepository.updateProperty(id, propertyData);
    return updatedProperty; 
  }

  async deleteProperty(id: number): Promise<boolean> {
    const deleted = await this.propertyRepository.deleteProperty(id);
    return deleted;
  }
}
                  