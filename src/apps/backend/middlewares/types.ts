import type { UserRole } from "../modules/users/types";

export type AuthenticatedUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type AuthTokenPayload = {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
};


export type AuthenticatedRequest = Request & {
  user?: AuthenticatedUser;
}