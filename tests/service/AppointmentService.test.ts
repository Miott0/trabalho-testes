import { AppointmentService } from "../../src/service/AppointmentService";
import { IAppointment } from "../../src/interface/IAppointment";
import { IAppointmentRepository } from "../../src/interface/IAppointmentRepository";
import { IUser } from "src/interface/IUser";
import { IProperty } from "src/interface/IProperty";


describe("AppointmentService", () => {
  let appointmentService: AppointmentService;
  let mockAppointmentRepository: jest.Mocked<IAppointmentRepository>;

  const user: IUser = {
    id: 1,
    name: "User Test",
    email: "user@email.com"
  }
  
  const property: IProperty = {
    id: 1,
    area: 100,
    address: "Rua Teste, 123",
  }
  
  beforeEach(() => {
    mockAppointmentRepository = {
      addAppointment: jest.fn(),
      getAppointment: jest.fn(),
      getAppointments: jest.fn(),
      updateAppointment: jest.fn(),
      deleteAppointment: jest.fn(),
    };
  
    appointmentService = new AppointmentService(mockAppointmentRepository);
  });
  
  
  it("espera criar appointment", async () => {
    const appointment: IAppointment = {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: `Agendamento de visita casa:${property.address}`
    };
  
    // Faz o mock retornar o appointment que estamos criando
    mockAppointmentRepository.addAppointment.mockResolvedValue(appointment);
  
    const newAppointment = await appointmentService.create(appointment);
  
    expect(newAppointment).toEqual(appointment);
    expect(mockAppointmentRepository.addAppointment).toHaveBeenCalledWith(appointment);
  });

  it("deve retornar todos os appointments", async () => {
    const appointments: IAppointment[] = [
      {
        id: 1,
        startDate: new Date(),
        endDate: new Date(),
        idUser: user.id,
        idProperty: property.id,
        title: "Visita 1"
      },
      {
        id: 2,
        startDate: new Date(),
        endDate: new Date(),
        idUser: user.id,
        idProperty: property.id,
        title: "Visita 2"
      }
    ];
  
    mockAppointmentRepository.getAppointments.mockResolvedValue(appointments);
  
    const result = await appointmentService.getAll();
  
    expect(result).toEqual(appointments);
    expect(mockAppointmentRepository.getAppointments).toHaveBeenCalledTimes(1);
  });
  
  it("deve retornar um appointment pelo ID", async () => {
    const appointment: IAppointment = {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: "Visita"
    };
  
    mockAppointmentRepository.getAppointment.mockResolvedValue(appointment);
  
    const result = await appointmentService.getById(1);
  
    expect(result).toEqual(appointment);
    expect(mockAppointmentRepository.getAppointment).toHaveBeenCalledWith(1);
  });
  
  it("deve atualizar um appointment", async () => {
    const updatedAppointment: IAppointment = {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: "Visita Atualizada"
    };
  
    mockAppointmentRepository.updateAppointment.mockResolvedValue(updatedAppointment);
  
    const result = await appointmentService.update(1, updatedAppointment);
  
    expect(result).toEqual(updatedAppointment);
    expect(mockAppointmentRepository.updateAppointment).toHaveBeenCalledWith(1, updatedAppointment);
  });
  

  it("deve deletar um appointment", async () => {
    mockAppointmentRepository.deleteAppointment.mockResolvedValue(true);
  
    const result = await appointmentService.delete(1);
  
    expect(result).toBe(true);
    expect(mockAppointmentRepository.deleteAppointment).toHaveBeenCalledWith(1);
  });
});
