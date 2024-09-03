import { IAppointment } from "../interface/IAppointment";
import { IAppointmentService } from "../interface/IAppointmentService";
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { AppointmentRepository } from "../repositories/AppointmentRepository";

export class AppointmentService implements IAppointmentService {
  
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async getAll(): Promise<IAppointment[]> {
    return await this.appointmentRepository.getAppointments();
  }

  async getById(id: number): Promise<IAppointment | null> {
    return await this.appointmentRepository.getAppointment(id);
  }

  async create(appointment: IAppointment): Promise<IAppointment> {
    return await this.appointmentRepository.addAppointment(appointment);
  }

  async update(id: number, appointment: Partial<IAppointment>): Promise<IAppointment | null> {
    return await this.appointmentRepository.updateAppointment(id, appointment);
  }

  async delete(id: number): Promise<boolean> {
    return await this.appointmentRepository.deleteAppointment(id);
  }
}
