import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET as string
};
