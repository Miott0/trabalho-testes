import { PropertyRepository } from "../../src/repositories/PropertyRepository";
import { IProperty } from "../../src/interface/IProperty";
import { prismaMock } from '../../src/singleton';

describe('PropertyRepository', () => {
  let propertyRepository: PropertyRepository;

  beforeEach(() => {
    propertyRepository = new PropertyRepository();
  });

  it('should create a property successfully', async () => {
    const propertyData: IProperty = { id: 1, area: 100, address: '123 Main St' };
    prismaMock.property.create.mockResolvedValue(propertyData as any);

    const newProperty = await propertyRepository.addProperty(propertyData);

    expect(newProperty).toEqual(propertyData);
    expect(prismaMock.property.create).toHaveBeenCalledWith({
      data: {
        area: propertyData.area,
        address: propertyData.address,
      },
    });
  });

  it('should throw an error when creating a property fails', async () => {
    const errorMessage = 'Error creating property';
    prismaMock.property.create.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.addProperty({ id: 1, area: 100, address: '123 Main St' }))
      .rejects
      .toThrow(`Error creating property: ${errorMessage}`);
  });

  it('should retrieve a property by ID', async () => {
    const propertyData: IProperty = { id: 1, area: 100, address: '123 Main St' };
    prismaMock.property.findUnique.mockResolvedValue(propertyData as any);

    const foundProperty = await propertyRepository.getPropertyById(propertyData.id as number);

    expect(foundProperty).toEqual(propertyData);
    expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
      where: { id: propertyData.id },
    });
  });

  it('should return null when property ID does not exist', async () => {
    prismaMock.property.findUnique.mockResolvedValue(null);

    const foundProperty = await propertyRepository.getPropertyById(999);

    expect(foundProperty).toBeNull();
    expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });

  it('should throw an error when retrieving a property by ID fails', async () => {
    const errorMessage = 'Error getting property';
    prismaMock.property.findUnique.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.getPropertyById(1))
      .rejects
      .toThrow(`Error getting property with ID 1:${errorMessage}`);
  })

  it('should retrieve all properties', async () => {
    const propertiesData: IProperty[] = [
      { id: 1, area: 100, address: '123 Main St' },
      { id: 2, area: 200, address: '456 Broadway' },
    ];
    prismaMock.property.findMany.mockResolvedValue(propertiesData as any);

    const properties = await propertyRepository.getProperties();

    expect(properties).toEqual(propertiesData);
    expect(prismaMock.property.findMany).toHaveBeenCalled();
  });

  it('should throw an error when retrieving all properties fails', async () => {
    const errorMessage = 'Error getting properties';
    prismaMock.property.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.getProperties())
      .rejects
      .toThrow(`Error getting properties: ${errorMessage}`);
  });

  it('should update a property successfully', async () => {
    const propertyData: IProperty = { id: 1, area: 100, address: '123 Main St' };
    const updatedData: Partial<IProperty> = { area: 150 };
    const updatedProperty: IProperty = { ...propertyData, ...updatedData };

    prismaMock.property.update.mockResolvedValue(updatedProperty as any);

    const result = await propertyRepository.updateProperty(propertyData.id as number, updatedData);

    expect(result).toEqual(updatedProperty);
    expect(prismaMock.property.update).toHaveBeenCalledWith({
      where: { id: propertyData.id },
      data: updatedData,
    });
  });

  it('should throw an error when updating a property fails', async () => {
    const errorMessage = 'Error updating property';
    prismaMock.property.update.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.updateProperty(1, { area: 150 }))
      .rejects
      .toThrow(`Error updating property with ID 1:${errorMessage}`)
  })

  it('should delete a property successfully', async () => {
    prismaMock.property.delete.mockResolvedValue({} as any);

    const result = await propertyRepository.deleteProperty(1);

    expect(result).toBe(true);
    expect(prismaMock.property.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw an error when deleting a property fails', async () => {
    const errorMessage = 'Error deleting property';
    prismaMock.property.delete.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.deleteProperty(1))
      .rejects
      .toThrow(`Error deleting property with ID 1: ${errorMessage}`);
  });

})