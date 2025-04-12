import { Router } from "express";
import { AppointmentController } from "@modules/appointment/controller";
import { authenticate, authorizeAppointmentUpdate, validateAppointmentAction, validateDoctorRole, checkOwnership } from "@middlewares/auth-middleware";

const router = Router();

// Route definitions
router.get("/:id", authenticate, AppointmentController.getAppointmentById);
router.get("/list/:id", authenticate, checkOwnership, AppointmentController.getAppointments);
router.get("/doctor/:id", authenticate, AppointmentController.getDoctorAppointments);
router.post("/create", authenticate, authorizeAppointmentUpdate, AppointmentController.create);
router.put("/cancel/:appointmentId", authenticate, validateAppointmentAction, AppointmentController.cancel);
router.put("/update/:appointmentId", authenticate, authorizeAppointmentUpdate, AppointmentController.update);
router.put("/complete/:appointmentId", authenticate, validateAppointmentAction, validateDoctorRole, AppointmentController.complete);

export default router;