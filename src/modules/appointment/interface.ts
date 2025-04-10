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

export interface ICancelAppointment {
  reason?: string;
  userId: number;
}

export interface ICompleteAppointment {
  notes?: string;
  userId: number;
}