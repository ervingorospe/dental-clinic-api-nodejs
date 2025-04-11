import { Users } from "@prisma/client"; 

export default class UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  phoneNumber: string;
  birthDate: Date;
  role: string;

  constructor(user: Users) {
    this.id = user.id;
    this.firstName = (user as any).userDetails?.firstName || "";
    this.lastName = (user as any).userDetails?.lastName || "";
    this.phoneNumber = (user as any).userDetails?.phoneNumber || "";
    this.birthDate = (user as any).userDetails?.birthDate || "";
    this.email = user.email;
    this.active = user.active;
    this.role = user.role;
  }

  toPlainObject(): Record<string, string | boolean | number | Date> {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      birthDate: this.birthDate,
      email: this.email,
      active: this.active,
      role: this.role,
    };
  }
}
