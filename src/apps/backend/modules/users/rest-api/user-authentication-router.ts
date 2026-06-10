import express from "express";  
import { UserAuthenticationController } from "./user-authentication-controller";
import { authMiddleware } from "../../../middlewares/auth-middleware";

const router = express.Router();

router.post("/signup", UserAuthenticationController.createUser);
router.post("/login", UserAuthenticationController.loginUser);
router.get("/current-user", authMiddleware, UserAuthenticationController.getCurrentUser);

export default router;