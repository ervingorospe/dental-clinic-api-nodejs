import { Request, Response } from "express";
import { catchAsync } from "@utils/catch-async";
import { AuthService } from "@modules/auth/service";

export class AuthController {
  static login = catchAsync(async (req: Request, res: Response) => {
    const { accessToken } = await AuthService.login(req, res);
    res.status(200).json({ accessToken });
  })
}