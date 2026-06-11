import type { CreateUserTaskParams, UpdateUserTaskParams, UserTaskResponse } from "../types";
import APIService from "./api.service";
import CommonService from "./common.service";

export class UserTaskService extends APIService {
  private static readonly instance = new UserTaskService();

  public static getUserTasks = async (): Promise<UserTaskResponse[]> => {
    try {
      const response = await this.instance.apiClient.get<UserTaskResponse[]>("/tasks");
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static createUserTask = async (params: CreateUserTaskParams): Promise<UserTaskResponse> => {
    try {
      const response = await this.instance.apiClient.post<UserTaskResponse>("/tasks", params);
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static updateUserTask = async (id: string, params: Partial<UpdateUserTaskParams>): Promise<UserTaskResponse> => {
    try {
      const response = await this.instance.apiClient.patch<UserTaskResponse>(`/tasks/${id}`, params);
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static deleteUserTask = async (id: string): Promise<String> => {
    try {
      const response = await this.instance.apiClient.delete(`/tasks/${id}`);
      return response.data.message || "Task deleted successfully";
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static getAllTasks = async (): Promise<UserTaskResponse[]> => {
    try {
      const response = await this.instance.apiClient.get<UserTaskResponse[]>(`/tasks/all`);
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }
}