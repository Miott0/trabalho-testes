import { AppointmentService } from "./AppointmentService";
import { IAppointment } from "../interface/IAppointment";

describe("AppointmentService", () => {
  let appointmentService: AppointmentService;

  beforeEach(() => {
    appointmentService = new AppointmentService();
  });

  it('Espera criar o usuario corretamente', async () => {
    const appointmentData: IAppointment = {
      id: undefined,
      startDate: new Date(),
      endDate: new Date(),
      title: "Reunião de equipe",
    }

    const newAppointment = await appointmentService.create(appointmentData)
    
    expect(newAppointment).toBeDefined();
    expect(newAppointment.id).toBe(1);
    expect(newAppointment.title).toBe("Reunião de equipe");
    
  });

  it('Espera retornar appointment pelo Id', async () => {
    const appointmentData: IAppointment = {
      id: undefined,
      startDate: new Date(),
      endDate: new Date(),
      title: "Reunião de equipe",
    }

    const newAppointment = await appointmentService.create(appointmentData)
    const foundAppointment = await appointmentService.getById(newAppointment.id as number)
  
    expect(foundAppointment).toBeDefined();
    expect(foundAppointment?.id).toBe(newAppointment.id);
    expect(foundAppointment?.title).toBe(newAppointment.title);
  })

  it('Epera retornar null quando o id não existe', async () => {
    const foundAppointment = await appointmentService.getById(999)
    expect(foundAppointment).toBeNull();
  })

  it('Epera retornar todos os appointments', async () => {
    const appointmentData: IAppointment = {
      id: undefined,
      startDate: new Date(),
      endDate: new Date(),
      title: "Reunião de equipe",
    }

    await appointmentService.create(appointmentData)
    await appointmentService.create(appointmentData)
    await appointmentService.create(appointmentData)

    const appointments = await appointmentService.getAll();
    expect(appointments).toHaveLength(3);
  })

  it('Espera o retorno de uma lista vazia', async () => {   
    const appointments = await appointmentService.getAll();
    expect(appointments).toHaveLength(0);
  })

  it('Espera atualizar um appointment', async () => {
    const appointmentData: IAppointment = {
      id: undefined,
      startDate: new Date(),
      endDate: new Date(),
      title: "Reunião de equipe",
    }

    const newAppointment = await appointmentService.create(appointmentData)
    const updatedAppointment = await appointmentService.update(newAppointment.id as number, { title: "Reunião de equipe 2" })
    
    expect(updatedAppointment).toBeDefined();
    expect(updatedAppointment?.id).toBe(newAppointment.id);
    expect(updatedAppointment?.title).toBe("Reunião de equipe 2");
  })

  it('Espera não atualizar um appointment inexistente', async () => {
    const updatedAppointment = await appointmentService.update(999, { title: "Reunião de equipe 2" })
    expect(updatedAppointment).toBeNull();
  })

  it('Espera deletar um appointment', async () => {
    const appointmentData: IAppointment = {
      id: undefined,
      startDate: new Date(),
      endDate: new Date(),
      title: "Reunião de equipe",
    }

    const newAppointment = await appointmentService.create(appointmentData)
    const deleted = await appointmentService.delete(newAppointment.id as number)
    
    expect(deleted).toBeTruthy();
  })

  it('Espera nao deletar um appointment inexistente', async () => {   
    const deleted = await appointmentService.delete(999)
    expect(deleted).toBeFalsy();
  })
});
