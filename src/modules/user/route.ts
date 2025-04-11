import { Router } from "express";
import { UserController } from "@modules/user/controller";
import { authenticate, checkOwnership } from "@middlewares/auth-middleware";

const router = Router();

// Route definitions
router.post("/register", UserController.register);
router.get("/", authenticate, UserController.users);
router.put("/update/:id", authenticate, checkOwnership, UserController.update);
router.put("/update/password/:id", authenticate, checkOwnership, UserController.updatePassword);

export default router;