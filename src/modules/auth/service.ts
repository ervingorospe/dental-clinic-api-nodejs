import { refreshToken } from './../../utils/jwt';
import { Response } from "express";
import { tokenGenerator } from '@utils/jwt'
import { IUserLogin } from "@modules/auth/interface"
import { Users } from "@modules/user/repository"
import { AppError } from "@utils/app-error";
import { comparePassword } from '@utils/bycrpt'
import UserDTO from "@modules/user/dto/user"
import { removeRefreshToken, removeAccessToken }  from "@utils/jwt"

export class AuthService {
  static login = async (data: IUserLogin, res: Response) => {
    const { email, password } = data;

    const user = await Users.findUnique({
      where: { email },
      include: {
        userDetails: true,
      }
    });

    if (!user) {
      throw new AppError("Email does not exist", 404);
    }

    if (!user.active) {
      throw new AppError("Account is not active", 403);
    }

    const isPasswordValid  = await comparePassword(password, user.password)

    if (!isPasswordValid ) {
      throw new AppError("Invalid credentials", 401);
    }
    
    const userDTO = new UserDTO(user);
    const plainUser = userDTO.toPlainObject();

    return tokenGenerator(plainUser, res);
  }

  static logout = (res: Response) => {
    removeAccessToken(res);
    removeRefreshToken(res);
    return "Logged out successfully";
  }

  static refreshToken = (token: string, res: Response) => {
    return refreshToken(token, res);
  }
}