import { IAppointment } from "../interface/IAppointment";
import { IAppointmentService } from "../interface/IAppointmentService";
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { IUserService } from "src/interface/IUserService";
import { IPropertyService } from "src/interface/IPropertyService";

export class AppointmentService implements IAppointmentService {
  
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly userService: IUserService,
    private readonly propertyService: IPropertyService
  ) {}

  async getAll(): Promise<IAppointment[]> {
    return await this.appointmentRepository.getAppointments();
  }

  async getById(id: number): Promise<IAppointment | null> {
    return await this.appointmentRepository.getAppointment(id);
  }

  async create(appointment: IAppointment): Promise<IAppointment> {
    const appointmentExists = await this.appointmentRepository.getAppointment(appointment.id);
    const user = await this.userService.getUserById(appointment.idUser);
    const property = await this.propertyService.getProperty(appointment.idProperty);
    
    if(appointmentExists) {
      throw new Error(`Appointment with ID ${appointment.id} already exists`);
    }

    if(!user || !property) {
      throw new Error(`User or Property does not exist`);
    }
    return await this.appointmentRepository.addAppointment(appointment);
  }

  async update(id: number, appointment: Partial<IAppointment>): Promise<IAppointment | null> {
    const appointmentExists = await this.appointmentRepository.getAppointment(id);
    if(!appointmentExists){
      throw new Error(`Appointment with ID ${id} does not exist`);
    }
    return await this.appointmentRepository.updateAppointment(id, appointment);
  }

  async delete(id: number): Promise<boolean> {
    const appointmentExists = await this.appointmentRepository.getAppointment(id);
    if(!appointmentExists){
      throw new Error(`Appointment with ID ${id} does not exist`);
    }
    return await this.appointmentRepository.deleteAppointment(id);
  }
}
