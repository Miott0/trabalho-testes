//USERCONTAINER TESTS

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserContainer from '../components/UserContainer';
import * as userService from '../services/userService';
import { User } from '../types/User';

jest.mock('../services/userService');

describe('UserContainer Component', () => {
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  beforeEach(() => {
    (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (userService.createUser as jest.Mock).mockResolvedValue({ id: 3, name: 'New User', email: 'newuser@example.com' });
    (userService.updateUser as jest.Mock).mockResolvedValue({ id: 1, name: 'Updated John Doe', email: 'john@example.com' });
    (userService.deleteUser as jest.Mock).mockResolvedValue({});
  });

  test('renders user list after fetch', async () => {
    render(<UserContainer />);
    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    });
  });

  test('calls createUser when adding a new user', async () => {
    render(<UserContainer />);

    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'New User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => expect(userService.createUser).toHaveBeenCalled());
  });

  test('calls deleteUser when deleting a user', async () => {
    render(<UserContainer />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0]);
    });

    await waitFor(() => expect(userService.deleteUser).toHaveBeenCalledWith(mockUsers[0].id));
  });
});
