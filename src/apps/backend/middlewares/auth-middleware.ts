import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedRequest, AuthTokenPayload } from './types';
import jwt from 'jsonwebtoken';
import UserAuthenticationReader from '../modules/users/internal/user-authentication-reader';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required",
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const jwtSecret = process.env.JWT_SECRET;
  
  if (!jwtSecret) {
    return res.status(500).json({
      success: false,
      message: "JWT_SECRET is not configured",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;
    const user = await UserAuthenticationReader.getUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found for the provided token",
      });
    }

    (req as unknown as AuthenticatedRequest).user = {
      _id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
}