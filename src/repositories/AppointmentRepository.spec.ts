import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { AppointmentRepository} from "./AppointmentRepository";

describe("AppointmentRepository", () => {
    let appointmentRepository: IAppointmentRepository;
    beforeEach(() => { 
        appointmentRepository = new AppointmentRepository();
    })

    it('espera criar um novo appointment', async () => {
        const appointment = { title: 'Reunião de equipe', startDate: new Date(), endDate: new Date(), idUser: 1, idProperty: 1 };

        const newAppointment = await appointmentRepository.addAppointment(appointment);

        expect(newAppointment).toHaveProperty('id');
        expect(newAppointment.title).toBe('Reunião de equipe');
        expect(newAppointment.startDate).toBe(appointment.startDate);
        expect(newAppointment.endDate).toBe(appointment.endDate);
        expect(newAppointment.idUser).toBe(1);
        expect(newAppointment.idProperty).toBe(1);
    })

    it('espera nao criar um novo appointment sem titulo', async () => {
        const appointment = { startDate: new Date(), endDate: new Date(), idUser: 1, idProperty: 1 };
    
        try {
            await appointmentRepository.addAppointment(appointment);
        } catch (error: any) {
            expect(error.message).toBe('Title, idUser, and idProperty are required');
        }
    })
})