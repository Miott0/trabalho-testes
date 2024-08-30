import request from 'supertest';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { PropertyController } from '../../src/controller/PropertyController';
import { PropertyService } from '../../src/service/PropertyService';
import { jest } from '@jest/globals';

describe('PropertyController', () => {
  let mockService: jest.Mocked<PropertyService>;
  let app: Express;

  beforeEach(() => {
    // Configuração da aplicação Express
    app = express();
    app.use(bodyParser.json());

    // Criação de um mock de PropertyService
    mockService = {
      getProperties: jest.fn(),
      getProperty: jest.fn(),
      addProperty: jest.fn(),
      updateProperty: jest.fn(),
      deleteProperty: jest.fn(),
    } as unknown as jest.Mocked<PropertyService>;

    // Configuração do controlador com o mock injetado
    const controller = new PropertyController(mockService);

    // Configuração das rotas
    app.get('/properties', controller.getProperties.bind(controller));
    app.get('/properties/:id', controller.getProperty.bind(controller));
    app.post('/properties', controller.addProperty.bind(controller));
    app.put('/properties/:id', controller.updateProperty.bind(controller));
    app.delete('/properties/:id', controller.deleteProperty.bind(controller));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should fetch a property by ID', async () => {
    const propertyId = 1;

    // Configura o mock para retornar o objeto esperado
    mockService.getProperty.mockResolvedValue({ id: propertyId, area: 120, address: "123 Main St" });

    // Verifica se o mock está configurado corretamente
    console.log('Before Request Mock Calls:', mockService.getProperty.mock.calls);

    // Faz a requisição ao endpoint
    const response = await request(app).get(`/properties/${propertyId}`);

    // Verifica se o mock foi chamado corretamente
    console.log('After Request Mock Calls:', mockService.getProperty.mock.calls);

    // Verifica o status e o corpo da resposta
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: propertyId, area: 120, address: "123 Main St" });
  });

    // Teste para buscar todas as propriedades
    it('should fetch all properties', async () => {
      mockService.getProperties.mockResolvedValue([{ id: 1, area: 120, address: "123 Main St" }]);
      const response = await request(app).get('/properties');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, area: 120, address: "123 Main St" }]);
    });
  

  // Teste para adicionar uma propriedade
  it('should add a new property', async () => {
    const newProperty = { area: 150, address: "456 Elm St" };
    mockService.addProperty.mockResolvedValue({ id: 2, ...newProperty });
    const response = await request(app).post('/properties').send(newProperty);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, area: 150, address: "456 Elm St" });
  });

  // Teste para atualizar uma propriedade
  it('should update a property', async () => {
    const propertyId = 1;
    const updatedData = { area: 200, address: "789 Pine St" };
    mockService.updateProperty.mockResolvedValue({ id: propertyId, ...updatedData });
    const response = await request(app).put(`/properties/${propertyId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: propertyId, area: 200, address: "789 Pine St" });
  });

  // Teste para deletar uma propriedade
  it('should delete a property', async () => {
    const propertyId = 1;
    mockService.deleteProperty.mockResolvedValue(true);
    const response = await request(app).delete(`/properties/${propertyId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Property deleted successfully" });
  });

  // Teste para quando a propriedade não for encontrada
  it('should return 404 when property is not found', async () => {
    mockService.getProperty.mockResolvedValue(null); // Simula a propriedade não encontrada
    const propertyId = 999; // Um ID que não existe
    const response = await request(app).get(`/properties/${propertyId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  // Teste para quando a atualização da propriedade falhar
  it('should return 404 when trying to update a non-existent property', async () => {
    mockService.updateProperty.mockResolvedValue(null); // Simula falha na atualização
    const propertyId = 999; // Um ID que não existe
    const updatedData = { area: 200, address: "789 Pine St" };
    const response = await request(app).put(`/properties/${propertyId}`).send(updatedData);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  // Teste para quando a exclusão da propriedade falhar
  it('should return 404 when trying to delete a non-existent property', async () => {
    mockService.deleteProperty.mockResolvedValue(false); // Simula falha na exclusão
    const propertyId = 999; // Um ID que não existe
    const response = await request(app).delete(`/properties/${propertyId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
