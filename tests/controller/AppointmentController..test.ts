import { Request, Response } from 'express';
import { AppointmentController } from '../../src/controller/AppointmentController';
import { IAppointmentService } from '../../src/interface/IAppointmentService';
import { IAppointment } from '../../src/interface/IAppointment';

// Mock do AppointmentService
const mockAppointmentService: jest.Mocked<IAppointmentService> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('AppointmentController', () => {
    let appointmentController: AppointmentController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        appointmentController = new AppointmentController(mockAppointmentService);
        req = {
            params: {},
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('createAppointment', () => {
        it('deve criar um novo agendamento com sucesso', async () => {
            const mockAppointment: IAppointment = {
                id: 1,
                startDate: new Date(),
                endDate: new Date(),
                idUser: 1,
                idProperty: 1,
                title: 'Agendamento Teste',
            };

            req.body = mockAppointment;
            mockAppointmentService.create.mockResolvedValue(mockAppointment);

            await appointmentController.createAppointment(req as Request, res as Response);

            expect(mockAppointmentService.create).toHaveBeenCalledWith(mockAppointment);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockAppointment);
        });

        it('deve retornar erro ao falhar na criação do agendamento', async () => {
            req.body = {};
            mockAppointmentService.create.mockRejectedValue(new Error('Error creating appointment'));

            await appointmentController.createAppointment(req as Request, res as Response);

            expect(mockAppointmentService.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error creating appointment' });
        });
    });

    describe('getAppointments', () => {
        it('deve retornar todos os agendamentos', async () => {
            const mockAppointments: IAppointment[] = [
                { id: 1, startDate: new Date(), endDate: new Date(), idUser: 1, idProperty: 1, title: 'Agendamento 1' },
                { id: 2, startDate: new Date(), endDate: new Date(), idUser: 2, idProperty: 2, title: 'Agendamento 2' },
            ];

            mockAppointmentService.getAll.mockResolvedValue(mockAppointments);

            await appointmentController.getAppointments(req as Request, res as Response);

            expect(mockAppointmentService.getAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAppointments);
        });

        it('deve retornar erro ao falhar ao buscar agendamentos', async () => {
            mockAppointmentService.getAll.mockRejectedValue(new Error('Error fetching appointments'));

            await appointmentController.getAppointments(req as Request, res as Response);

            expect(mockAppointmentService.getAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching appointments' });
        });
    });

    describe('getAppointmentById', () => {
        it('deve retornar o agendamento pelo ID', async () => {
            const mockAppointment: IAppointment = {
                id: 1,
                startDate: new Date(),
                endDate: new Date(),
                idUser: 1,
                idProperty: 1,
                title: 'Agendamento Teste',
            };

            req.params = { id: '1' };
            mockAppointmentService.getById.mockResolvedValue(mockAppointment);

            await appointmentController.getAppointmentById(req as Request, res as Response);

            expect(mockAppointmentService.getById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAppointment);
        });

        it('deve retornar 404 se o agendamento não for encontrado', async () => {
            req.params = { id: '1' };
            mockAppointmentService.getById.mockResolvedValue(null);

            await appointmentController.getAppointmentById(req as Request, res as Response);

            expect(mockAppointmentService.getById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Appointment not found' });
        });

        it('deve retornar erro ao falhar ao buscar agendamento por ID', async () => {
            req.params = { id: '1' };
            mockAppointmentService.getById.mockRejectedValue(new Error('Error fetching appointment'));

            await appointmentController.getAppointmentById(req as Request, res as Response);

            expect(mockAppointmentService.getById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching appointment' });
        });
    });

    describe('updateAppointment', () => {
        it('deve atualizar um agendamento com sucesso', async () => {
            const updatedAppointment = {
                id: 1,
                startDate: new Date(),
                endDate: new Date(),
                idUser: 1,
                idProperty: 1,
                title: 'Agendamento Atualizado',
            };
    
            req.params = { id: '1' };
            req.body = updatedAppointment;
            mockAppointmentService.update.mockResolvedValue(updatedAppointment);
    
            await appointmentController.updateAppointment(req as Request, res as Response);
    
            expect(mockAppointmentService.update).toHaveBeenCalledWith(1, updatedAppointment);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedAppointment);
        });
    
        it('deve retornar 404 se o agendamento a ser atualizado não for encontrado', async () => {
            req.params = { id: '1' };
            req.body = {};
            mockAppointmentService.update.mockResolvedValue(null);
    
            await appointmentController.updateAppointment(req as Request, res as Response);
    
            expect(mockAppointmentService.update).toHaveBeenCalledWith(1, {});
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Appointment not found' });
        });
    
        it('deve retornar erro ao falhar na atualização do agendamento', async () => {
            req.params = { id: '1' };
            req.body = {};
            mockAppointmentService.update.mockRejectedValue(new Error('Error updating appointment'));
    
            await appointmentController.updateAppointment(req as Request, res as Response);
    
            expect(mockAppointmentService.update).toHaveBeenCalledWith(1, {});
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error updating appointment' });
        });
    });
    
    describe('deleteAppointment', () => {
        it('deve deletar um agendamento com sucesso', async () => {
            req.params = { id: '1' };
            mockAppointmentService.delete.mockResolvedValue(true);
    
            await appointmentController.deleteAppointment(req as Request, res as Response);
    
            expect(mockAppointmentService.delete).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Appointment deleted successfully' });
        });
    
        it('deve retornar 404 se o agendamento a ser deletado não for encontrado', async () => {
            req.params = { id: '1' };
            mockAppointmentService.delete.mockResolvedValue(false);
    
            await appointmentController.deleteAppointment(req as Request, res as Response);
    
            expect(mockAppointmentService.delete).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Appointment not found' });
        });
    
        it('deve retornar erro ao falhar ao deletar o agendamento', async () => {
            req.params = { id: '1' };
            mockAppointmentService.delete.mockRejectedValue(new Error('Error deleting appointment'));
    
            await appointmentController.deleteAppointment(req as Request, res as Response);
    
            expect(mockAppointmentService.delete).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting appointment' });
        });
    });
    
});
