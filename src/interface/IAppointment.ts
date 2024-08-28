export interface IAppointment {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  userId: number;
  propertyId: number;
}
