export interface IUserDetails {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
}

export interface IUser {
  id?: number;
  email: string;
  password: string;
  confirmPassword: string;
  active?: boolean;
  role: string;
  userDetails: IUserDetails;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserUpdate {
  email: string,
  userDetails: IUserDetails
}


export interface IUpdatePassword {
  password: string;
  confirmPassword: string;
}
