import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyList from '../components/PropertyList';
import { Property } from '../types/Property';

describe('PropertyList', () => {
  const mockProperties: Property[] = [
    { id: 1, area: 100, address: '123 Main St' },
    { id: 2, area: 200, address: '456 Elm St' },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders a message when there are no properties', () => {
    render(<PropertyList properties={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const noPropertiesMessage = screen.getByText(/Nenhuma propriedade disponível/i);
    expect(noPropertiesMessage).toBeInTheDocument();
  });

  it('renders the property cards when properties are available', () => {
    render(<PropertyList properties={mockProperties} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const propertyCards = screen.getAllByText(/Área:/i);
    expect(propertyCards.length).toBe(mockProperties.length);
    
    // Check for presence of other elements
    mockProperties.forEach(property => {
      expect(screen.getByText(`Área: ${property.area} m²`)).toBeInTheDocument();
      expect(screen.getByText(property.address)).toBeInTheDocument();
    });
  });

  it('calls onEdit when the Edit button is clicked', () => {
    render(<PropertyList properties={mockProperties} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const editButtons = screen.getAllByText(/Editar/i);
    fireEvent.click(editButtons[0]); // Click on the first edit button
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockProperties[0]);
  });

  it('calls onDelete when the Delete button is clicked', () => {
    render(<PropertyList properties={mockProperties} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByText(/Excluir/i);
    fireEvent.click(deleteButtons[0]); // Click on the first delete button
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockProperties[0].id);
  });

  it('applies the correct styles to the property cards', () => {
    render(<PropertyList properties={mockProperties} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    // Get all property cards
    const propertyCards = screen.getAllByText(/Área:/i).map((el) => el.closest('div'));

    propertyCards.forEach((card) => {
      expect(card).toHaveClass('bg-gradient-to-br from-purple-600 to-indigo-600');
      expect(card).toHaveClass('text-white');
    });
  });
});
