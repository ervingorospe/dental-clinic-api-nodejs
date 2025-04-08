import express from "express";
import userRoutes from "@modules/user/route";
import authRoutes from "@modules/auth/routes";
import { errorHandler } from "@middlewares/error-handler";

const app = express();

app.use(express.json()); // Middleware for JSON parsing
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler)
// app.use(errorHandler); // Global error handler

export default app; // Export the configured Express app
