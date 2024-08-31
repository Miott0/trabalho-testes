import { Request, Response } from 'express';
import { PropertyController } from '../../src/controller/PropertyController';
import { IPropertyService } from '../../src/interface/IPropertyService';
import { IProperty } from '../../src/interface/IProperty';

// Mocks
const mockPropertyService: jest.Mocked<IPropertyService> = {
  createProperty: jest.fn(),
  getProperty: jest.fn(),
  getProperties: jest.fn(),
  updateProperty: jest.fn(),
  deleteProperty: jest.fn(),
};

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe('PropertyController', () => {
  let propertyController: PropertyController;

  beforeEach(() => {
    propertyController = new PropertyController(mockPropertyService);
    jest.clearAllMocks();
  });

  describe('createProperty', () => {
    test('should create a new property and return status 201', async () => {
      const property: IProperty = { id: 1, area: 100, address: '123 Main St' };
      mockPropertyService.createProperty.mockResolvedValue(property);

      mockRequest.body = property;

      await propertyController.createProperty(mockRequest, mockResponse);

      expect(mockPropertyService.createProperty).toHaveBeenCalledWith(property);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(property);
    });

    test('should return 400 if area is missing', async () => {
      mockRequest.body = { address: '123 Main St' };

      await propertyController.createProperty(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message:'Area and address are required' });
    });

    test('should return 400 if address is missing', async () => {
      mockRequest.body = { area: 100 };

      await propertyController.createProperty(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Area and address are required' });
    });

    test('should return 500 when createProperty fails', async () => {
      mockPropertyService.createProperty.mockRejectedValue(new Error('Creation failed'));

      mockRequest.body = { area: 100, address: '123 Main St' };

      await propertyController.createProperty(mockRequest, mockResponse);

      expect(mockPropertyService.createProperty).toHaveBeenCalledWith({ area: 100, address: '123 Main St' });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error creating property: Creation failed' });
    });
  });

  describe('getPropertyById', () => {
    test('should return a property by ID', async () => {
      const property: IProperty = { id: 1, area: 100, address: '123 Main St' };
      mockPropertyService.getProperty.mockResolvedValue(property);

      mockRequest.params = { id: '1' };

      await propertyController.getProperty(mockRequest, mockResponse);

      expect(mockPropertyService.getProperty).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(property);
    });

    test('should return 400 when ID is invalid', async () => {
      mockRequest.params = { id: 'abc' };

      await propertyController.getProperty(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid property ID' });
    });

    test('should return 404 when property not found', async () => {
      mockPropertyService.getProperty.mockResolvedValue(null);

      mockRequest.params = { id: '1' };

      await propertyController.getProperty(mockRequest, mockResponse);

      expect(mockPropertyService.getProperty).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Property not found' });
    });

    test('should return 500 when getProperty fails', async () => {
      mockPropertyService.getProperty.mockRejectedValue(new Error('Retrieval failed'));

      mockRequest.params = { id: '1' };

      await propertyController.getProperty(mockRequest, mockResponse);

      expect(mockPropertyService.getProperty).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching property: Retrieval failed' });
    });
  });

  describe('getAllProperties', () => {
    test('should retrieve all properties', async () => {
      const properties: IProperty[] = [
        { id: 1, area: 100, address: '123 Main St' },
        { id: 2, area: 200, address: '456 Elm St' },
      ];
      mockPropertyService.getProperties.mockResolvedValue(properties);

      await propertyController.getProperties(mockRequest, mockResponse);

      expect(mockPropertyService.getProperties).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(properties);
    });

    test('should return 500 when getProperties fails', async () => {
      mockPropertyService.getProperties.mockRejectedValue(new Error('Retrieval failed'));

      await propertyController.getProperties(mockRequest, mockResponse);

      expect(mockPropertyService.getProperties).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching properties: Retrieval failed' });
    });
  });

  describe('updateProperty', () => {
    test('should update a property and return updated property', async () => {
      const updatedProperty: IProperty = { id: 1, area: 150, address: '789 Oak St' };
      mockPropertyService.updateProperty.mockResolvedValue(updatedProperty);

      mockRequest.params = { id: '1' };
      mockRequest.body = { area: 150, address: '789 Oak St' };

      await propertyController.updateProperty(mockRequest, mockResponse);

      expect(mockPropertyService.updateProperty).toHaveBeenCalledWith(1, { area: 150, address: '789 Oak St' });
      expect(mockResponse.json).toHaveBeenCalledWith(updatedProperty);
    });

    test('should return 400 when ID is invalid', async () => {
      mockRequest.params = { id: 'abc' };
      mockRequest.body = { area: 150, address: '789 Oak St' };

      await propertyController.updateProperty(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid property ID' });
    });

    test('should return 404 when trying to update a non-existent property', async () => {
      mockPropertyService.updateProperty.mockResolvedValue(null);

      mockRequest.params = { id: '1' };
      mockRequest.body = { area: 150, address: '789 Oak St' };

      await propertyController.updateProperty(mockRequest, mockResponse);

      expect(mockPropertyService.updateProperty).toHaveBeenCalledWith(1, { area: 150, address: '789 Oak St' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Property not found' });
    });

    test('should return 500 when updateProperty fails', async () => {
      mockPropertyService.updateProperty.mockRejectedValue(new Error('Update failed'));

      mockRequest.params = { id: '1' };
      mockRequest.body = { area: 150, address: '789 Oak St' };

      await propertyController.updateProperty(mockRequest, mockResponse);

      expect(mockPropertyService.updateProperty).toHaveBeenCalledWith(1, { area: 150, address: '789 Oak St' });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error updating property: Update failed' });
    });
  });

  describe('deleteProperty', () => {
    test('should delete a property and return success message', async () => {
      mockPropertyService.deleteProperty.mockResolvedValue(true);

      mockRequest.params = { id: '1' };

      await propertyController.deleteProperty(mockRequest, mockResponse);

      expect(mockPropertyService.deleteProperty).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Property deleted successfully' });
    });

    test('should return 400 when ID is invalid', async () => {
      mockRequest.params = { id: 'abc' };

      await propertyController.deleteProperty(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid property ID' });
    });

    test('should return 404 when trying to delete a non-existent property', async () => {
      mockPropertyService.deleteProperty.mockResolvedValue(false);

      mockRequest.params = { id: '1' };

      await propertyController.deleteProperty(mockRequest, mockResponse);

      expect(mockPropertyService.deleteProperty).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Property not found' });
    });

    test('should return 500 when deleteProperty fails', async () => {
      mockPropertyService.deleteProperty.mockRejectedValue(new Error('Deletion failed'));

      mockRequest.params = { id: '1' };

      await propertyController.deleteProperty(mockRequest, mockResponse);

      expect(mockPropertyService.deleteProperty).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error deleting property: Deletion failed' });
    });
  });
});

