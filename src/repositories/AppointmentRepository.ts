import { Prisma, PrismaClient } from "@prisma/client";
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { IAppointment } from "../interface/IAppointment";

const prisma = new PrismaClient();

export class AppointmentRepository implements IAppointmentRepository {
  
  // Método para obter todos os agendamentos
  async getAppointments(): Promise<IAppointment[]> {
    try {
      const appointments = await prisma.appointment.findMany();
      return appointments.map(appointment => ({
        ...appointment,
        title: appointment.title ?? undefined,
        startDate: new Date(appointment.startDate),
        endDate: appointment.endDate ? new Date(appointment.endDate) : undefined,
        idUser: appointment.userId,
        idProperty: appointment.propertyId,
      }));
    } catch (error: any) {
      throw new Error(`Erro ao buscar agendamentos: ${error.message}`);
    }
  }

  // Método para obter um agendamento por ID
  async getAppointment(id: number): Promise<IAppointment | null> {
    try {
      const appointment = await prisma.appointment.findUnique({
        where: { id },
      });

      if (!appointment) {
        return null;
      }

      return {
        ...appointment,
        title: appointment.title ?? undefined,
        startDate: new Date(appointment.startDate),
        endDate: appointment.endDate ? new Date(appointment.endDate) : undefined,
        idUser: appointment.userId,
        idProperty: appointment.propertyId,
      };
    } catch (error: any) {
      throw new Error(`Erro ao buscar agendamento com ID ${id}: ${error.message}`);
    }
  }

  // Método para adicionar um novo agendamento
  async addAppointment(appointment: IAppointment): Promise<IAppointment> {
    try {
      if (!appointment.startDate || !appointment.idUser || !appointment.idProperty) {
        throw new Error("Os campos startDate, idUser e idProperty são obrigatórios.");
      }

      const data: any = {
        title: appointment.title ?? null,
        startDate: appointment.startDate,
        userId: appointment.idUser,
        propertyId: appointment.idProperty,
      };

      if (appointment.endDate) {
        data.endDate = appointment.endDate instanceof Date ? appointment.endDate.toISOString() : appointment.endDate;
      }

      const newAppointment = await prisma.appointment.create({
        data,
      });

      return {
        ...newAppointment,
        title: newAppointment.title ?? undefined,
        startDate: new Date(newAppointment.startDate),
        endDate: newAppointment.endDate ? new Date(newAppointment.endDate) : undefined,
        idUser: newAppointment.userId,
        idProperty: newAppointment.propertyId,
      };
    } catch (error: any) {
      throw new Error(`Erro ao adicionar agendamento: ${error.message}`);
    }
}

  // Método para atualizar um agendamento existente
  async updateAppointment(id: number, appointmentData: Partial<IAppointment>): Promise<IAppointment | null> {
    try {
      const existingAppointment = await prisma.appointment.findUnique({
        where: { id },
      });

      if (!existingAppointment) {
        throw new Error(`Agendamento com ID ${id} não encontrado.`);
      }

      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: {
          title: appointmentData.title ?? existingAppointment.title,
          startDate: appointmentData.startDate ?? existingAppointment.startDate,
          endDate: appointmentData.endDate ?? existingAppointment.endDate,
          userId: appointmentData.idUser ?? existingAppointment.userId,
          propertyId: appointmentData.idProperty ?? existingAppointment.propertyId,
        },
      });

      return {
        ...updatedAppointment,
        title: updatedAppointment.title ?? undefined,
        startDate: new Date(updatedAppointment.startDate),
        endDate: updatedAppointment.endDate ? new Date(updatedAppointment.endDate) : undefined,
        idUser: updatedAppointment.userId,
        idProperty: updatedAppointment.propertyId,
      };
    } catch (error: any) {
      throw new Error(`Erro ao atualizar agendamento com ID ${id}: ${error.message}`);
    }
  }

  // Método para deletar um agendamento
  async deleteAppointment(id: number): Promise<boolean> {
    try {
      await prisma.appointment.delete({
        where: { id },
      });
      return true;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        // P2025: Registro não encontrado
        return false;
      }
      throw new Error(`Erro ao deletar agendamento com ID ${id}: ${error.message}`);
    }
  }
}
