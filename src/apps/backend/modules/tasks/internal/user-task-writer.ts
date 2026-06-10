import type { CreateUserTaskParams, UpdateUserTaskParams } from "../types";
import UserTaskModel from "./user-task-schema";

export class UserTaskWriter {
  public static createUserTask = async (params: CreateUserTaskParams) => {
    try{
      const task = await UserTaskModel.create(params);
      return task;
    } catch (error) {
      console.log("Error creating task:", error);
      throw new Error("Failed to create user task in writer ");
    }
  }
  
  public static deleteUserTask = async (taskId: string) => {
    try {
      await UserTaskModel.findByIdAndDelete(taskId);
    } catch (error) {
      console.log("Error deleting task:", error);
      throw new Error("Failed to delete user task in writer");
    }
  }
  
  public static updateUserTask = async (taskId: string, updateData: UpdateUserTaskParams) => {
    try {
      const updatedTask = await UserTaskModel.findByIdAndUpdate(taskId, updateData, { new: true });
      return updatedTask;
    } catch (error) {
      console.log("Error updating task:", error);
      throw new Error("Failed to update user task in writer");
    }
  }
}