import { UserAuthenticationModel } from "./user-authentication-schema";

export default class UserAuthenticationReader {
  public static getUserByEmail = async (email: string) => {
    try {
      const user = await UserAuthenticationModel.findOne({ email });
      return user;
    }
    catch (error) {
      console.log("Error while fetching user by email", error);
      throw error;
    }
  }

  public static getUserById = async (userId: string) => {
    try {
      const user = await UserAuthenticationModel.findById(userId);
      return user;
    }
    catch (error) {
      console.log("Error while fetching user by ID", error);
      throw error;
    }
  }

  public static getAllUsers = async () => {
    try {
      const users = await UserAuthenticationModel.find();
      return users;
    }
    catch (error) {
      console.log("Error while fetching all users", error);
      throw error;
    }
  }
}