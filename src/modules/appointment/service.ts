import { Appointments } from "@modules/appointment/repository"
import { IAppointment } from "@modules/appointment/interface"
import { AppError } from "@utils/app-error";
import AppointmentDTO from "@modules/appointment/dto/appointment"

enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED"
}

export class AppointmentService {
  static create = async (data: IAppointment) => {
    const upcomingAppointments = await AppointmentService.getUpcomingAppointmentsByPatientId(data.patientId);
    const doctorAppointment = await AppointmentService.getDoctorAppointmentByDateStartTimeAndEndTime(data.doctorId, data.date, data.startTime, data.endTime);

    if (upcomingAppointments.length > 0) {
      throw new AppError("You already have an upcoming appointment. Please reschedule or cancel the existing one before booking a new appointment.", 409);
    }

    if (doctorAppointment) {
      throw new AppError("The selected doctor is unavailable at the chosen date and time. Please choose a different time or doctor.", 409);
    }
    
    const newAppointment = await Appointments.create({
      data,
      include: {
        service: {
          include: {
            category: true
          }
        },
        patient: {
          include: {
            userDetails: true
          }
        },
        doctor: {
          include: {
            userDetails: true
          }
        },
      }
    });

    return new AppointmentDTO(newAppointment)
  }

  static getUpcomingAppointmentsByPatientId = async (patientId: number) => {
    return await Appointments.findMany({
      where: {
        patientId,
        status: AppointmentStatus.CONFIRMED,
        date: {
          gt: new Date()
        }
      },
      orderBy: {
        date: "asc"
      }
    })
  }

  static getDoctorAppointmentByDateStartTimeAndEndTime = async (doctorId: number, date: Date, startTime: string, endTime: string) => {
    return await Appointments.findFirst({
      where: {
        doctorId,
        date,
        status: AppointmentStatus.CONFIRMED,
        OR: [
          {
            startTime: { lt: endTime },
            endTime: { gt: startTime }
          }
        ]
      }
    })
  }
}