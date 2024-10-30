// tests/UserList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList';
import '@testing-library/jest-dom';
import { User } from '../types/User';

describe('UserList Component', () => {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  test('renders user list correctly', () => {
    render(<UserList users={users} onEdit={onEdit} onDelete={onDelete} />);

    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<UserList users={users} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Edit')[0]);

    expect(onEdit).toHaveBeenCalledWith(users[0]);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<UserList users={users} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Delete')[0]);

    expect(onDelete).toHaveBeenCalledWith(users[0].id);
  });
});
