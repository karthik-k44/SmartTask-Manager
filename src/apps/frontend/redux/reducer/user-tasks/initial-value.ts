import type { AsyncError, UserTaskResponse } from "../../../types"

export type UserTasksSliceInitialValue = {
  CreateUserTaskError: AsyncError;
  CreateUserTaskLoading: boolean;
  CreateUserTaskSuccess?: UserTaskResponse;
  UpdateUserTaskError: AsyncError;
  UpdateUserTaskLoading: boolean;
  UpdateUserTaskSuccess?: UserTaskResponse;
  DeleteUserTaskError: AsyncError;
  DeleteUserTaskLoading: boolean;
  DeleteUserTaskSuccess?: String;
  GetUserTasksError: AsyncError;
  GetUserTasksLoading: boolean;
  GetUserTasksSuccess?: UserTaskResponse[];
  GetUserTaskByIdError: AsyncError;
  GetUserTaskByIdLoading: boolean;
  GetUserTaskByIdSuccess?: UserTaskResponse[];
}

export const initialUserTaskState: UserTasksSliceInitialValue = {
  CreateUserTaskError: { code: "", message: "" },
  CreateUserTaskLoading: false,
  CreateUserTaskSuccess: undefined,
  UpdateUserTaskError: { code: "", message: "" },
  UpdateUserTaskLoading: false,
  UpdateUserTaskSuccess: undefined,
  DeleteUserTaskError: { code: "", message: "" },
  DeleteUserTaskLoading: false,
  DeleteUserTaskSuccess: undefined,
  GetUserTasksError: { code: "", message: "" },
  GetUserTasksLoading: false,
  GetUserTasksSuccess: undefined,
  GetUserTaskByIdError: { code: "", message: "" },
  GetUserTaskByIdLoading: false,
  GetUserTaskByIdSuccess: undefined,
}