import { IProperty } from './IProperty';

export interface IPropertyService {
    getProperties(): Promise<IProperty[]>;
    getProperty(id: number): Promise<IProperty | null>;
    addProperty(property: IProperty): Promise<IProperty>;
    updateProperty(id:number,propertyData: Partial<IProperty>): Promise<IProperty| null>;
    deleteProperty(id: number): Promise<boolean>;
}