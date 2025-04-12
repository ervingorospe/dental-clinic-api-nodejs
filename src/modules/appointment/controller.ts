import { Request, Response } from "express";
import { AppointmentService } from "@modules/appointment/service";
import { catchAsync } from "@utils/catch-async";
import { createAppointmentSchema, cancelAppointmentSchema, completeAppointmentSchema } from "@modules/appointment/validation"
import { IAppointment, ICancelAppointment, ICompleteAppointment } from "@modules/appointment/interface";
import UserDTO from '@modules/user/dto/user'

interface AppointmentQueryParams {
  status?: string;
  startDate?: string;
  limit?: string | null;
}
interface AuthRequest extends Request {
  user?: UserDTO;
}
export class AppointmentController {
  static create = catchAsync(async (req: Request, res: Response) => {
    const data: IAppointment = createAppointmentSchema.parse(req.body);

    const appointment = await AppointmentService.create(data);
    res.status(201).json({ appointment });
  });

  static cancel = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const data: ICancelAppointment = cancelAppointmentSchema.parse(req.body);

    const appointment = await AppointmentService.cancel(data, appointmentId);
    res.status(200).json({ appointment });
  });

  static update = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const data: IAppointment = createAppointmentSchema.parse(req.body);

    const appointment = await AppointmentService.update(data, appointmentId);
    res.status(200).json({ appointment });
  });

  static complete = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const data: ICompleteAppointment = completeAppointmentSchema.parse(req.body);

    const appointment = await AppointmentService.complete(data, appointmentId);
    res.status(200).json({ appointment });
  });

  
  static getAppointments = catchAsync(async (req: AuthRequest, res: Response) => {
    const patientId = parseInt(req.params.id, 10);
    const { status, startDate, limit = null } : AppointmentQueryParams = req.query ;
    const user = req.user
    const appointments = await AppointmentService.getAppointmentsByPatientIds(patientId, status, startDate, limit, user?.role );
    res.status(200).json({ appointments });
  });

  static getAppointmentById = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = parseInt(req.params.id, 10);
    
    const appointment = await AppointmentService.getAppointmentById(appointmentId);
    res.status(200).json({ appointment });
  });


  static getDoctorAppointments = catchAsync(async (req: Request, res: Response) => {
    const doctorId = parseInt(req.params.id, 10);
    const { status, startDate, limit = null } : AppointmentQueryParams = req.query ;

    const appointments = await AppointmentService.getAppointmentsByDoctorId(doctorId, status, startDate, limit);
    res.status(200).json({ appointments });
  });
}
