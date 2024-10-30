import { IProperty } from './IProperty';

export interface IPropertyRepository {
    getProperties(): Promise<IProperty[]>;
    getPropertyById(id: number): Promise<IProperty | null>;
    addProperty(property: IProperty): Promise<IProperty>;
    updateProperty(id:number,property: Partial<IProperty>): Promise<IProperty | null>;
    deleteProperty(id: number): Promise<boolean>;
}