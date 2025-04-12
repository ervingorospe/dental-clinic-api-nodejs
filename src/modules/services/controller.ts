import { Request, Response } from "express";
import { DentalService } from "@modules/services/service";
import { catchAsync } from "@utils/catch-async";
interface AppointmentQueryParams {
  limit?: string | null;
}
export class ServiceController {
  static getServices = catchAsync(async (req: Request, res: Response) => {
    const { limit = null } : AppointmentQueryParams = req.query ;

    const services = await DentalService.getServices(limit);
    res.status(200).json({ services });
  });

  static getCategories = catchAsync(async (req: Request, res: Response) => {
    const { limit = null } : AppointmentQueryParams = req.query ;

    const categories = await DentalService.getCategories(limit);
    res.status(200).json({ categories });
  });
}
