import { IAppointmenteRepository } from "../interface/IAppointmenteRepository";
import { IAppointment } from "../interface/IAppointment";

export class AppointmentRespository implements IAppointmenteRepository {
  private appointments: IAppointment[] = [];


  async getAppointments(): Promise<IAppointment[]> {
    return this.appointments;
  }

  getApointment(id: number): Promise<IAppointment | null> {
    throw new Error("Method not implemented.");
  }
  addAppointment(appointment: IAppointment): Promise<IAppointment | null> {
    throw new Error("Method not implemented.");
  }
  updateAppointment(
    id: number,
    appointment: Partial<IAppointment>
  ): Promise<IAppointment | null> {
    throw new Error("Method not implemented.");
  }
  deleteAppointment(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
