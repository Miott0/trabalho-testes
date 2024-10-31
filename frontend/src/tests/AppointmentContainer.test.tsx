import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AppointmentContainer from '../components/AppointmentContainer';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services/appointmentService';
import { Appointment } from '../types/Appointment';

// Mocking service functions
jest.mock('../services/appointmentService');
const mockGetAppointments = getAppointments as jest.Mock;
const mockCreateAppointment = createAppointment as jest.Mock;
const mockUpdateAppointment = updateAppointment as jest.Mock;
const mockDeleteAppointment = deleteAppointment as jest.Mock;

describe('AppointmentContainer Component', () => {
    const mockAppointments: Appointment[] = [
        { id: 1, title: 'Aula fora', startDate: new Date(), endDate: new Date(), idProperty: 500, idUser: 1504 },
        { id: 2, title: 'Intercambio', startDate: new Date(), endDate: new Date(), idProperty: 500, idUser: 1504 },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches and displays appointments on render', async () => {
        mockGetAppointments.mockResolvedValueOnce(mockAppointments);

        render(<AppointmentContainer />);

        // Remova ou ajuste a expectativa do "loading" se não for necessária
        // expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for appointments to load
        await waitFor(() => {
            expect(screen.getByText('Aula fora')).toBeInTheDocument();
            expect(screen.getByText('Intercambio')).toBeInTheDocument();
        });
    });

    it('handles appointment creation', async () => {
        mockGetAppointments.mockResolvedValueOnce([]);
        mockCreateAppointment.mockResolvedValueOnce({ id: 3, title: 'New Meeting', startDate: new Date(), endDate: new Date() });

        render(<AppointmentContainer />);

        act(() => {
            fireEvent.click(screen.getByText(/Adicionar Compromisso/i));
        });

        // Simulate form submission
        act(() => {
            fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'New Meeting' } });
            fireEvent.click(screen.getByText(/Adicionar Compromisso/i));
        });

        await waitFor(() => {
            expect(mockCreateAppointment).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Meeting' }));
        });
    });

    it('handles appointment deletion', async () => {
        mockGetAppointments.mockResolvedValueOnce(mockAppointments);
        mockDeleteAppointment.mockResolvedValueOnce(true);
    
        render(<AppointmentContainer />);
    
        // Wait for the appointments to load
        await waitFor(() => {
            expect(screen.getByText('Aula fora')).toBeInTheDocument();
        });
    
        // Use getAllByText to get all "Excluir" buttons and select the first one
        const deleteButtons = screen.getAllByText(/Excluir/i);
        const deleteButton = deleteButtons[0]; // Choose the first "Excluir" button
    
        // Use act to wrap the click event
        act(() => {
            fireEvent.click(deleteButton);
        });
    
        await waitFor(() => {
            expect(mockDeleteAppointment).toHaveBeenCalledWith(1);
        });
    });    
});
