// src/tests/PropertyContainer.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyContainer from '../components/PropertyContainer';
import * as propertyService from '../services/propertyService'; // ajuste o caminho conforme necessário

jest.mock('../services/propertyService'); // Mocking the property service

describe('PropertyContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  test('loads and displays properties', async () => {
    // Mocking the response for fetching properties
    (propertyService.getProperties as jest.Mock).mockResolvedValue([
      { id: 1, area: 100, address: '123 Main St' },
      { id: 2, area: 150, address: '456 Elm St' },
    ]);

    render(<PropertyContainer />);

    // Wait for properties to load
    await waitFor(() => {
      expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
      expect(screen.getByText(/456 Elm St/i)).toBeInTheDocument(); // Verificar o segundo endereço
    });
  });

  test('creates a new property', async () => {
    (propertyService.createProperty as jest.Mock).mockResolvedValue({ id: 3, area: 200, address: '789 Oak St' });
    (propertyService.getProperties as jest.Mock).mockResolvedValueOnce([
      { id: 1, area: 100, address: '123 Main St' },
      { id: 2, area: 150, address: '456 Elm St' },
    ]);

    render(<PropertyContainer />);

    // Fill in the form to create a new property
    fireEvent.change(screen.getByLabelText(/Área \(m²\)/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/Endereço/i), { target: { value: '789 Oak St' } });
    fireEvent.click(screen.getByRole('button', { name: /Adicionar Propriedade/i }));

    // Wait for the createProperty function to be called
    await waitFor(() => {
      expect(propertyService.createProperty).toHaveBeenCalledWith({ area: 200, address: '789 Oak St' });
    });

    // Verify that the new property is displayed
    await waitFor(() => {
      expect(screen.getByText(/789 Oak St/i)).toBeInTheDocument();
    });
  });

  test('updates an existing property', async () => {
    (propertyService.getProperties as jest.Mock).mockResolvedValue([
      { id: 1, area: 100, address: '123 Main St' },
    ]);
    (propertyService.updateProperty as jest.Mock).mockResolvedValue({ id: 1, area: 120, address: '123 Main St Updated' });

    render(<PropertyContainer />);

    // Wait for the property to load
    await waitFor(() => {
      expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    });

    // Edit the first property
    fireEvent.click(screen.getByRole('button', { name: /Editar/i }));

    // Update the property details
    fireEvent.change(screen.getByLabelText(/Área \(m²\)/i), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText(/Endereço/i), { target: { value: '123 Main St Updated' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i })); // Assume there's a save button after editing

    // Wait for the updateProperty function to be called
    await waitFor(() => {
      expect(propertyService.updateProperty).toHaveBeenCalledWith(1, { area: 120, address: '123 Main St Updated' });
    });

    // Verify that the updated property is displayed
    await waitFor(() => {
      expect(screen.getByText(/123 Main St Updated/i)).toBeInTheDocument();
    });
  });

  test('deletes a property', async () => {
    (propertyService.getProperties as jest.Mock).mockResolvedValue([
      { id: 1, area: 100, address: '123 Main St' },
    ]);
    (propertyService.deleteProperty as jest.Mock).mockResolvedValue(undefined);

    render(<PropertyContainer />);

    // Wait for the property to load
    await waitFor(() => {
      expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    });

    // Delete the property
    fireEvent.click(screen.getByRole('button', { name: /Excluir/i })); // Verifique se o nome do botão está correto

    // Wait for the deleteProperty function to be called
    await waitFor(() => {
      expect(propertyService.deleteProperty).toHaveBeenCalledWith(1);
    });

    // Verify that the property is no longer displayed
    await waitFor(() => {
      expect(screen.queryByText(/123 Main St/i)).not.toBeInTheDocument();
    });
  });
});
