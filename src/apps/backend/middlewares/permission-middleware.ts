import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../modules/users/types";
import type { AuthenticatedRequest } from "./types";

export const permissionMiddleware = (...allowedRoles: Array<UserRole>) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const request = req as unknown as AuthenticatedRequest;

  if (!request.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!allowedRoles.includes(request.user.role)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to access this resource",
    });
  }

  return next();
};
