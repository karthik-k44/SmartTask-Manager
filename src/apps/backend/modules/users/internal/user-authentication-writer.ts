import type { CreateUserParams, UserStatus } from "../types";
import { UserAuthenticationModel } from "./user-authentication-schema";

export default class UserAuthenticationWriter {
  public static createUser = async (params: CreateUserParams) => {
    try {
      const user = await UserAuthenticationModel.create(params);
      return user;
    }
    catch (error) {
      console.log("Error while creating user", error);
      throw error;
    }
  }

  public static deleteUser = async (userId: string) => {
    try {
      await UserAuthenticationModel.findByIdAndDelete(userId);
    }
    catch (error) {
      console.log("Error while deleting user", error);
      throw error;
    }
  }

  public static updateUserStatus = async (userId: string, status: UserStatus) => {
    try {
      await UserAuthenticationModel.findByIdAndUpdate(userId, { userStatus: status });
    }
    catch (error) {
      console.log("Error while updating user status", error);
      throw error;
    }
  }

}