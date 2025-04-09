import express from "express";
import userRoutes from "@modules/user/route";
import authRoutes from "@modules/auth/routes";
import { errorHandler } from "@middlewares/error-handler";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ENV } from "@config/env";

const corsOptions = {
  origin: ENV.CLIENT_PORT, // Replace with your client's origin
  credentials: true,            // Enable Access-Control-Allow-Credentials header if needed
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler)

export default app;
