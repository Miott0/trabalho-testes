import { Request, Response } from "express";
import { IAppointmentService } from "../interface/IAppointmentService";

export class AppointmentController {
  constructor(private appointmentService: IAppointmentService) {}

  // Criação de um novo agendamento
  async createAppointment(req: Request, res: Response): Promise<Response> {
    try {
      const appointmentData = req.body;
      const newAppointment = await this.appointmentService.create(
        appointmentData
      );
      return res.status(201).json(newAppointment);
    } catch (error) {
      return res.status(500).json({ error: "Error creating appointment" });
    }
  }

  // Listagem de todos os agendamentos
  async getAppointments(req: Request, res: Response): Promise<Response> {
    try {
      const appointments = await this.appointmentService.getAll();
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching appointments" });
    }
  }

  // Busca de um agendamento por ID
  async getAppointmentById(req: Request, res: Response): Promise<Response> {
    try {
      const appointmentId = Number(req.params.id);
      const appointment = await this.appointmentService.getById(appointmentId);
      if (appointment) {
        return res.status(200).json(appointment);
      } else {
        return res.status(404).json({ error: "Appointment not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching appointment" });
    }
  }

  // Atualização de um agendamento
  async updateAppointment(req: Request, res: Response): Promise<Response> {
    try {
      const appointmentId = Number(req.params.id);
      const appointmentData = req.body;
      const updatedAppointment = await this.appointmentService.update(
        appointmentId,
        appointmentData
      );
      if (updatedAppointment) {
        return res.status(200).json(updatedAppointment);
      } else {
        return res.status(404).json({ error: "Appointment not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error updating appointment" });
    }
  }

  // Exclusão de um agendamento
  async deleteAppointment(req: Request, res: Response): Promise<Response> {
    try {
      const appointmentId = Number(req.params.id);
      const deleted = await this.appointmentService.delete(appointmentId);
      if (deleted) {
        return res
          .status(200)
          .json({ message: "Appointment deleted successfully" });
      } else {
        return res.status(404).json({ error: "Appointment not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error deleting appointment" });
    }
  }
}
