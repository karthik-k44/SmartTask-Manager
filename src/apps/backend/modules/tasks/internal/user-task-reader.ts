import UserTaskModel from "./user-task-schema";

export class UserTaskReader {
  public static getUserTasks = async (userId: string) => {
    try {
      const tasks = await UserTaskModel.find({ userId });
      return tasks;
    } catch (error) {
      console.log("Error fetching user tasks:", error);
      throw new Error("Failed to fetch user tasks");
    }
  };

  public static getAllUserTasks = async () => {
    try {
      const tasks = await UserTaskModel.find();
      return tasks; 
    }
    catch (error) {
       console.log("Error fetching user tasks:", error);
      throw new Error("Failed to fetch user tasks");
    }
  }
}