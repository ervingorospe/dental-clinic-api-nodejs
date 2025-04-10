import { Request, Response } from "express";
import { catchAsync } from "@utils/catch-async";
import { AuthService } from "@modules/auth/service";
import { loginUserSchema } from "@modules/auth/validation"
import { IUserLogin } from "@modules/auth/interface";
import UserDTO from '@modules/user/dto/user';

interface AuthRequest extends Request {
  user?: UserDTO;
}
export class AuthController {
  static login = catchAsync(async (req: Request, res: Response) => {
    const data : IUserLogin = loginUserSchema.parse(req.body);

    const message = await AuthService.login(data, res);
    res.status(200).json({ message });
  })

  static logout = catchAsync(async (req: Request, res: Response) => {
    const message = AuthService.logout(res)
    res.status(200).json({ message });
  })

  static refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    const message  = AuthService.refreshToken(token, res)

    res.status(200).json(message);
  })

  static authenticate = catchAsync(async (req: AuthRequest, res: Response) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  })
}