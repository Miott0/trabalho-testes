import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyForm from '../components/PropertyForm';
import { Property } from '../types/Property';

describe('PropertyForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa chamadas anteriores a cada teste
  });

  it('renders correctly with initial data for editing', () => {
    const initialData: Property = { id: 1, area: 100, address: '123 Main St' };
    render(<PropertyForm initialData={initialData} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Área \(m²\)/i)).toHaveValue(initialData.area);
    expect(screen.getByLabelText(/Endereço/i)).toHaveValue(initialData.address);
    expect(screen.getByText(/Editar Propriedade/i)).toBeInTheDocument();
  });

  it('renders correctly for creating a new property', () => {
    render(<PropertyForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Área \(m²\)/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Endereço/i)).toHaveValue('');
    expect(screen.getByText(/Criar Propriedade/i)).toBeInTheDocument();
  });

  it('submits the form with the correct data', () => {
    render(<PropertyForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Área \(m²\)/i), { target: { value: '150' } });
    fireEvent.change(screen.getByLabelText(/Endereço/i), { target: { value: '456 Elm St' } });

    fireEvent.click(screen.getByRole('button', { name: /Adicionar Propriedade/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({ id: 0, area: 150, address: '456 Elm St' });
  });

  it('clears the form after submission', () => {
    render(<PropertyForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Área \(m²\)/i), { target: { value: '150' } });
    fireEvent.change(screen.getByLabelText(/Endereço/i), { target: { value: '456 Elm St' } });

    fireEvent.click(screen.getByRole('button', { name: /Adicionar Propriedade/i }));

    expect(screen.getByLabelText(/Área \(m²\)/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Endereço/i)).toHaveValue('');
  });
});
