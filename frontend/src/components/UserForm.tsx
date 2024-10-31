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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {initialData ? 'Editar Usuário' : 'Criar Usuário'}
      </h2>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Digite o nome do usuário"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Digite o email do usuário"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        {initialData ? 'Atualizar Usuário' : 'Adicionar Usuário'}
      </button>
    </form>
  );
};

export default UserForm;