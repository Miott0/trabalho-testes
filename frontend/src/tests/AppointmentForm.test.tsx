
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../types/Appointment';

describe('AppointmentForm Component', () => {
    const mockOnSubmit = jest.fn();

    const initialData: Appointment = {
        id: 1,
        title: 'Dentist',
        startDate: new Date(),
        endDate: new Date(),
        idProperty: 100,
        idUser: 2
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with no initial data', () => {
        render(<AppointmentForm onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
        expect(screen.getByText(/Adicionar Compromisso/i)).toBeInTheDocument();
    });

    it('renders correctly with initial data', () => {
        render(<AppointmentForm initialData={initialData} onSubmit={mockOnSubmit} />);

        expect(screen.getByDisplayValue('Dentist')).toBeInTheDocument();
    });

    it('calls onSubmit with the correct data when form is submitted', () => {
        render(<AppointmentForm onSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Meeting' } });
        fireEvent.click(screen.getByText(/Adicionar Compromisso/i));

        expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ title: 'Meeting' }));
    });
});
