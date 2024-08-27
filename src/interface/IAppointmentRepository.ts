import { IAppointment } from "./IAppointment";

export interface IAppointmentRepository {
  getAppointments(): Promise<IAppointment[]>;
  getAppointment(id: number): Promise<IAppointment | null>;
  addAppointment(appointment: IAppointment): Promise<IAppointment>;
  updateAppointment(id:number,appointment: Partial<IAppointment>): Promise<IAppointment | null>;
  deleteAppointment(id: number): Promise<boolean>;
}
