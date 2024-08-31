import { PropertyService } from "../../src/service/PropertyService";
import { IPropertyRepository } from "../../src/interface/IPropertyRepository";
import { IProperty } from "../../src/interface/IProperty";

describe("PropertyService", () => {
  let propertyService: PropertyService;
  let mockPropertyRepository: jest.Mocked<IPropertyRepository>;

  beforeEach(() => {
    mockPropertyRepository = {
      getProperties: jest.fn(),
      getPropertyById: jest.fn(),
      addProperty: jest.fn(),
      updateProperty: jest.fn(),
      deleteProperty: jest.fn(),
    };

    propertyService = new PropertyService(mockPropertyRepository);
  });

  describe("createProperty", () => {
    test("should create property", async () => {
      const property: IProperty = {
        id: 1,
        area: 100,
        address: "123 Main St",
      };

      // Mock the addProperty method to return the property
      mockPropertyRepository.addProperty.mockResolvedValue(property);

      const result = await propertyService.createProperty(property);

      expect(result).toEqual(property);
      expect(mockPropertyRepository.addProperty).toHaveBeenCalledWith(property);
    });
  });

  describe("getProperties", () => {
    test("should return properties", async () => {
      const properties: IProperty[] = [
        {
          id: 1,
          area: 100,
          address: "123 Main St",
        },
        {
          id: 2,
          area: 200,
          address: "456 Elm St",
        },
      ];

      // Mock the getProperties method to return the properties
      mockPropertyRepository.getProperties.mockResolvedValue(properties);

      const result = await propertyService.getProperties();

      expect(result).toEqual(properties);
      expect(mockPropertyRepository.getProperties).toHaveBeenCalled();
    });

    test("should return empty array if no properties", async () => {
      // Mock the getProperties method to return an empty array
      mockPropertyRepository.getProperties.mockResolvedValue([]);

      const result = await propertyService.getProperties();

      expect(result).toEqual([]);
      expect(mockPropertyRepository.getProperties).toHaveBeenCalled();
    });
  })

  describe("getProperty", () => {
    test("should return property", async () => {
      const property: IProperty = {
        id: 1,
        area: 100,
        address: "123 Main St",
      };

      // Mock the getPropertyById method to return the property
      mockPropertyRepository.getPropertyById.mockResolvedValue(property);

      const result = await propertyService.getProperty(1);

      expect(result).toEqual(property);
      expect(mockPropertyRepository.getPropertyById).toHaveBeenCalledWith(1);
    });

    test("should return null if property not found", async () => {
      // Mock the getPropertyById method to return null
      mockPropertyRepository.getPropertyById.mockResolvedValue(null);

      const result = await propertyService.getProperty(1);

      expect(result).toBeNull();
      expect(mockPropertyRepository.getPropertyById).toHaveBeenCalledWith(1);
    });
  })

  describe("updateProperty", () => {
    test("should update property", async () => {
      const property: IProperty = {
        id: 1,
        area: 100,
        address: "123 Main St",
      };

      // Mock the updateProperty method to return the updated property
      mockPropertyRepository.updateProperty.mockResolvedValue(property);

      const result = await propertyService.updateProperty(1, property);

      expect(result).toEqual(property);
      expect(mockPropertyRepository.updateProperty).toHaveBeenCalledWith(1, property);
    });

    test("should return null if property not found", async () => {
      // Mock the updateProperty method to return null
      mockPropertyRepository.updateProperty.mockResolvedValue(null);

      const result = await propertyService.updateProperty(1, {
        area: 100,
        address: "123 Main St",
      });

      expect(result).toBeNull();
      expect(mockPropertyRepository.updateProperty).toHaveBeenCalledWith(1, {
        area: 100,
        address: "123 Main St",
      });
    });
  })

  describe("deleteProperty", () => {
    test("should delete property", async () => {
      // Mock the deleteProperty method to return true
      mockPropertyRepository.deleteProperty.mockResolvedValue(true);

      const result = await propertyService.deleteProperty(1);

      expect(result).toBe(true);
      expect(mockPropertyRepository.deleteProperty).toHaveBeenCalledWith(1);
    });

    test("should return false if property not found", async () => {
      // Mock the deleteProperty method to return false
      mockPropertyRepository.deleteProperty.mockResolvedValue(false);

      const result = await propertyService.deleteProperty(1);

      expect(result).toBe(false);
      expect(mockPropertyRepository.deleteProperty).toHaveBeenCalledWith(1);
    });
  })

});
