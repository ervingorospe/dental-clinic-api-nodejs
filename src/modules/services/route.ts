import { Router } from "express";
import { ServiceController } from "@modules/services/controller";

const router = Router();

// Route definitions
router.get("/", ServiceController.getServices);

export default router;