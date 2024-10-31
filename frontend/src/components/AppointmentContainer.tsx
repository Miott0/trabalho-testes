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
import ToastAlert from './ToastAlert'; // Importe o ToastAlert

const AppointmentContainer: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean }>({
        message: '',
        type: 'success',
        show: false,
    });

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type, show: true });
    };

    const fetchAppointments = async () => {
        try {
            const fetchedAppointments = await getAppointments();
            setAppointments(fetchedAppointments);
        } catch (error) {
            console.error(error);
            showToast('Falha ao carregar os compromissos', 'error');
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCreateOrUpdate = async (appointment: Appointment) => {
        try {
            if (editingAppointment) {
                await updateAppointment(editingAppointment.id, appointment);
                showToast('Compromisso editado com sucesso!', 'success');
            } else {
                await createAppointment(appointment);
                showToast('Compromisso adicionado com sucesso!', 'success');
            }
            setEditingAppointment(null);
            fetchAppointments();
        } catch (error) {
            console.error(error);
            showToast('Falha na operação', 'error');
        }
    };

    const handleEdit = (appointment: Appointment) => {
        setEditingAppointment(appointment);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAppointment(id);
            fetchAppointments();
            showToast('Compromisso deletado com sucesso!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Falha na operação', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <AppointmentForm initialData={editingAppointment ?? undefined} onSubmit={handleCreateOrUpdate} />
            <AppointmentList appointments={appointments} onEdit={handleEdit} onDelete={handleDelete} />
            {toast.show && (
                <ToastAlert
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default AppointmentContainer;
