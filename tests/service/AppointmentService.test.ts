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
  
    
  
    const newAppointment = await appointmentService.create(appointment);
    expect(newAppointment).toEqual(appointment);
  })
  
});
