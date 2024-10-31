import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyContainer from '../components/PropertyContainer';
import * as propertyService from '../services/propertyService'; // Ajuste o caminho conforme necessário

jest.mock('../services/propertyService'); // Mocking the property service

// Tipando o módulo mockado
const mockedPropertyService = propertyService as jest.Mocked<typeof propertyService>;

describe('PropertyContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  test('loads and displays properties', async () => {
    // Mocking the response for fetching properties
    (propertyService.getProperties as jest.Mock)
      .mockResolvedValueOnce([
        { id: 1, area: 100, address: '123 Main St' },
        { id: 2, area: 150, address: '456 Elm St' },
      ]);

    render(<PropertyContainer />);

    // Wait for properties to load
    expect(await screen.findByText(/123 Main St/i)).toBeInTheDocument();
    expect(await screen.findByText(/456 Elm St/i)).toBeInTheDocument();
  });

  // Teste de Criação
  test('creates a new property', async () => {
    // Mock inicial para getProperties retornando as propriedades existentes
    mockedPropertyService.getProperties
      .mockResolvedValueOnce([]) // Inicialmente, sem propriedades
      .mockResolvedValueOnce([
        { id: 1, area: 200, address: '789 Oak St' },
      ]); // Após a criação
  
    // Mock para createProperty
    mockedPropertyService.createProperty.mockResolvedValue({
      id: 1,
      area: 200,
      address: '789 Oak St',
    });
  
    render(<PropertyContainer />);
  
    // Preencha o formulário
    fireEvent.change(screen.getByLabelText(/Área \(m²\)/i), {
      target: { value: '200' },
    });
    fireEvent.change(screen.getByLabelText(/Endereço/i), {
      target: { value: '789 Oak St' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: /Adicionar Propriedade/i })
    );
  
    // Verifique se a função createProperty foi chamada
    await waitFor(() => {
      expect(mockedPropertyService.createProperty).toHaveBeenCalled();
    });
  
    // Exibe as chamadas para inspecionar os argumentos
    console.log(mockedPropertyService.createProperty.mock.calls);
  
    // Ajusta a asserção para verificar os argumentos reais
    await waitFor(() => {
      expect(mockedPropertyService.createProperty).toHaveBeenCalledWith(
        expect.objectContaining({ area: 200, address: '789 Oak St' })
      );
    });
  
    // Verifique se getProperties foi chamado novamente para atualizar a lista
    await waitFor(() => {
      expect(mockedPropertyService.getProperties).toHaveBeenCalledTimes(2);
    });
  
    // Verifique se a nova propriedade é exibida
    expect(
      await screen.findByText(/789 Oak St/i)
    ).toBeInTheDocument();
  });
  
  

  // Teste de Atualização
  test('updates an existing property', async () => {
    // Mock inicial para getProperties retornando a propriedade existente
    (propertyService.getProperties as jest.Mock)
      .mockResolvedValueOnce([
        { id: 1, area: 100, address: '123 Main St' },
      ])
      // Após a atualização, getProperties retorna a propriedade atualizada
      .mockResolvedValueOnce([
        { id: 1, area: 120, address: '123 Main St Updated' },
      ]);

    // Mock para updateProperty
    (propertyService.updateProperty as jest.Mock)
      .mockResolvedValue({ id: 1, area: 120, address: '123 Main St Updated' });

    render(<PropertyContainer />);

    // Espera a propriedade inicial ser carregada
    expect(await screen.findByText(/123 Main St/i)).toBeInTheDocument();

    // Editar a propriedade
    fireEvent.click(screen.getByRole('button', { name: /Editar/i }));

    // Atualizar os detalhes
    fireEvent.change(screen.getByLabelText(/Área \(m²\)/i), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText(/Endereço/i), { target: { value: '123 Main St Updated' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    // Verifique se a função updateProperty foi chamada corretamente
    await waitFor(() => {
      expect(propertyService.updateProperty).toHaveBeenCalledWith(1, { id: 1, area: 120, address: '123 Main St Updated' });
    });

    // Verifique se getProperties foi chamado novamente para atualizar a lista
    await waitFor(() => {
      expect(propertyService.getProperties).toHaveBeenCalledTimes(2);
    });

    // Verifique se a propriedade atualizada é exibida
    expect(await screen.findByText(/123 Main St Updated/i)).toBeInTheDocument();
  });

  // Teste de Exclusão
  test('deletes a property', async () => {
    // Mock inicial para getProperties retornando a propriedade existente
    (propertyService.getProperties as jest.Mock)
      .mockResolvedValueOnce([
        { id: 1, area: 100, address: '123 Main St' },
      ]);

    // Mock para deleteProperty
    (propertyService.deleteProperty as jest.Mock).mockResolvedValue(undefined);

    // Mock para getProperties após exclusão, retornando uma lista vazia
    (propertyService.getProperties as jest.Mock)
      .mockResolvedValueOnce([]); // Após exclusão

    render(<PropertyContainer />);

    // Espera a propriedade ser carregada e exibida
    expect(await screen.findByText(/123 Main St/i)).toBeInTheDocument();

    // Clica no botão de excluir
    fireEvent.click(screen.getByRole('button', { name: /Excluir/i }));

    // Verifica se deleteProperty foi chamado corretamente
    await waitFor(() => {
      expect(propertyService.deleteProperty).toHaveBeenCalledWith(1);
    });

    // Espera que a propriedade não esteja mais no documento
    await waitFor(() => {
      expect(screen.queryByText(/123 Main St/i)).not.toBeInTheDocument();
    });
  });



});
