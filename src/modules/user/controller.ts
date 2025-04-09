import { Request, Response } from "express";
import { UserService } from "@modules/user/service";
import { catchAsync } from "@utils/catch-async";
import { registerUserSchema } from "@modules/user/validation"
import { IUser } from "./interface";

export class UserController {
  static test =  catchAsync(async (req: Request, res: Response) => {
    const message = UserService.test();
    res.status(200).json({ message });
  });

  static register = catchAsync(async (req: Request, res: Response) => {
    const data: IUser = registerUserSchema.parse(req.body);

    const message = await UserService.register(data);
    res.status(201).json({ message });
  });
}
