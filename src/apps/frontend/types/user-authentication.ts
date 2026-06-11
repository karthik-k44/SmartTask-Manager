export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin"
}

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  authToken?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  authToken: string;
  _id: string;
};
