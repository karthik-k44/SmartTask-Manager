import express from "express";  
import { UserAuthenticationController } from "./user-authentication-controller";
import { AuthMiddleware } from "../../../middlewares/auth-middleware";
import { PermissionMiddleware } from "../../../middlewares/permission-middleware";
import { UserRole } from "../types";

const router = express.Router();

router.post("/signup", UserAuthenticationController.createUser);
router.post("/login", UserAuthenticationController.loginUser);
router.get("/current-user", AuthMiddleware, UserAuthenticationController.getCurrentUser);
router.get("/users", AuthMiddleware, PermissionMiddleware(UserRole.ADMIN), UserAuthenticationController.getAllUsers);
router.delete("/users/:id", AuthMiddleware, PermissionMiddleware(UserRole.ADMIN), UserAuthenticationController.deleteUserById);
router.patch("/user-status/:id", AuthMiddleware, PermissionMiddleware(UserRole.ADMIN), UserAuthenticationController.updateUserStatus);

export default router;