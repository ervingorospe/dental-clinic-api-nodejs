import { Response } from "express";
import bcrypt from "bcryptjs";
import { tokenGenerator } from '@utils/jwt'
import { IUserLogin } from "@modules/auth/interface"
import { Users } from "@modules/user/repository"
import { AppError } from "@utils/app-error";
import UserDTO from "@modules/user/dto/user"

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

    const isPasswordValid  = await this.comparePassword(password, user.password)

    if (!isPasswordValid ) {
      throw new AppError("Invalid credentials", 401);
    }
    
    const userDTO = new UserDTO(user);
    const plainUser = userDTO.toPlainObject();

    return tokenGenerator(plainUser, res);
  }

  private static comparePassword = async (password: string, userPassword: string) => {
    return await bcrypt.compare(password, userPassword);
  }
}