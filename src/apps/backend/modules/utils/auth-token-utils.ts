import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserRole, type User } from '../users/types';

dotenv.config();

export const generateAuthToken = (user: User): string => {
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
  if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role || UserRole.USER
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '6d' });
};

export default generateAuthToken;