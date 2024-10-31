import axios from "axios";
import { Appointment } from "../types/Appointment"

const API_URL = 'http://localhost:3000/appointments';

const handleResponse = (response: any) => response.data;


export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axios.get(API_URL);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to fetch appointments');
  }
};

export const getAppointment = async (id: number): Promise<Appointment | undefined> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to fetch appointment');
  }
};

export const createAppointment = async (appointment: Appointment): Promise<Appointment> => {
    const data = {
        title: appointment.title,
        startDate: appointment.startDate.toISOString(),
        endDate: appointment.endDate.toISOString(),
        idUser: Number(appointment.idUser),
        idProperty: Number(appointment.idProperty),
    };
  try {
    const response = await axios.post(API_URL, appointment);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to create appointment');
  }
};

export const updateAppointment = async (id: number, appointmentData: Partial<Appointment>): Promise<Appointment> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, appointmentData);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to update appointment');
  }
};

export const deleteAppointment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete appointment');
  }
};
