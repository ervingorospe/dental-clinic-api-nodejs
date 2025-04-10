import { Router } from "express";
import { AuthController } from "@modules/auth/controller";
import { authenticate } from "@middlewares/auth-middleware";

const router = Router();

// Route definitions
router.post("/login", AuthController.login);
router.post("/logout", authenticate, AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);
router.get("/authenticate", authenticate, AuthController.authenticate);

export default router;