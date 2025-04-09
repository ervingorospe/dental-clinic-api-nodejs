import { Users } from "@modules/user/repository"
import { IUser } from "@modules/user/interface"
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
}