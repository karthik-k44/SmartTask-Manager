import type { AuthenticatedRequest } from "../../../middlewares/types";
import { UserStatus, type CreateUserParams, type LoginParams } from "../types";
import { UserAuthenticationServices } from "../user-authentication-services";
import type { Request, Response } from "express";

export class UserAuthenticationController {
  public static createUser = async (req: Request, res:Response) => { 
    try {
      const params: CreateUserParams = req.body;
      if (!params.name || !params.email || !params.password) {
        res.status(400).json({ error: "Missing required fields: name, email, password" });
        return;
      }
      const user = await UserAuthenticationServices.createUser(params);
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }
    catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user",
        error: error,
      });
    }
  } 

  public static loginUser = async (req: Request, res: Response) => {
    try {
      const params: LoginParams = req.body;
      if (!params.email || !params.password) {
        res.status(400).json({ error: "Missing required fields: email, password" });
        return;
      }
      const loginResponse = await UserAuthenticationServices.loginUser(params);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: loginResponse,
      });
    }
    catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to login",
        error: error,
      });
    }
  }

  public static getCurrentUser = async (req: Request, res: Response) => {
    try {
      const request = req as unknown as AuthenticatedRequest;

      if (!request.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await UserAuthenticationServices.getCurrentUser(request.user._id);

      return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };

  public static deleteUserById = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.id).replace(/^:/, '');
      const result = await UserAuthenticationServices.deleteUserById(userId);
      return res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  }

  public static getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await UserAuthenticationServices.getAllUsers();
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) { 
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  }

  public static updateUserStatus = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.id).replace(/^:/, '');
      const statusInput = req.body.status;
      const allowedStatuses = Object.values(UserStatus);
      
      if (typeof statusInput !== "string" || !allowedStatuses.includes(statusInput as UserStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value",
        });
      }
      
      const status = statusInput as UserStatus;
      const result = await UserAuthenticationServices.updateUserStatus(userId, status);
      return res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };

  public static HealthCheck = async (_req: Request, res: Response) => {
    try {
      return res.status(200).json({
        success: true,
        message: "ok",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };
}