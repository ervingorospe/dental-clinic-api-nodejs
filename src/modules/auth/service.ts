import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { tokenGenerator } from '@utils/jwt'
import { IUserDTO } from '@modules/user/interface'

export class AuthService {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // const isMatch = await this.comparePassword(password, "testing");
    if (email !== 'ervingorospe123@gmail.com' || password !== 'testing') {
      throw new Error("Invalid credentials");
    }

    const user: IUserDTO = {
      _id: '1',
      firstName: 'Ervin',
      lastName: 'Gorospe',
      email: 'ervingorospe123@gmail.com',
      active: true,
      role: 'patient'
    }

    return tokenGenerator(user, res);
  }

  private static comparePassword = async (password: string, savedPassword: string) => {
    return await bcrypt.compare(password, savedPassword);
  }
}