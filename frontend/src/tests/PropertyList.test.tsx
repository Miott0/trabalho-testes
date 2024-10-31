import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyList from '../components/PropertyList';
import '@testing-library/jest-dom';
import { IProperty } from '../types/Property';

describe('PropertyList Component', () => {
  const properties: IProperty[] = [
    { id: 1, area: 100, address: '123 Main St' },
    { id: 2, area: 200, address: '456 Oak Ave' },
  ];
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  test('renders property list correctly', () => {
    render(<PropertyList properties={properties} onEdit={onEdit} onDelete={onDelete} />);

    properties.forEach((property) => {
      expect(screen.getByText(property.address)).toBeInTheDocument();
    });
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<PropertyList properties={properties} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Edit')[0]);

    expect(onEdit).toHaveBeenCalledWith(properties[0]);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<PropertyList properties={properties} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Delete')[0]);

    expect(onDelete).toHaveBeenCalledWith(properties[0].id);
  });

  test('displays "No properties available" message when property list is empty', () => {
    render(<PropertyList properties={[]} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText(/no properties available/i)).toBeInTheDocument(); // Ajuste: uso de regex para tornar a busca flexível
  });
});