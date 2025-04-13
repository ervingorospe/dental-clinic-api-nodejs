import express from "express";
import userRoutes from "@modules/user/route";
import authRoutes from "@modules/auth/routes";
import appointmentRoutes from "@modules/appointment/route";
import servicesRoutes from "@modules/services/route";
import { errorHandler } from "@middlewares/error-handler";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ENV } from "@config/env";

const corsOptions = {
  origin: 'https://dental-clinic-app.myprofilely.com',
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", servicesRoutes);
app.use(errorHandler)

export default app;
