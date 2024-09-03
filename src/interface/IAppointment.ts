export interface IAppointment {
  id: number;
  title?: string;
  startDate: Date;
  endDate: Date;
  idUser: number;
  idProperty: number;

  createdAt?: Date;
  updatedAt?: Date;
}