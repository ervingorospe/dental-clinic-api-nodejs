import { Router } from "express";
import { AuthController } from "@modules/auth/controller";

const router = Router();

// Route definitions
router.post("/login", AuthController.login);

export default router;