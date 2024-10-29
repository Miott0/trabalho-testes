import { Request, Response } from 'express';
import { IAppointmentService } from '../interface/IAppointmentService';

export class AppointmentController {
    constructor(private appointmentService: IAppointmentService) {}

    /**
     * @swagger
     * /appointments:
     *   post:
     *     summary: Cria um novo agendamento
     *     tags: [Appointments]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               propertyId:
     *                 type: integer
     *                 description: ID da propriedade.
     *               userId:
     *                 type: integer
     *                 description: ID do usuário.
     *               date:
     *                 type: string
     *                 format: date
     *                 description: Data do agendamento.
     *     responses:
     *       201:
     *         description: Agendamento criado com sucesso.
     *       500:
     *         description: Erro ao criar o agendamento.
     */
    async createAppointment(req: Request, res: Response): Promise<Response> {
        try {
            const appointmentData = req.body;
            const newAppointment = await this.appointmentService.create(appointmentData);
            return res.status(201).json(newAppointment);
        } catch (error) {
            return res.status(500).json({ error: 'Error creating appointment' });
        }
    }

    /**
     * @swagger
     * /appointments:
     *   get:
     *     summary: Lista todos os agendamentos
     *     tags: [Appointments]
     *     responses:
     *       200:
     *         description: Lista de agendamentos.
     *       500:
     *         description: Erro ao buscar agendamentos.
     */
    async getAppointments(req: Request, res: Response): Promise<Response> {
        try {
            const appointments = await this.appointmentService.getAll();
            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching appointments' });
        }
    }

    /**
     * @swagger
     * /appointments/{id}:
     *   get:
     *     summary: Busca um agendamento pelo ID
     *     tags: [Appointments]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do agendamento.
     *     responses:
     *       200:
     *         description: Dados do agendamento.
     *       404:
     *         description: Agendamento não encontrado.
     *       500:
     *         description: Erro ao buscar o agendamento.
     */
    async getAppointmentById(req: Request, res: Response): Promise<Response> {
        try {
            const appointmentId = Number(req.params.id);
            const appointment = await this.appointmentService.getById(appointmentId);
            if (appointment) {
                return res.status(200).json(appointment);
            } else {
                return res.status(404).json({ error: 'Appointment not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching appointment' });
        }
    }

    /**
     * @swagger
     * /appointments/{id}:
     *   put:
     *     summary: Atualiza um agendamento
     *     tags: [Appointments]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do agendamento.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               propertyId:
     *                 type: integer
     *               userId:
     *                 type: integer
     *               date:
     *                 type: string
     *                 format: date
     *     responses:
     *       200:
     *         description: Agendamento atualizado com sucesso.
     *       404:
     *         description: Agendamento não encontrado.
     *       500:
     *         description: Erro ao atualizar o agendamento.
     */
    async updateAppointment(req: Request, res: Response): Promise<Response> {
        try {
            const appointmentId = Number(req.params.id);
            const appointmentData = req.body;
            const updatedAppointment = await this.appointmentService.update(appointmentId, appointmentData);
            if (updatedAppointment) {
                return res.status(200).json(updatedAppointment);
            } else {
                return res.status(404).json({ error: 'Appointment not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error updating appointment' });
        }
    }

    /**
     * @swagger
     * /appointments/{id}:
     *   delete:
     *     summary: Exclui um agendamento
     *     tags: [Appointments]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do agendamento.
     *     responses:
     *       200:
     *         description: Agendamento excluído com sucesso.
     *       404:
     *         description: Agendamento não encontrado.
     *       500:
     *         description: Erro ao excluir o agendamento.
     */
    async deleteAppointment(req: Request, res: Response): Promise<Response> {
        try {
            const appointmentId = Number(req.params.id);
            const deleted = await this.appointmentService.delete(appointmentId);
            if (deleted) {
                return res.status(200).json({ message: 'Appointment deleted successfully' });
            } else {
                return res.status(404).json({ error: 'Appointment not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting appointment' });
        }
    }
}