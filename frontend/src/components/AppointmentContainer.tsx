import React, { useEffect, useState } from 'react';
import { Appointment } from '../types/Appointment';
import {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from '../services/appointmentService';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

const AppointmentContainer: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    const fetchAppointments = async () => {
        try {
            const fetchedAppointments = await getAppointments();
            setAppointments(fetchedAppointments);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCreateOrUpdate = async (appointment: Appointment) => {
        try {
            if (editingAppointment) {
                // Certifique-se de passar o `idAppointment` correto para atualização
                await updateAppointment(editingAppointment.id, appointment);
            } else {
                await createAppointment(appointment);
            }
            setEditingAppointment(null);
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (appointment: Appointment) => {
        setEditingAppointment(appointment);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAppointment(id);
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <AppointmentForm initialData={editingAppointment ?? undefined} onSubmit={handleCreateOrUpdate} />
            <AppointmentList appointments={appointments} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default AppointmentContainer;
