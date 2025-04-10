import { Request, Response } from "express";
import { AppointmentService } from "@modules/appointment/service";
import { catchAsync } from "@utils/catch-async";
import { createAppointmentSchema } from "@modules/appointment/validation"
import { IAppointment } from "@modules/appointment/interface";

export class AppointmentController {
  static create = catchAsync(async (req: Request, res: Response) => {
    const data: IAppointment = createAppointmentSchema.parse(req.body);

    const appointment = await AppointmentService.create(data);
    res.status(201).json({ appointment });
  });
}
