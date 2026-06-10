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
}