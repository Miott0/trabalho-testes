import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { User } from '../types/User';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import UserList from './UserList';
import ToastAlert from './ToastAlert'; // Importe o ToastAlert

function UserContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean }>({
    message: '',
    type: 'success',
    show: false,
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, show: true });
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      showToast('Erro ao buscar usuários', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (user: User) => {
    try {
      if (editingUser) {
        await updateUser({ ...editingUser, ...user });
        showToast('Usuario atualizado com sucesso!', 'success');
        setEditingUser(null);
      } else {
        await createUser(user);
        showToast('Usuario criado com sucesso!', 'success');
      }
      fetchUsers();
    } catch (error) {
      console.error('Erro ao criar ou atualizar o usuario:', error);
      showToast('Erro ao criar ou atualizar o usuario', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      fetchUsers();
      showToast('Usuario deletado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao deletar o usuario:', error);
      showToast('Erro ao deletar o usuario', 'error');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <div>
      <UserForm onSubmit={handleCreateOrUpdate} initialData={editingUser || undefined} />
      {users.length > 0 ? (
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <p>No users available.</p>
      )}
      {toast.show && (
        <ToastAlert
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}

export default UserContainer;
