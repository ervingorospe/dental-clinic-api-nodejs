import { Router } from "express";
import { AppointmentController } from "@modules/appointment/controller";
import { authenticate, validatePatientOwnership } from "@middlewares/auth-middleware";

const router = Router();

// Route definitions
router.post("/create", authenticate, validatePatientOwnership, AppointmentController.create);

export default router;