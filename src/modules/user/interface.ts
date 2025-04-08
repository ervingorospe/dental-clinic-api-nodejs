export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export  interface IUserDTO {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  role: string;
}