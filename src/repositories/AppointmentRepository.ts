import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { IAppointment } from "../interface/IAppointment";

export class AppointmentRepository implements IAppointmentRepository {
  private appointments: IAppointment[] = [];


  async getAppointments(): Promise<IAppointment[]> {
    return this.appointments;
  }

  async getAppointment(id: number): Promise<IAppointment | null> {
    const appointment = this.appointments.find((appointment) => appointment.id === id);
    return appointment || null;
  }
  
  async addAppointment(appointment: IAppointment): Promise<IAppointment> {
    if (!appointment.title || appointment.idUser === undefined || appointment.idProperty === undefined) {
      throw new Error('Title, idUser, and idProperty are required');
    }
    const newAppointment = { ...appointment, id: this.appointments.length + 1 };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  async updateAppointment(
    id: number,
    appointment: Partial<IAppointment>
  ): Promise<IAppointment | null> {
    
    const appointmentIndex = this.appointments.findIndex((p) => p.id === id);
    if (appointmentIndex === -1) {
      return null;
    }
    const updatedAppointment = { ...this.appointments[appointmentIndex], ...appointment };
    this.appointments[appointmentIndex] = updatedAppointment;
    return updatedAppointment;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const appointmentIndex = this.appointments.findIndex((appointment) => appointment.id === id);
    if (appointmentIndex === -1) {
      return false;
    }
    this.appointments.splice(appointmentIndex, 1);
    return true;
  }
}
