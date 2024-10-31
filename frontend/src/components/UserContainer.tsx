//USERCONTAINER 
import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { User } from '../types/User';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import UserList from './UserList';


function UserContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null); 
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
      {users.length > 0 ? (
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
}
export default UserContainer;

