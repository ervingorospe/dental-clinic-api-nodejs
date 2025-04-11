import { Users } from "@modules/user/repository"
import { IUser, IUserUpdate, IUpdatePassword } from "@modules/user/interface"
import bcrypt from "bcryptjs";
import UserDTO from "@modules/user/dto/user"
import { tokenGenerator } from '@utils/jwt'
import { AppError } from "@utils/app-error";
import { comparePassword, hashPassword } from '@utils/bycrpt'

export class UserService {
  static users = async (role? : string, limit? : string) => {
    const users = await Users.findMany({
      where: { 
        role
      },
      take: parseInt(limit?.toString() || "10", 10),
      include: {
        userDetails: true,
      }
    });

    return users?.map((user : any) => new UserDTO(user));
  }

  static register = async (data: IUser) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    await Users.create({
      data: {
        email: data.email,
        password: hashedPassword,
        active: data.active,
        role: data.role,
        userDetails: {
          create: data.userDetails
        }
      }
    });

    return "User created"
  }

  static update = async (data: IUserUpdate, id: number, res: any) => {
    const user = await Users.update({
      where: { id },
      data: {
        ...(data.userDetails && {
          userDetails: {
            update: data.userDetails
          }
        })
      },
      include: {
        userDetails: true,
      }
    });

    const userDTO = new UserDTO(user);
    const plainUser = userDTO.toPlainObject();

    tokenGenerator(plainUser, res);
    return "User updated"
  }

  static updatePassword = async (data: IUpdatePassword, id: number) => {
    const user = await Users.findFirst({
      where: { id }
    })

    if (user) {
      const isPasswordValid  = await comparePassword(data.currentPassword, user.password)

      if (!isPasswordValid) {
        throw new AppError("Incorrect Current Password", 400);
      }

      await Users.update({
        where: { id },
        data: {
          password: await hashPassword(data.password)
        }
      });

      return "Password updated"
    }
  }
}