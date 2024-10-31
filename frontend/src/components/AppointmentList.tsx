// components/AppointmentList.tsx
import React from 'react';
import { Appointment } from '../types/Appointment';

interface AppointmentListProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: number) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onEdit, onDelete }) => {
  if (appointments.length === 0) {
    return <p className="text-gray-500 text-center mt-4">Nenhum compromisso disponível.</p>;
  }

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Título</th>
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Data de Início</th>
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Data de Término</th>
              <th className="py-4 px-6 text-center font-semibold uppercase tracking-wide">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="py-4 px-6 text-gray-200">{appointment.title}</td>
                <td className="py-4 px-6 text-gray-300">{new Date(appointment.startDate).toLocaleString()}</td>
                <td className="py-4 px-6 text-gray-300">{new Date(appointment.endDate).toLocaleString()}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => onEdit(appointment)}
                    className="bg-[#E8E03A] hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(appointment.id!)}
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

export default AppointmentList;
