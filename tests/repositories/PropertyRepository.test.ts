import { PropertyRepository } from './PropertyRepository'
import { IProperty } from '../interface/IProperty';

describe('PropertyRepository', () => {
  let propertyRepository: PropertyRepository;

  beforeEach(() => {
    propertyRepository = new PropertyRepository();
  });

  it('should create a new property', async () => {
    const property: IProperty = { area: 100, adrress: '123 Main St' };
    const newProperty = await propertyRepository.addProperty(property);

    expect(newProperty).toHaveProperty('id');
    expect(newProperty.area).toBe(100);
    expect(newProperty.adrress).toBe('123 Main St');
  });

  it('should return property by id', async () => {
    const property: IProperty = { area: 100, adrress: '123 Main St' };
    const newProperty = await propertyRepository.addProperty(property);

    const foundProperty = await propertyRepository.getProperty(newProperty.id!);
    expect(foundProperty).not.toBeNull();
    expect(foundProperty?.id).toBe(newProperty.id);
  });

  it('should return null if property is not found by id', async () => {
    const foundProperty = await propertyRepository.getProperty(999);
    expect(foundProperty).toBeNull();
  });

  it('should return all properties', async () => {
    const property1: IProperty = { area: 100, adrress: '123 Main St' };
    const property2: IProperty = { area: 200, adrress: '456 Elm St' };
    await propertyRepository.addProperty(property1);
    await propertyRepository.addProperty(property2);

    const properties = await propertyRepository.getProperties();
    expect(properties).toHaveLength(2);
    expect(properties[0].area).toBe(100);
    expect(properties[1].area).toBe(200);
  });

  it('should update a property', async () => {
    const property: IProperty = {
      area: 999,
      adrress: 'Some address',
    };
    const addedProperty = await propertyRepository.addProperty(property);


    // Atualiza a propriedade
    const updatedProperty = await propertyRepository.updateProperty(addedProperty.id!, { area: 100 });

    // Verifica se a propriedade foi atualizada
    expect(updatedProperty).not.toBeNull();
    expect(updatedProperty?.area).toBe(100);
  });

  it('should return null when trying to update a non-existent property', async () => {
    const updatedProperty = await propertyRepository.updateProperty(999, { area: 100 });
    expect(updatedProperty).toBeNull();
  });

  it('should delete a property', async () => {
    const property: IProperty = { area: 100, adrress: '123 Main St' };
    const newProperty = await propertyRepository.addProperty(property);

    const isDeleted = await propertyRepository.deleteProperty(newProperty.id!);
    expect(isDeleted).toBe(true);

    const foundProperty = await propertyRepository.getProperty(newProperty.id!);
    expect(foundProperty).toBeNull();
  });

  it('should return false when trying to delete a non-existent property', async () => {
    const isDeleted = await propertyRepository.deleteProperty(999);
    expect(isDeleted).toBe(false);
  });
}); 