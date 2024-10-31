// src/tests/propertyService.test.ts

import axios from 'axios';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../services/propertyService';
import { IProperty } from '../types/Property';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('propertyService', () => {
  const API_URL = 'http://localhost:3000/properties';
  const mockProperty: IProperty = { id: 1, area: 100, address: '123 Main St' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProperties', () => {
    it('should fetch properties successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: [mockProperty] });

      const properties = await getProperties();
      expect(properties).toEqual([mockProperty]);
      expect(mockedAxios.get).toHaveBeenCalledWith(API_URL);
    });

    it('should throw an error if fetching properties fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(getProperties()).rejects.toThrow('Failed to fetch properties');
      expect(mockedAxios.get).toHaveBeenCalledWith(API_URL);
    });
  });

  describe('getProperty', () => {
    it('should fetch a single property successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockProperty });

      const property = await getProperty(mockProperty.id);
      expect(property).toEqual(mockProperty);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/${mockProperty.id}`);
    });

    it('should throw an error if fetching a property fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(getProperty(mockProperty.id)).rejects.toThrow('Failed to fetch property');
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/${mockProperty.id}`);
    });
  });

  describe('createProperty', () => {
    it('should create a property successfully', async () => {
      mockedAxios.post.mockResolvedValue({ data: mockProperty });

      const property = await createProperty(mockProperty);
      expect(property).toEqual(mockProperty);
      expect(mockedAxios.post).toHaveBeenCalledWith(API_URL, mockProperty);
    });

    it('should throw an error if creating property fails', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      await expect(createProperty(mockProperty)).rejects.toThrow('Failed to create property');
      expect(mockedAxios.post).toHaveBeenCalledWith(API_URL, mockProperty);
    });
  });

  describe('updateProperty', () => {
    it('should update a property successfully', async () => {
      const updatedProperty: Partial<IProperty> = { ...mockProperty, area: 120 };
      mockedAxios.put.mockResolvedValue({ data: { id: mockProperty.id, ...updatedProperty } });

      const property = await updateProperty(mockProperty.id, updatedProperty);
      expect(property).toEqual({ id: mockProperty.id, ...updatedProperty });
      expect(mockedAxios.put).toHaveBeenCalledWith(`${API_URL}/${mockProperty.id}`, updatedProperty);
    });

    it('should throw an error if updating property fails', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Network error'));

      await expect(updateProperty(mockProperty.id, mockProperty)).rejects.toThrow('Failed to update property');
      expect(mockedAxios.put).toHaveBeenCalledWith(`${API_URL}/${mockProperty.id}`, mockProperty);
    });
  });

  describe('deleteProperty', () => {
    it('should delete a property successfully', async () => {
      mockedAxios.delete.mockResolvedValue({});

      await deleteProperty(mockProperty.id);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/${mockProperty.id}`);
    });

    it('should throw an error if deleting property fails', async () => {
      mockedAxios.delete.mockRejectedValue(new Error('Network error'));

      await expect(deleteProperty(mockProperty.id)).rejects.toThrow('Failed to delete property');
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/${mockProperty.id}`);
    });
  });
});
