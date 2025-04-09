import { Request, Response } from "express";
import { catchAsync } from "@utils/catch-async";
import { AuthService } from "@modules/auth/service";
import { loginUserSchema } from "@modules/auth/validation"
import { IUserLogin } from "@modules/auth/interface";

export class AuthController {
  static login = catchAsync(async (req: Request, res: Response) => {
    const data : IUserLogin = loginUserSchema.parse(req.body);

    const { accessToken } = await AuthService.login(data, res);
    res.status(200).json({ accessToken });
  })
}