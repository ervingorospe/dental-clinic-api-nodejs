import bcrypt from "bcryptjs";

export const comparePassword = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
}

export const hashPassword = async (password : string) => {
  return await bcrypt.hash(password, 10)
}