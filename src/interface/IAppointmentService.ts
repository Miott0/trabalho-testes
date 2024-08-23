import { IAppointment } from "./IAppointment";

export interface IAppointmentService {
  getAll(): Promise<IAppointment[]>;
  getById(id: number): Promise<IAppointment | null>;
  create(appointment: IAppointment): Promise<IAppointment | null>;
  update(appointment: IAppointment): Promise<IAppointment | null>;
  delete(id: number): Promise<boolean>;
}