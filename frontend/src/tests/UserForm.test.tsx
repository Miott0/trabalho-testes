//USE FORM TEST

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm';
import '@testing-library/jest-dom';


describe('UserForm Component', () => {
  const onSubmit = jest.fn();

  test('renders form fields correctly', () => {
    render(<UserForm onSubmit={onSubmit} />);
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('calls onSubmit with user data when form is submitted', () => {
    render(<UserForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com' });
  });
});
