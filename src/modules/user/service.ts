import { Users } from "@modules/user/repository"
import { IUser, IUserUpdate, IUpdatePassword } from "@modules/user/interface"
import bcrypt from "bcryptjs";

export class UserService {
  static test() {
    return "Welcome Ervin";
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

  static update = async (data: IUserUpdate, id: number) => {
    await Users.update({
      where: { id },
      data: {
        email: data.email,
        ...(data.userDetails && {
          userDetails: {
            update: data.userDetails
          }
        })
      }
    });

    return "User updated"
  }

  static updatePassword = async (data: IUpdatePassword, id: number) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await Users.update({
      where: { id },
      data: {
        password: hashedPassword
      }
    });

    return "Password updated"
  }
}