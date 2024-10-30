//USER FORM COMPONENT

import React, { useState, useEffect } from 'react';
import { User } from '../types/User';

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [user, setUser] = useState<User>({ email: '', name: '' } as User);

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    setUser({ email: '', name: '' } as User); // Limpa o formulário após o envio
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">{initialData ? 'Edit User' : 'Create User'}</button>
    </form>
  );
};

export default UserForm;
