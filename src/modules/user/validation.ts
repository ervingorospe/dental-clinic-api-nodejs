import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string(),
  active: z.boolean().default(true),
  role: z.string().default("patient"),
  userDetails: z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    birthDate: z.string().transform((val) => new Date(val)),
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"]
})

export const updateUserSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  userDetails: z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    birthDate: z.string().transform((val) => new Date(val)),
  }),
})

export const updatePasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"]
})

