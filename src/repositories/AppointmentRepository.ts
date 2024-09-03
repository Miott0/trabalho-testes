import prisma from '../client';
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { IAppointment } from "../interface/IAppointment";

export class AppointmentRepository implements IAppointmentRepository {
  async getAppointments(): Promise<IAppointment[]> {
    try{
      const appointments = await prisma.appointment.findMany()
      return appointments
    }catch(err:any){
      throw new Error(`Error getting appointments`)
    }
  }

  async getAppointment(id: number): Promise<IAppointment | null> {
    try{
      const appointment = await prisma.appointment.findUnique({where: {id}})
      if(!appointment) return null
      return appointment
    }catch(err:any){
      throw new Error(`Error getting appointment`)
    }
  }

  async addAppointment(appointment: IAppointment): Promise<IAppointment> {
    try {
      const newAppointment = await prisma.appointment.create({
        data: {
          startDate: appointment.startDate,
          endDate: appointment.endDate,
          idUser: appointment.idUser,
          idProperty: appointment.idProperty,
          title: appointment.title || '' // Default value for title if undefined
        }
      });
      return newAppointment;
    } catch (err: any) {
      throw new Error(`Error creating appointment`);
    }
  }

  async updateAppointment(id: number, appointment: Partial<IAppointment>): Promise<IAppointment | null> {
    throw new Error("Method not implemented.");
  }

  async deleteAppointment(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

