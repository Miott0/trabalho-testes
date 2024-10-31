// components/UserList.tsx
import React from 'react';
import { User } from '../types/User';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <p className="text-gray-500 text-center mt-4">Nenhum usuário disponível.</p>;
  }

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Nome</th>
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Email</th>
              <th className="py-4 px-6 text-center font-semibold uppercase tracking-wide">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="py-4 px-6 text-gray-200">{user.name}</td>
                <td className="py-4 px-6 text-gray-300">{user.email}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => onEdit(user)}
                    name='edit'
                    className="bg-[#E8E03A] hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(user.id!)}
                    name='delete'
                    className="bg-[#584E69] hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
