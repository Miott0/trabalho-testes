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
    return await this.propertyRepository.getProperty(id);
  }

  async addProperty(property: IProperty): Promise<IProperty> {
    return await this.propertyRepository.addProperty(property);
  }

  async updateProperty( id:number,propertyData: Partial<IProperty>): Promise<IProperty | null> {
    return await this.propertyRepository.updateProperty( id, propertyData);
  }

  async deleteProperty(id: number): Promise<boolean> {
    return await this.propertyRepository.deleteProperty(id);
  }
}
                  