import { Appointment } from './appointment';

export type CalendarDay = {
    startDate: Date;
    endDate: Date;
    appointments: Appointment[];
};