import { Prisma, PrismaClient } from "@prisma/client";
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { IAppointment } from "../interface/IAppointment";

const prisma = new PrismaClient();

export class AppointmentRepository implements IAppointmentRepository {
  getAppointments(): Promise<IAppointment[]> {
    throw new Error("Method not implemented.");
  }
  getAppointment(id: number): Promise<IAppointment | null> {
    throw new Error("Method not implemented.");
  }
  addAppointment(appointment: IAppointment): Promise<IAppointment> {
    throw new Error("Method not implemented.");
  }
  updateAppointment(id: number, appointment: Partial<IAppointment>): Promise<IAppointment | null> {
    throw new Error("Method not implemented.");
  }
  deleteAppointment(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
  
}
