import { AppointmentStatus } from '@prisma/client';

export interface IAppointment {
  id?: number;
  date: Date;
  startTime: string;
  endTime: string;
  status?: AppointmentStatus;
  reason?: string;
  notes?: string;
  canceledAt?: Date;
  patientId: number;
  doctorId: number;
  serviceId: number;
}