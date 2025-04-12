export default class AppointmentDTO {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  reason: string;
  notes: string;
  canceledAt: string;
  service: {
    name: string;
    description: string;
    price: number;
    category: string;
  }
  patient: {
    id?: string;
    firstName: string;
    lastName: string;
    role: string;
  }
  doctor: {
    id?: string;
    firstName: string;
    lastName: string;
    role: string;
  }

  constructor(appointment: any) {
    this.id = appointment.id;
    this.date = appointment.date.toISOString();
    this.startTime = appointment.startTime;
    this.endTime = appointment.endTime;
    this.status = appointment.status;
    this.reason = appointment.reason || '';
    this.notes = appointment.notes || '';
    this.canceledAt = appointment.canceledAt ? appointment.canceledAt.toISOString() : '';
    this.service = {
      name: appointment.service.name,
      description: appointment.service.description,
      price: appointment.service.price,
      category: appointment.service.category.name
    };
    this.patient = {
      id: appointment.patient.id,
      firstName: appointment.patient.userDetails.firstName,
      lastName: appointment.patient.userDetails.lastName,
      role: appointment.patient.role
    };
    this.doctor = {
      id: appointment.doctor.id,
      firstName: appointment.doctor.userDetails.firstName,
      lastName: appointment.doctor.userDetails.lastName,
      role: appointment.doctor.role
    };
  }
}
