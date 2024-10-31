import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/appointment';

interface AppointmentFormProps {
  initialData?: Appointment;
  onSubmit: (appointment: Omit<Appointment, 'id'>) => void;
  onClose: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    propertyId: initialData?.propertyId || '',
    userId: initialData?.userId || '',
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().slice(0, 16) : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().slice(0, 16) : '',
    status: initialData?.status || 'pending',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        propertyId: initialData.propertyId,
        userId: initialData.userId,
        startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().slice(0, 16) : '',
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().slice(0, 16) : '',
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {initialData ? 'Editar Agendamento' : 'Criar Agendamento'}
      </h2>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="propertyId">
          ID da Propriedade
        </label>
        <input
          type="text"
          name="propertyId"
          id="propertyId"
          value={formData.propertyId}
          onChange={handleChange}
          placeholder="Digite o ID da propriedade"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="userId">
          ID do Usuário
        </label>
        <input
          type="text"
          name="userId"
          id="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="Digite o ID do usuário"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">
          Data de Início
        </label>
        <input
          type="datetime-local"
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="endDate">
          Data de Término
        </label>
        <input
          type="datetime-local"
          name="endDate"
          id="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="status">
          Status
        </label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="confirmed">Confirmado</option>
          <option value="pending">Pendente</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {initialData ? 'Atualizar Agendamento' : 'Criar Agendamento'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
