import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/Appointment';

interface AppointmentFormProps {
  initialData?: Appointment;
  onSubmit: (appointment: Appointment) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialData, onSubmit }) => {
  // Initialize appointment state with either initialData or default values
  const [appointment, setAppointment] = useState<Appointment>({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    idUser: 0,
    idProperty: 0,
  } as Appointment);

  // Update state with initialData when it changes (for editing functionality)
  useEffect(() => {
    if (initialData) {
      setAppointment({
        ...initialData,
        startDate: new Date(initialData.startDate),
        endDate: new Date(initialData.endDate),
      });
    } else {
      resetForm();
    }
  }, [initialData]);

  // Handler for form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value) : value,
    }));
  };

  // Reset form fields to default values
  const resetForm = () => {
    setAppointment({
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      idUser: 0,
      idProperty: 0,
    } as Appointment);
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(appointment);
    resetForm(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {initialData ? 'Editar Compromisso' : 'Criar Compromisso'}
      </h2>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
          Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={appointment.title}
          onChange={handleChange}
          placeholder="Digite o título do compromisso"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
          value={appointment.startDate.toISOString().slice(0, 16)}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
          value={appointment.endDate.toISOString().slice(0, 16)}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="idUser">
          ID do Usuário
        </label>
        <input
          type="number"
          name="idUser"
          id="idUser"
          value={appointment.idUser}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="idProperty">
          ID da Propriedade
        </label>
        <input
          type="number"
          name="idProperty"
          id="idProperty"
          value={appointment.idProperty}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        {initialData ? 'Atualizar Compromisso' : 'Adicionar Compromisso'}
      </button>
    </form>
  );
};

export default AppointmentForm;
