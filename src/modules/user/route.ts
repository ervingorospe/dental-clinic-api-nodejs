import { Router } from "express";
import { UserController } from "@modules/user/controller";
import { authenticate } from "@middlewares/auth-middleware";

const router = Router();

// Route definitions
router.get("/test", authenticate, UserController.test);

export default router;
