import { Request, Response } from "express";
import { UserService } from "@modules/user/service";
import { catchAsync } from "@utils/catch-async";
import { registerUserSchema, updateUserSchema, updatePasswordSchema } from "@modules/user/validation"
import { IUser, IUserUpdate, IUpdatePassword } from "@modules/user/interface";

interface IUserQuery {
  role?: string;
  limit?: string;
}
export class UserController {
  static users =  catchAsync(async (req: Request, res: Response) => {
    const { role, limit } : IUserQuery = req.query
    const users = await UserService.users(role, limit);

    res.status(200).json({ users });
  });

  static register = catchAsync(async (req: Request, res: Response) => {
    const data: IUser = registerUserSchema.parse(req.body);

    const message = await UserService.register(data);
    res.status(201).json({ message });
  });

  static update = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const data: IUserUpdate = updateUserSchema.parse(req.body);

    const message = await UserService.update(data, id, res);
    res.status(200).json({ message });
  });

  static updatePassword = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const data: IUpdatePassword = updatePasswordSchema.parse(req.body);

    const message = await UserService.updatePassword(data, id);
    res.status(200).json({ message });
  });
}
