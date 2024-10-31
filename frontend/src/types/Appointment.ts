export interface Appointment {
    id: number;
    title?: string;
    startDate: Date;
    endDate: Date;
    idUser: number;
    idProperty: number;
}