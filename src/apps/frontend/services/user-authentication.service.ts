import type { CreateUserParams, LoginParams, LoginResponse, User } from "../types";
import APIService from "./api.service";
import CommonService from "./common.service";

const AUTH_TOKEN_STORAGE_KEY = "authToken";
const USER_ROLE_STORAGE_KEY = "userRole";

export class UserAuthenticationService extends APIService {
  private static readonly instance = new UserAuthenticationService();

  public static createUser = async (params: CreateUserParams): Promise<User> => {
    try {
      const response = await this.instance.apiClient.post<{ success: boolean; message: string; data: User }>("/auth/signup", params);
      const user = response.data?.data;
      const authToken = user?.authToken;
      if (authToken) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken);
        const userId = user?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
      }
      if (user?.role) {
        localStorage.setItem(USER_ROLE_STORAGE_KEY, user.role);
      }
      return user as User;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static loginUser = async (params: LoginParams): Promise<LoginResponse> => {
    try {
      const response = await this.instance.apiClient.post<{ success: boolean; message: string; data: LoginResponse }>("/auth/login", params);
      const loginData = response.data?.data;
      const authToken = loginData?.authToken;
      if (authToken) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken);
        const userId = loginData?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }

        const currentUser = await this.getUserById();
        if (currentUser?.role) {
          localStorage.setItem(USER_ROLE_STORAGE_KEY, currentUser.role);
          return {
            ...loginData,
            role: currentUser.role,
          } as LoginResponse;
        }
      }
      return loginData as LoginResponse;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static getUserById = async (): Promise<User> => {
    try{
      const response = await this.instance.apiClient.get<{ success: boolean; message: string; data: User }>("/auth/current-user");
      return response.data?.data as User;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static deleteUserByAdmin = async (userId: string): Promise<string> => {
    try {
      const response = await this.instance.apiClient.delete(`/auth/users/${userId}`);
      return response.data?.message || "User deleted successfully";
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static getAllUsers = async (): Promise<User[]> => {
    try {
      const response = await this.instance.apiClient.get("/auth/users");
      return response.data?.data as User[];
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }
}