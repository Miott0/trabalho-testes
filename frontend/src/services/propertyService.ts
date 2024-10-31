// src/services/propertyService.ts
import axios from 'axios';
import { Property } from '../types/Property';

const API_URL = 'http://localhost:3000/properties';

const handleResponse = (response: any) => response.data;


export const getProperties = async (): Promise<Property[]> => {
  try {
    const response = await axios.get(API_URL);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to fetch properties');
  }
};

export const getProperty = async (id: number): Promise<Property | undefined> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to fetch property');
  }
};

export const createProperty = async (property: Property): Promise<Property> => {
  try {
    const response = await axios.post(API_URL, property);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to create property');
  }
};

export const updateProperty = async (id: number, propertyData: Partial<Property>): Promise<Property> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, propertyData);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to update property');
  }
};

export const deleteProperty = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete property');
  }
};
