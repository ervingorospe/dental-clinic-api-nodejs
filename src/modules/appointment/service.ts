import { Appointments } from "@modules/appointment/repository"
import { IAppointment, ICancelAppointment, ICompleteAppointment } from "@modules/appointment/interface"
import { AppError } from "@utils/app-error";
import AppointmentDTO from "@modules/appointment/dto/appointment"

enum AppointmentStatus {
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED"
}

export class AppointmentService {
  static create = async (data: IAppointment) => {
    const upcomingAppointments = await AppointmentService.getUpcomingAppointmentsByPatientId(data.patientId, data.date, data.startTime, data.endTime);
    const doctorAppointment = await AppointmentService.getDoctorAppointmentByDateStartTimeAndEndTime(data.doctorId, data.date, data.startTime, data.endTime);

    if (upcomingAppointments) {
      throw new AppError("You have an appointment at this date and time.", 409);
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

  static cancel = async (data: ICancelAppointment, appointmentId: number) => {
    const appointment = await AppointmentService.getAppointmentById(appointmentId);

    if (appointment?.status === AppointmentStatus.COMPLETED || appointment?.status === AppointmentStatus.CANCELLED) {
      throw new AppError("Cannot cancel an appointment that has already been completed or cancelled.", 400);
    }

    const updateAppointment = await Appointments.update({
      where: {
        id: appointmentId
      },
      data: {
        reason: data.reason ?? null,
        status: AppointmentStatus.CANCELLED,
      },
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

    return new AppointmentDTO(updateAppointment)
  }

  static update = async (data: IAppointment, appointmentId: number) => {
    const appointment = await AppointmentService.getAppointmentById(appointmentId);
    const doctorAppointment = await AppointmentService.getDoctorAppointmentByDateStartTimeAndEndTime(data.doctorId, data.date, data.startTime, data.endTime);

    if (appointment?.status !== AppointmentStatus.CONFIRMED) {
      throw new AppError("Cannot update an appointment that has already been completed or cancelled", 400);
    }

    if (doctorAppointment && doctorAppointment.id !== appointmentId) {
      throw new AppError("The selected doctor is unavailable at the chosen date and time. Please choose a different time or doctor.", 409);
    }
    
    const updateAppointment = await Appointments.update({
      where: {
        id: appointmentId
      },
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

    return new AppointmentDTO(updateAppointment)
  }

  static complete = async (data: ICompleteAppointment, appointmentId: number) => {
    const appointment = await AppointmentService.getAppointmentById(appointmentId);

    if (appointment?.status === AppointmentStatus.COMPLETED || appointment?.status === AppointmentStatus.CANCELLED) {
      throw new AppError("Cannot complete an appointment that has already been completed or cancelled.", 400);
    }

    const updateAppointment = await Appointments.update({
      where: {
        id: appointmentId
      },
      data: {
        notes: data.notes ?? null,
        status: AppointmentStatus.COMPLETED,
      },
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

    return new AppointmentDTO(updateAppointment)
  }

  static getAppointmentsByPatientIds = async (patientId: number, status?: string, startDate?: string, limit?: string | null, role?: string) => {
    const where: any = {
      status: status as AppointmentStatus,
      date: {
        gte: startDate ? new Date(startDate as string) : undefined,
      },
    };

    if (role === 'patient') {
      where.patientId = patientId;
    } else if (role === 'doctor') {
      where.doctorId = patientId;
    }

    const appointments =  await Appointments.findMany({
      where,
      take: limit != null ? parseInt(limit.toString(), 10) : undefined,
      include: {
        service: {
          include: {
            category: true
          }
        },
        doctor: {
          include: {
            userDetails: true
          }
        },
        patient: {
          include: {
            userDetails: true
          }
        }
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ]
    })

    return appointments.map((data) => new AppointmentDTO(data));
  }

  static getAppointmentsByDoctorId = async (doctorId: number, status?: string, startDate?: string, limit?: string | null) => {
    const appointments =  await Appointments.findMany({
      where: {
        doctorId,
        status: status as AppointmentStatus,
        date: {
          gte: startDate ? new Date(startDate as string) : undefined,
        }
      },
      take: limit != null ? parseInt(limit.toString(), 10) : undefined,
      include: {
        service: {
          include: {
            category: true
          }
        },
        doctor: {
          include: {
            userDetails: true
          }
        },
        patient: {
          include: {
            userDetails: true
          }
        }
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ]
    })

    return appointments.map((data) => new AppointmentDTO(data));
  }

  static getAppointmentById = async (appointmentId: number) => {
    const appointment = await Appointments.findFirst({
      where: {
        id: appointmentId
      },
      include: {
        service: {
          include: {
            category: true
          }
        },
        doctor: {
          include: {
            userDetails: true
          }
        },
        patient: {
          include: {
            userDetails: true
          }
        }
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ]
    })

    return new AppointmentDTO(appointment)
  }

  static getUpcomingAppointmentsByPatientId = async (patientId: number, date: Date, startTime: string, endTime: string) => {
    return await Appointments.findFirst({
      where: {
        patientId,
        status: AppointmentStatus.CONFIRMED,
        date,
        OR: [
          {
            startTime: { lt: endTime },
            endTime: { gt: startTime }
          }
        ]
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ]
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