import { IAppointment } from "../../src/interface/IAppointment";
import { IAppointmentRepository } from "../../src/interface/IAppointmentRepository";
import { IProperty } from "../../src/interface/IProperty";
import { IPropertyService } from "../../src/interface/IPropertyService";
import { IUser } from "../../src/interface/IUser";
import { IUserService } from "../../src/interface/IUserService";
import { AppointmentService } from "../../src/service/AppointmentService";

describe("AppointmentService", () => {
  let appointmentService: AppointmentService;
  let mockAppointmentRepository: jest.Mocked<IAppointmentRepository>;
  let mockUserService: jest.Mocked<IUserService>;
  let mockPropertyService: jest.Mocked<IPropertyService>;

  const user: IUser = {
    id: 1,
    name: "User Test",
    email: "user@email.com"
  };

  const property: IProperty = {
    id: 1,
    area: 100,
    address: "Rua Teste, 123",
  };

  beforeEach(() => {
    mockAppointmentRepository = {
      addAppointment: jest.fn(),
      getAppointment: jest.fn(),
      getAppointments: jest.fn(),
      updateAppointment: jest.fn(),
      deleteAppointment: jest.fn(),
    };

    mockUserService = {
      getUserById: jest.fn(),
      createUser: jest.fn(),
      getAllUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };

    mockPropertyService = {
      getProperty: jest.fn(),
      createProperty: jest.fn(),
      getProperties: jest.fn(),
      deleteProperty: jest.fn(),
      updateProperty: jest.fn(),
    };

    appointmentService = new AppointmentService(
      mockAppointmentRepository,
      mockUserService,
      mockPropertyService
    );
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

    mockAppointmentRepository.getAppointment.mockResolvedValue(null); // Não existe agendamento com esse ID
    mockUserService.getUserById.mockResolvedValue(user);
    mockPropertyService.getProperty.mockResolvedValue(property);
    mockAppointmentRepository.addAppointment.mockResolvedValue(appointment);

    const newAppointment = await appointmentService.create(appointment);

    expect(newAppointment).toEqual(appointment);
    expect(mockAppointmentRepository.addAppointment).toHaveBeenCalledWith(appointment);
  });

  it("deve lançar erro se o appointment já existir", async () => {
    const appointment: IAppointment = {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: "Visita"
    };

    mockAppointmentRepository.getAppointment.mockResolvedValue(appointment);

    await expect(appointmentService.create(appointment)).rejects.toThrow(
      `Appointment with ID ${appointment.id} already exists`
    );
  });

  it("deve lançar erro se o usuário ou a propriedade não existirem", async () => {
    const appointment: IAppointment = {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: "Visita"
    };

    mockAppointmentRepository.getAppointment.mockResolvedValue(null);
    mockUserService.getUserById.mockResolvedValue(null); // Usuário não encontrado
    mockPropertyService.getProperty.mockResolvedValue(property);

    await expect(appointmentService.create(appointment)).rejects.toThrow(
      "User or Property does not exist"
    );
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

  it("deve retornar null se o appointment não existir", async () => {
    mockAppointmentRepository.getAppointment.mockResolvedValue(null);

    const result = await appointmentService.getById(1);

    expect(result).toBeNull();
    expect(mockAppointmentRepository.getAppointment).toHaveBeenCalledWith(1);
  })

  it("deve atualizar um appointment", async () => {
    const updatedAppointment: IAppointment = {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: "Visita Atualizada"
    };

    mockAppointmentRepository.getAppointment.mockResolvedValue(updatedAppointment);
    mockAppointmentRepository.updateAppointment.mockResolvedValue(updatedAppointment);

    const result = await appointmentService.update(1, updatedAppointment);

    expect(result).toEqual(updatedAppointment);
    expect(mockAppointmentRepository.updateAppointment).toHaveBeenCalledWith(1, updatedAppointment);
  });

  it("deve lançar erro ao atualizar appointment inexistente", async () => {
    const updatedAppointment: IAppointment = {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: "Visita Atualizada"
    };

    mockAppointmentRepository.getAppointment.mockResolvedValue(null);

    await expect(appointmentService.update(1, updatedAppointment)).rejects.toThrow(
      `Appointment with ID 1 does not exist`
    );
  });

  it("deve deletar um appointment", async () => {
    mockAppointmentRepository.getAppointment.mockResolvedValue({
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id,
      idProperty: property.id,
      title: "Visita"
    });
    mockAppointmentRepository.deleteAppointment.mockResolvedValue(true);

    const result = await appointmentService.delete(1);

    expect(result).toBe(true);
    expect(mockAppointmentRepository.deleteAppointment).toHaveBeenCalledWith(1);
  });

  it("deve lançar erro ao deletar appointment inexistente", async () => {
    mockAppointmentRepository.getAppointment.mockResolvedValue(null);

    await expect(appointmentService.delete(1)).rejects.toThrow(
      `Appointment with ID 1 does not exist`
    );
  });
});
