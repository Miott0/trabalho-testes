import { PrismaClient } from "@prisma/client";
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { IAppointment } from "../interface/IAppointment";

const prisma = new PrismaClient();

export class AppointmentRepository implements IAppointmentRepository {
  async addAppointment(appointment: IAppointment): Promise<IAppointment> {
    const newAppointment = await prisma.appointment.create({
      data: appointment,
    });
    return newAppointment;
  }

  async getAppointments(): Promise<IAppointment[]> {
    return prisma.appointment.findMany();
  }

  async getAppointment(id: number): Promise<IAppointment | null> {
    return prisma.appointment.findUnique({
      where: { id },
    });
  }

  async updateAppointment(id: number, appointmentData: Partial<IAppointment>): Promise<IAppointment | null> {
    try {
      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: appointmentData,
      });
      return updatedAppointment;
    } catch (error) {
      return null;
    }
  }

  async deleteAppointment(id: number): Promise<boolean> {
    try {
      await prisma.appointment.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
