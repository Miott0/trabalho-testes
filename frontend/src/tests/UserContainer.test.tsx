import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserContainer from '../components/UserContainer';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import { User } from '../types/User';

// Mock das funções do serviço
jest.mock('../services/userService');
const mockGetUsers = getUsers as jest.Mock;
const mockCreateUser = createUser as jest.Mock;
const mockUpdateUser = updateUser as jest.Mock;
const mockDeleteUser = deleteUser as jest.Mock;

describe('UserContainer Component', () => {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUsers.mockResolvedValue(users);
  });

  it('fetches and displays users on load', async () => {
    render(<UserContainer />);

    // Espera a lista de usuários ser exibida após o fetch
    await waitFor(() => {
      users.forEach((user) => {
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    });
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('allows creating a new user', async () => {
    mockCreateUser.mockResolvedValue({ id: 3, name: 'Charlie', email: 'charlie@example.com' });

    render(<UserContainer />);

    // Simula a criação de um novo usuário
    fireEvent.change(screen.getByPlaceholderText('Digite o nome do usuário'), {
      target: { value: 'Charlie' },
    });
    fireEvent.change(screen.getByPlaceholderText('Digite o email do usuário'), {
      target: { value: 'charlie@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /adicionar usuário/i }));

    // Verifica se a função de criação foi chamada com os dados corretos
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        name: 'Charlie',
        email: 'charlie@example.com',
      });
    });
    expect(mockGetUsers).toHaveBeenCalledTimes(2); // Chamado para refazer o fetch
  });

  it('allows editing an existing user', async () => {
    mockUpdateUser.mockResolvedValue({ ...users[0], name: 'Alice Updated' });

    render(<UserContainer />);

    // Clique no botão de editar para o primeiro usuário
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0]);
    });

    // Atualiza o nome do usuário
    const nameInput = screen.getByPlaceholderText('Digite o nome do usuário');
    fireEvent.change(nameInput, { target: { value: 'Alice Updated' } });
    fireEvent.click(screen.getByRole('button', { name: /atualizar usuário/i }));

    // Verifica se a função de atualização foi chamada com os dados corretos
    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        ...users[0],
        name: 'Alice Updated',
      });
    });
    expect(mockGetUsers).toHaveBeenCalledTimes(2); // Chamado para refazer o fetch
  });

  it('allows deleting a user', async () => {
    mockDeleteUser.mockResolvedValue({});

    render(<UserContainer />);

    // Clique no botão de excluir para o segundo usuário
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Excluir' })[1]);
    });

    // Verifica se a função de exclusão foi chamada com o ID correto
    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith(users[1].id);
    });
    expect(mockGetUsers).toHaveBeenCalledTimes(2); // Chamado para refazer o fetch
  });

  it('displays "No users available" if user list is empty', async () => {
    mockGetUsers.mockResolvedValueOnce([]); // Nenhum usuário disponível no primeiro fetch
    render(<UserContainer />);

    await waitFor(() => {
      expect(screen.getByText('No users available.')).toBeInTheDocument();
    });
  });
});
