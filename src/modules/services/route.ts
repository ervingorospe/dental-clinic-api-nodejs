import { Router } from "express";
import { ServiceController } from "@modules/services/controller";

const router = Router();

// Route definitions
router.get("/", ServiceController.getServices);
router.get("/categories", ServiceController.getCategories);

export default router;