import type { CreateUserParams } from "../types";
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
}