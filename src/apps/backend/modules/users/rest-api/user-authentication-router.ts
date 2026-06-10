import express from "express";  
import { UserAuthenticationController } from "./user-authentication-controller";

const router = express.Router();

router.post("/signup", UserAuthenticationController.createUser);
router.post("/login", UserAuthenticationController.loginUser);
router.get("/current-user", UserAuthenticationController.getCurrentUser);

export default router;