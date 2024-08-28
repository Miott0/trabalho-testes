export interface IAppointment {
  id: number;
  title: string | null;
  startDate: Date;
  endDate: Date;
  userId: number;
  propertyId: number;
}
