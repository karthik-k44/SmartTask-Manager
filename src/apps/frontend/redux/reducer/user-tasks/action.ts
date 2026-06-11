import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateUserTaskParams, UserTaskResponse } from "../../../types";
import { UserTaskService } from "../../../services/user-task.service";

const CreateUserTask = createAsyncThunk(
  'CreateUserTask',
  async (params: CreateUserTaskParams): Promise<UserTaskResponse> => UserTaskService.createUserTask(params)
)

const GetUserTasks = createAsyncThunk(
  'GetUserTasks',
  async (): Promise<UserTaskResponse[]> => UserTaskService.getUserTasks()
)

const UpdateUserTask = createAsyncThunk(
  'UpdateUserTask',
  async ({ id, params }: { id: string, params: Partial<CreateUserTaskParams> }): Promise<UserTaskResponse> => UserTaskService.updateUserTask(id, params)
)

const DeleteUserTask = createAsyncThunk(
  'DeleteUserTask',
  async (id: string): Promise<String> => UserTaskService.deleteUserTask(id)
)

const GetAllTasks = createAsyncThunk(
  'GetAllTasks',
  async (): Promise<UserTaskResponse[]> => UserTaskService.getAllTasks()
)

export {
  CreateUserTask,
  GetUserTasks,
  UpdateUserTask,
  DeleteUserTask,
  GetAllTasks
}