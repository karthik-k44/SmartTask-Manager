import type { CreateUserParams, LoginParams, LoginResponse, User } from "../types";
import APIService from "./api.service";
import CommonService from "./common.service";


export class UserAuthenticationService extends APIService {
  private static readonly instance = new UserAuthenticationService();

  public static createUser = async (params: CreateUserParams): Promise<User> => {
    try {
      const response = await this.instance.apiClient.post<User>("/auth/signup", params);
      const authToken = response.data?.authToken;
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        const userId = response.data?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
      }
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static loginUser = async (params: LoginParams): Promise<LoginResponse> => {
    try {
      const response = await this.instance.apiClient.post<LoginResponse>("/auth/login", params);
      const authToken = response.data?.authToken;
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        const userId = response.data?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
      }
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static getUserById = async (): Promise<User> => {
    try{
      const response = await this.instance.apiClient.get("/auth/current-user");
      return response.data;
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
      const response = await this.instance.apiClient.get<User[]>("/auth/users");
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }
}