import { IAppointment } from "src/interface/IAppointment";
import { AppointmentRepository } from "../../src/repositories/AppointmentRepository";
import { prismaMock } from "../../src/singleton";
import { IProperty } from "../../src/interface/IProperty";
import { IUser } from "../../src/interface/IUser";

describe("AppointmentRepository", () => {
  const user: IUser = {
    id: 1,
    name: "Teste",
    email: "teste@email.com",
  };

  const property: IProperty = {
    id: 1,
    area: 100,
    address: "Rua teste",
  };

  const appointment: IAppointment = {
    id: 1,
    endDate: new Date(),
    idProperty: property.id,
    idUser: user.id,
    startDate: new Date(),
  };

  let appointmentRepository: AppointmentRepository;
  beforeEach(() => {
    appointmentRepository = new AppointmentRepository();
  });

  it("espera criar um appointment com sucesso", async () => {
    const appointmentData: IAppointment = {
      id: 1, // Add a valid ID here
      startDate: new Date(),
      endDate: new Date(),
      idUser: user.id, // Use IDs that exist in your test setup
      idProperty: property.id, // Use IDs that exist in your test setup
      title: "Teste",
    };

    prismaMock.appointment.create.mockResolvedValue(appointmentData as any);
    const newAppointment = await appointmentRepository.addAppointment(
      appointmentData
    );

    expect(newAppointment).toEqual(appointmentData);
    expect(prismaMock.appointment.create).toHaveBeenCalledWith({
      data: {
        startDate: appointmentData.startDate,
        endDate: appointmentData.endDate,
        idUser: appointmentData.idUser,
        idProperty: appointmentData.idProperty,
        title: appointmentData.title,
      },
    });
  });

  it("espera lançar um erro quando a criação de um appointment falha", async () => {
    const errorMessage = "Error creating appointment";
    prismaMock.appointment.create.mockRejectedValue(new Error(errorMessage));

    await expect(
      appointmentRepository.addAppointment({
        id: 1,
        startDate: new Date(),
        endDate: new Date(),
        idUser: user.id,
        idProperty: property.id,
        title: "Teste",
      })
    ).rejects.toThrow(`${errorMessage}`);
  });

  it("retornar um appointment por ID", async () => {
    
    prismaMock.appointment.findUnique.mockResolvedValue(appointment as any);

    const foundAppointment = await appointmentRepository.getAppointment(appointment.id)

    expect(foundAppointment).toEqual(appointment)
  });

  it("retornar null quando o ID do appointment não existe", async () => {
    //prismaMock.appointment.findUnique.mockResolvedValue(null);

    const foundAppointment = await appointmentRepository.getAppointment(999)

    expect(foundAppointment).toBeNull()
    expect(prismaMock.appointment.findUnique).toHaveBeenCalledWith({
        where: { id: 999 }
    })
  })

  it('espera lançar um erro quando o getAppoitmet falha', async () => {
    const errorMessage = 'Error getting appointment'
    prismaMock.appointment.findUnique.mockRejectedValue(new Error(errorMessage))

    await expect(appointmentRepository.getAppointment(1))
      .rejects
      .toThrow(`${errorMessage}`)
  })

  it('espera retonar uma lista de appointments', async () => {
    let appointment2: IAppointment = {
        id: 2,
        startDate: new Date(),
        endDate: new Date(),
        idUser: user.id,
        idProperty: property.id,
        title: 'Teste 2'
    }

    const appointments = [appointment, appointment2]
    prismaMock.appointment.findMany.mockResolvedValue(appointments as any)

    const foundAppointments = await appointmentRepository.getAppointments()

    expect(foundAppointments).toEqual(appointments)
  })

  it('espera retornar uma lista vazia', async () => {
    prismaMock.appointment.findMany.mockResolvedValue([])

    const foundAppointments = await appointmentRepository.getAppointments()

    expect(foundAppointments).toEqual([])
  })

  it('espera retornar um erro quando a busca por appointments falha', async () => {
    const errorMessage = 'Error getting appointments'
    prismaMock.appointment.findMany.mockRejectedValue(new Error(errorMessage))

    await expect(appointmentRepository.getAppointments())
      .rejects
      .toThrow(`${errorMessage}`)
  })
    
  
});
