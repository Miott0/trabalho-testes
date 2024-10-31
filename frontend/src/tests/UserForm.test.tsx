import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm';
import { User } from '../types/User';

describe('UserForm Component', () => {
  const mockOnSubmit = jest.fn();

  const initialData: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with no initial data', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    // Verifica se o formulário exibe o título "Criar Usuário"
    expect(screen.getByText('Criar Usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome do usuário')).toHaveValue('');
    expect(screen.getByPlaceholderText('Digite o email do usuário')).toHaveValue('');
  });

  it('renders with initial data and displays "Editar Usuário"', () => {
    render(<UserForm onSubmit={mockOnSubmit} initialData={initialData} />);

    // Verifica se o título é atualizado para "Editar Usuário"
    expect(screen.getByText('Editar Usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome do usuário')).toHaveValue(initialData.name);
    expect(screen.getByPlaceholderText('Digite o email do usuário')).toHaveValue(initialData.email);
  });

  it('allows input changes', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    // Atualiza o campo de nome
    const nameInput = screen.getByPlaceholderText('Digite o nome do usuário');
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    expect(nameInput).toHaveValue('Alice');

    // Atualiza o campo de email
    const emailInput = screen.getByPlaceholderText('Digite o email do usuário');
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    expect(emailInput).toHaveValue('alice@example.com');
  });

  it('calls onSubmit with user data and clears form after submission', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByPlaceholderText('Digite o nome do usuário');
    const emailInput = screen.getByPlaceholderText('Digite o email do usuário');
    const submitButton = screen.getByRole('button', { name: /adicionar usuário/i });

    // Preenche os campos
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });

    // Submete o formulário
    fireEvent.click(submitButton);

    // Verifica se onSubmit foi chamado com os dados corretos
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
    });

    // Verifica se o formulário foi limpo após o envio
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });

  it('renders "Atualizar Usuário" button text when initialData is provided', () => {
    render(<UserForm onSubmit={mockOnSubmit} initialData={initialData} />);
    
    const submitButton = screen.getByRole('button', { name: /atualizar usuário/i });
    expect(submitButton).toBeInTheDocument();
  });
});
