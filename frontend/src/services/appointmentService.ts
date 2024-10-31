import { Appointment } from '../types/appointment';

const API_URL = 'http://localhost:3000/api/appointments';

export const getAppointments = async (): Promise<Appointment[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch appointments');
    }
    return await response.json();
};

export const createAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
    });
    if (!response.ok) {
        throw new Error('Failed to create appointment');
    }
    return await response.json();
};

export const updateAppointment = async (id: string, updatedData: Partial<Appointment>): Promise<Appointment> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
        throw new Error('Failed to update appointment');
    }
    return await response.json();
};

export const deleteAppointment = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete appointment');
    }
};
