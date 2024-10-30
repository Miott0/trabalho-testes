// src/services/propertyService.ts
import axios from 'axios';
import { IProperty } from '../types/Property';

const API_URL = 'http://localhost:3000/properties';

export const getProperties = async (): Promise<IProperty[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProperty = async (id: number): Promise<IProperty> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProperty = async (property: IProperty): Promise<IProperty> => {
  const response = await axios.post(API_URL, property);
  return response.data;
};

export const updateProperty = async (id: number, propertyData: Partial<IProperty>): Promise<IProperty> => {
  const response = await axios.put(`${API_URL}/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
