//USERCONTAINER 
import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { User } from '../types/User';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import UserList from './UserList';
import ToastAlert from './ToastAlert';
import { ToastType } from '../types/ToastType';

interface ToastProps {
  message: string;
  type: ToastType;
}

function UserContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);

  const fetchUsers = async () => setUsers(await getUsers());

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (user: User) => {
    if (editingUser) {
      await updateUser({ ...editingUser, ...user });
      
      setEditingUser(null);
    } else {
      await createUser(user);
    }
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <div>
      <UserForm onSubmit={handleCreateOrUpdate} initialData={editingUser || undefined} />
      
      {toastProps && <ToastAlert message={toastProps.message} type={toastProps.type} />}
      
      {users.length > 0 ? (
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
}

export default UserContainer;

