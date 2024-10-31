import axios from 'axios';
import { Appointment } from '../types/appointment';

const API_URL = 'http://localhost:3000/appointments';

export const getAppointments = async (): Promise<Appointment[]> => {
    const response = await axios.get<Appointment[]>(API_URL);
    return response.data;
};

export const createAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    const response = await axios.post<Appointment>(API_URL, appointment, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateAppointment = async (id: string, updatedData: Partial<Appointment>): Promise<Appointment> => {
    const response = await axios.put<Appointment>(`${API_URL}/${id}`, updatedData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteAppointment = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
