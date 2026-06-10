import { UserTaskWriter } from "./internal/user-task-writer";
import { UserTaskReader } from "./internal/user-task-reader";
import type { CreateUserTaskParams, UpdateUserTaskParams, UserTaskResponse } from "./types";

export class UserTaskServices {
  public static createUserTask = async (params: CreateUserTaskParams): Promise<UserTaskResponse> => {
    try {
      const task = await UserTaskWriter.createUserTask(params);
      return {
        userId: task.userId.toString(),
        taskId: task._id.toString(),
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskStatus: task.taskStatus,
        taskDueDate: task.taskDueDate as Date,
      };
    } catch (error) {
      console.log("Error creating task:", error);
      throw new Error("Failed to create user task");
    }
  }

  public static deleteUserTask = async (taskId: string) : Promise<String> =>{
    try {
      await UserTaskWriter.deleteUserTask(taskId);
      return "Task deleted successfully";
    } catch (error) {
      console.log("Error deleting task:", error);
      throw new Error("Failed to delete user task");
    }
  }

  public static updateUserTask = async (taskId: string, params: UpdateUserTaskParams): Promise<UserTaskResponse> => {
    try {
      const updatedTask = await UserTaskWriter.updateUserTask(taskId, params);
      if (!updatedTask) {
        throw new Error("Task not found");
      }
      return {
        userId: updatedTask.userId.toString(),
        taskId: updatedTask._id.toString(),
        taskName: updatedTask.taskName,
        taskDescription: updatedTask.taskDescription,
        taskStatus: updatedTask.taskStatus,
        taskDueDate: updatedTask.taskDueDate as Date,
      };
    } catch (error) {
      console.log("Error updating task:", error);
      throw new Error("Failed to update user task");
    }
  }

  public static getUserTasks = async (userId: string): Promise<UserTaskResponse[]> => {
    try {
      const tasks = await UserTaskReader.getUserTasks(userId);
      return tasks.map((task) => ({
        userId: task.userId.toString(),
        taskId: task._id.toString(),
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskStatus: task.taskStatus,
        taskDueDate: task.taskDueDate as Date,
      }));
    } catch (error) {
      console.log("Error fetching tasks:", error);
      throw new Error("Failed to fetch user tasks");
    }
  }
}