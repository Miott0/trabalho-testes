import { PropertyRepository } from "../../src/repositories/PropertyRepository";
import { IProperty } from "../../src/interface/IProperty";
import { prismaMock } from '../../src/singleton';

describe('PropertyRepository', () => {
  let propertyRepository: PropertyRepository;

  beforeEach(() => {
    propertyRepository = new PropertyRepository();
  });

  it('deve criar uma propriedade com sucesso', async () => {
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

  it('deve dar erro quando falhar ao criar uma propriedade', async () => {
    const errorMessage = 'Error creating property';
    prismaMock.property.create.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.addProperty({ id: 1, area: 100, address: '123 Main St' }))
      .rejects
      .toThrow(`Error creating property: ${errorMessage}`);
  });

  it('deve retornar uma propriedade através do ID', async () => {
    const propertyData: IProperty = { id: 1, area: 100, address: '123 Main St' };
    prismaMock.property.findUnique.mockResolvedValue(propertyData as any);

    const foundProperty = await propertyRepository.getPropertyById(propertyData.id as number);

    expect(foundProperty).toEqual(propertyData);
    expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
      where: { id: propertyData.id },
    });
  });

  it('deve retornar nulo quando quando o ID da propriedade não existir', async () => {
    prismaMock.property.findUnique.mockResolvedValue(null);

    const foundProperty = await propertyRepository.getPropertyById(999);

    expect(foundProperty).toBeNull();
    expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });

  it('deve dar erro quando falhar ao tentar retornar uma propriedade através do ID', async () => {
    const errorMessage = 'Error getting property';
    prismaMock.property.findUnique.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.getPropertyById(1))
      .rejects
      .toThrow(`Error getting property with ID 1:${errorMessage}`);
  })

  it('deve retornar todas as propriedades', async () => {
    const propertiesData: IProperty[] = [
      { id: 1, area: 100, address: '123 Main St' },
      { id: 2, area: 200, address: '456 Broadway' },
    ];
    prismaMock.property.findMany.mockResolvedValue(propertiesData as any);

    const properties = await propertyRepository.getProperties();

    expect(properties).toEqual(propertiesData);
    expect(prismaMock.property.findMany).toHaveBeenCalled();
  });

  it('deve dar erro quando todas as propriedades falharem ao retornar', async () => {
    const errorMessage = 'Error getting properties';
    prismaMock.property.findMany.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.getProperties())
      .rejects
      .toThrow(`Error getting properties: ${errorMessage}`);
  });

  it('deve atualizar a propriedade com sucesso', async () => {
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

  it('deve dar erro ao falhar na tentativa de atualizar uma propriedade', async () => {
    const errorMessage = 'Error updating property';
    prismaMock.property.update.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.updateProperty(1, { area: 150 }))
      .rejects
      .toThrow(`Error updating property with ID 1:${errorMessage}`)
  })

  it('deve excluir uma propriedade com sucesso', async () => {
    prismaMock.property.delete.mockResolvedValue({} as any);

    const result = await propertyRepository.deleteProperty(1);

    expect(result).toBe(true);
    expect(prismaMock.property.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('deve dar erro ao falhar em excluir uma propriedade', async () => {
    const errorMessage = 'Error deleting property';
    prismaMock.property.delete.mockRejectedValue(new Error(errorMessage));

    await expect(propertyRepository.deleteProperty(1))
      .rejects
      .toThrow(`Error deleting property with ID 1: ${errorMessage}`);
  });

})