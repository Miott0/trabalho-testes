import { IAppointment } from "../interface/IAppointment";

export class Appointment implements IAppointment {
    id: number;
    title?: string;
    startDate: Date; 
    endDate: Date;
    idUser: number;
    idProperty: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(id: number, title: string, startDate: Date, endDate: Date, idUser: number, idProperty: number, createdAt?: Date, updatedAt?: Date) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.idUser = idUser;
        this.idProperty = idProperty;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

