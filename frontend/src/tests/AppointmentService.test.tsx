import axios from 'axios';
import {
  getAppointments,
  getAppointment,
  createProperty,
  updateAppointment,
  deleteAppointment,
} from '../services/appointmentService';
import { Appointment } from '../types/Appointment';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Appointment Service', () => {
  const mockAppointments: Appointment[] = [
    {
      id: 1,
      title: 'Consulta médica',
      startDate: new Date('2023-10-31T10:00:00'),
      endDate: new Date('2023-10-31T11:00:00'),
      idUser: 1,
      idProperty: 1,
    },
    {
      id: 2,
      title: 'Reunião de trabalho',
      startDate: new Date('2023-11-01T14:00:00'),
      endDate: new Date('2023-11-01T15:00:00'),
      idUser: 2,
      idProperty: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve buscar todos os agendamentos', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockAppointments });

    const result = await getAppointments();
    expect(result).toEqual(mockAppointments);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/appointments');
  });

  test('deve buscar um agendamento específico', async () => {
    const mockAppointment: Appointment = {
      id: 1,
      title: 'Consulta médica',
      startDate: new Date('2023-10-31T10:00:00'),
      endDate: new Date('2023-10-31T11:00:00'),
      idUser: 1,
      idProperty: 1,
    };
    mockedAxios.get.mockResolvedValue({ data: mockAppointment });

    const result = await getAppointment(1);
    expect(result).toEqual(mockAppointment);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/appointments/1');
  });

  test('deve criar um novo agendamento', async () => {
    const newAppointment: Appointment = {
      id: 3,
      title: 'Visita ao dentista',
      startDate: new Date('2023-11-02T09:00:00'),
      endDate: new Date('2023-11-02T10:00:00'),
      idUser: 1,
      idProperty: 2,
    };
    const { id, ...appointmentData } = newAppointment;
    mockedAxios.post.mockResolvedValue({ data: { id: 3, ...appointmentData } });

    const result = await createProperty(newAppointment);
    expect(result).toEqual({ id: 3, ...appointmentData });
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/appointments', newAppointment);
  });

  test('deve atualizar um agendamento existente', async () => {
    const updatedAppointmentData: Partial<Appointment> = {
      title: 'Consulta médica atualizada',
      endDate: new Date('2023-10-31T12:00:00'),
    };
    const updatedAppointment: Appointment = {
      id: 1,
      title: 'Consulta médica atualizada',
      startDate: new Date('2023-10-31T10:00:00'),
      endDate: new Date('2023-10-31T12:00:00'),
      idUser: 1,
      idProperty: 1,
    };
    mockedAxios.put.mockResolvedValue({ data: updatedAppointment });

    const result = await updateAppointment(1, updatedAppointmentData);
    expect(result).toEqual(updatedAppointment);
    expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:3000/appointments/1', updatedAppointmentData);
  });

  test('deve excluir um agendamento', async () => {
    mockedAxios.delete.mockResolvedValue({});

    await deleteAppointment(1);
    expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:3000/appointments/1');
  });

  test('deve lançar um erro ao falhar ao buscar agendamentos', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(getAppointments()).rejects.toThrow('Failed to fetch appointments');
  });

  test('deve lançar um erro ao falhar ao buscar um agendamento', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(getAppointment(1)).rejects.toThrow('Failed to fetch appointment');
  });

  test('deve lançar um erro ao falhar ao criar um agendamento', async () => {
    const newAppointment: Appointment = {
        title: 'Visita ao dentista',
        startDate: new Date('2023-11-02T09:00:00'),
        endDate: new Date('2023-11-02T10:00:00'),
        idUser: 1,
        idProperty: 2,
        id: 3,
    };
    mockedAxios.post.mockRejectedValue(new Error('Network Error'));

    await expect(createProperty(newAppointment)).rejects.toThrow('Failed to create appointment');
  });

  test('deve lançar um erro ao falhar ao atualizar um agendamento', async () => {
    const updatedAppointmentData: Partial<Appointment> = {
      title: 'Consulta médica atualizada',
    };
    mockedAxios.put.mockRejectedValue(new Error('Network Error'));

    await expect(updateAppointment(1, updatedAppointmentData)).rejects.toThrow('Failed to update appointment');
  });

  test('deve lançar um erro ao falhar ao excluir um agendamento', async () => {
    mockedAxios.delete.mockRejectedValue(new Error('Network Error'));

    await expect(deleteAppointment(1)).rejects.toThrow('Failed to delete appointment');
  });
});
