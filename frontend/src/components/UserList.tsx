// components/UserList.tsx
import React from 'react';
import { User } from '../types/User';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-900">
            <th className="py-3 px-6 text-left font-semibold uppercase tracking-wider">Name</th>
            <th className="py-3 px-6 text-left font-semibold uppercase tracking-wider">Email</th>
            <th className="py-3 px-6 text-center font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id!)}
                  className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
