import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList';
import { User } from '../types/User';

describe('UserList Component', () => {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders "Nenhum usuário disponível" if no users are passed', () => {
    render(<UserList users={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText('Nenhum usuário disponível.')).toBeInTheDocument();
  });

  it('renders a table with user data', () => {
    render(<UserList users={users} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    // Check if each user is rendered in the table
    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it('calls onEdit when Editar button is clicked', () => {
    render(<UserList users={users} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const editButtons = screen.getAllByRole('button', { name: 'Editar' });
    fireEvent.click(editButtons[0]); // Click edit button for the first user
    
    expect(mockOnEdit).toHaveBeenCalledWith(users[0]);
  });

  it('calls onDelete when Excluir button is clicked', () => {
    render(<UserList users={users} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: 'Excluir' });
    fireEvent.click(deleteButtons[1]); // Click delete button for the second user
    
    expect(mockOnDelete).toHaveBeenCalledWith(users[1].id);
  });
});
