import { IAppointment } from "./IAppointment";

export interface IAppointmenteRepository {
  getAppointments(): Promise<IAppointment[]>;
  getApointment(id: number): Promise<IAppointment | null>;
  addAppointment(appointment: IAppointment): Promise<IAppointment | null>;
  updateAppointment(id:number,appointment: Partial<IAppointment>): Promise<IAppointment | null>;
  deleteAppointment(id: number): Promise<boolean>;
}
