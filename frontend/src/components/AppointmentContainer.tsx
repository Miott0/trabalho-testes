import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/appointment';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../services/appointmentService';
import {AppointmentForm} from './AppointmentForm';
import {AppointmentList} from './AppointmentList';

export const AppointmentContainer: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  // Função para buscar os agendamentos da API e atualizar o estado
  const fetchAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Função para criar ou atualizar um agendamento
  const handleCreateOrUpdate = async (appointment: Omit<Appointment, 'id'>) => {
    if (editingAppointment) {
      await updateAppointment(editingAppointment.id, appointment);
      setEditingAppointment(null); // Reseta o estado de edição após a atualização
    } else {
      await createAppointment(appointment);
    }
    fetchAppointments(); // Atualiza a lista de agendamentos
  };

  // Função para deletar um agendamento
  const handleDelete = async (id: string) => {
    await deleteAppointment(id);
    fetchAppointments(); // Atualiza a lista de agendamentos após exclusão
  };

  // Função para editar um agendamento
  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  // Função para fechar o formulário
  const handleCloseForm = () => {
    setEditingAppointment(null); // Reseta o estado de edição para fechar o formulário
  };

  return (
    <div>
      <AppointmentForm
        onSubmit={handleCreateOrUpdate}
        initialData={editingAppointment || undefined}
        onClose={handleCloseForm} // Passa a função onClose
      />
      <AppointmentList appointments={appointments} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
