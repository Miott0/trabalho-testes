
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentList from '../components/AppointmentList';
import { Appointment } from '../types/Appointment';

describe('AppointmentList Component', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    const appointments: Appointment[] = [
        { id: 1, title: 'Férias', startDate: new Date(), endDate: new Date(), idUser: 1, idProperty: 101 },
        { id: 2, title: 'Guarapa', startDate: new Date(), endDate: new Date(), idUser: 2, idProperty: 102 },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders "No appointments available" if no appointments are passed', () => {
        render(<AppointmentList appointments={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        expect(screen.getByText(/nenhum compromisso disponível/i)).toBeInTheDocument();
    });

    it('displays a list of appointments', () => {
        render(<AppointmentList appointments={appointments} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        expect(screen.getByText('Férias')).toBeInTheDocument();
        expect(screen.getByText('Guarapa')).toBeInTheDocument();
    });

    it('calls onEdit when the edit button is clicked', () => {
        render(<AppointmentList appointments={appointments} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        const editButtons = screen.getAllByText(/Editar/i); // Select all "Edit" buttons
        fireEvent.click(editButtons[0]); // Click the first "Edit" button
        expect(mockOnEdit).toHaveBeenCalledWith(appointments[0]);
    });

    it('calls onDelete when the delete button is clicked', () => {
        render(<AppointmentList appointments={appointments} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        const deleteButtons = screen.getAllByText(/Excluir/i); // Select all "Delete" buttons
        fireEvent.click(deleteButtons[0]); // Click the first "Delete" button
        expect(mockOnDelete).toHaveBeenCalledWith(appointments[0].id);
    });
});
