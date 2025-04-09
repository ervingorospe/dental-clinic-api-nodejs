import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string({ message: "Password is required" }),
});
