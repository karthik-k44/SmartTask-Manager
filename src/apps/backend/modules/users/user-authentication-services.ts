import generateAuthToken from "../utils/auth-token-utils";
import UserAuthenticationReader from "./internal/user-authentication-reader";
import UserAuthenticationWriter from "./internal/user-authentication-writer";
import { UserRole, type CreateUserParams, type LoginParams, type LoginResponse, type User } from "./types";
import bcrypt from 'bcrypt';

export class UserAuthenticationServices {
  public static createUser = async (params: CreateUserParams): Promise<User> => {
    const userExists = await UserAuthenticationReader.getUserByEmail(params.email);
    if (userExists) {
      throw new Error("User with this email already exists");
    }
    const createdUser = await UserAuthenticationWriter.createUser(params);

    const user: User = {
      _id: String(createdUser._id),
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    };

    const token = generateAuthToken(user);
     return {
      _id: String(user._id),
      name: String(user.name),
      email: String(user.email),
      role: user.role || UserRole.USER,
      authToken: token,
    };
  }

  public static loginUser = async (params: LoginParams): Promise<LoginResponse> => {
    const user = await UserAuthenticationReader.getUserByEmail(params.email);
    if (!user) {
      throw new Error("User with this email does not exist");
    }
    
    const isPasswordMatch = await bcrypt.compare(params.password, user.password);

    if(!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    const userForToken: User = {
      _id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    };

    const token = generateAuthToken(userForToken);
    return {
      _id: String(user._id),
      authToken: token,
    }
  }

  public static getCurrentUser = async (userId: string): Promise<User> => {
    const user = await UserAuthenticationReader.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      _id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    };
  }

  public static deleteUserById = async (userId: string): Promise<string> => {
    const user = await UserAuthenticationReader.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await UserAuthenticationWriter.deleteUser(userId);
    return "User deleted successfully";
  }

  public static getAllUsers = async (): Promise<User[]> => {
    const users = await UserAuthenticationReader.getAllUsers();
    return users.map(user => ({
      _id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    }));
  }
}