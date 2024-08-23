export interface IAppointment {
  id?: number;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  idUser?: number;
  idProperty?: number;
}
