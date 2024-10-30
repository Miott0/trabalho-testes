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
      console.error("Erro ao criar agendamento:", err); // Log detalhado do erro
        throw new Error(`Error creating appointment: ${err.message}`); // Relança com detalhes
    }
  }

  async updateAppointment(id: number, appointment: Partial<IAppointment>): Promise<IAppointment | null> {
    try {
      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: {
          ...appointment, // Isso vai pegar apenas os campos que vieram preenchidos
        },
      });
      return updatedAppointment;
    } catch (err: any) {
      if (err.code === 'P2025') { // Código de erro do Prisma para "record not found"
        return null;
      }
      throw new Error(`Error updating appointment with ID ${id}`);
    }
  }

  async deleteAppointment(id: number): Promise<boolean> {
    try {
      await prisma.appointment.delete({
        where: { id },
      });
      return true;
    } catch (err: any) {
      if (err.code === 'P2025') { // Prisma error code for record not found
        return false; // Retorna false se o agendamento não foi encontrado
      }
      throw new Error(`Error deleting appointment with ID ${id}`);
    }
  }
  
}

