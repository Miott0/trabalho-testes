import React from 'react';
import { Appointment } from '../types/appointment';

interface AppointmentListProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onEdit, onDelete }) => {
  if (appointments.length === 0) {
    return <p className="text-gray-500 text-center mt-4">Nenhum agendamento disponível.</p>;
  }

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">ID da Propriedade</th>
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">ID do Usuário</th>
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Data de Início</th>
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Data de Término</th>
              <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Status</th>
              <th className="py-4 px-6 text-center font-semibold uppercase tracking-wide">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="py-4 px-6 text-gray-200">{appointment.propertyId}</td>
                <td className="py-4 px-6 text-gray-200">{appointment.userId}</td>
                <td className="py-4 px-6 text-gray-200">
                  {appointment.startDate ? new Date(appointment.startDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-4 px-6 text-gray-200">
                  {appointment.endDate ? new Date(appointment.endDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-4 px-6 text-gray-300">{appointment.status}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => onEdit(appointment)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(appointment.id)}
                    className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
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
