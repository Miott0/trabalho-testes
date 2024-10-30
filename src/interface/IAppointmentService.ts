import { IAppointment } from "./IAppointment";

export interface IAppointmentService {
  getAll(): Promise<IAppointment[]>;
  getById(id: number): Promise<IAppointment | null>;
  create(appointment: IAppointment): Promise<IAppointment>;
  update(id: number, appointment: Partial<IAppointment>): Promise<IAppointment | null>;
  delete(id: number): Promise<boolean>;
}