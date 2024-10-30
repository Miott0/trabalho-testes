import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyForm from '../components/PropertyForm';
import '@testing-library/jest-dom';

describe('PropertyForm Component', () => {
  const onSubmit = jest.fn();

  test('renders form fields correctly', () => {
    render(<PropertyForm onSubmit={onSubmit} />);
    expect(screen.getByPlaceholderText('Area')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
  });

  test('calls onSubmit with property data when form is submitted', () => {
    render(<PropertyForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Area'), { target: { value: '150' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '789 Pine Rd' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledWith({ id: 0, area: 150, address: '789 Pine Rd' });
  });

  test('displays edit button when initialData is provided', () => {
    render(<PropertyForm onSubmit={onSubmit} initialData={{ id: 1, area: 100, address: '123 Main St' }} />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
  });

  test('resets form after submission', () => {
    render(<PropertyForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Area'), { target: { value: '150' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '789 Pine Rd' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(screen.getByPlaceholderText('Area')).toHaveValue(0);
    expect(screen.getByPlaceholderText('Address')).toHaveValue('');
  });
});
