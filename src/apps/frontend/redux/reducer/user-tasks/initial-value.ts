import type { AsyncError, UserTaskResponse } from "../../../types"

export type UserTasksSliceInitialValue = {
  createUserTaskError: AsyncError;
  createUserTaskLoading: boolean;
  createUserTaskData?: UserTaskResponse;
  updateUserTaskError: AsyncError;
  updateUserTaskLoading: boolean;
  updateUserTaskData?: UserTaskResponse;
  deleteUserTaskError: AsyncError;
  deleteUserTaskLoading: boolean;
  deleteUserTaskData?: String;
  getUserTasksError: AsyncError;
  getUserTasksLoading: boolean;
  getUserTaskData?: UserTaskResponse[];
  getAllTasksError: AsyncError;
  getAllTasksLoading: boolean;
  getAllTasksData?: UserTaskResponse[];
}

export const initialUserTaskState: UserTasksSliceInitialValue = {
  createUserTaskError: { code: "", message: "" },
  createUserTaskLoading: false,
  updateUserTaskError: { code: "", message: "" },
  updateUserTaskLoading: false,
  deleteUserTaskError: { code: "", message: "" },
  deleteUserTaskLoading: false,
  getUserTasksError: { code: "", message: "" },
  getUserTasksLoading: false,
  getAllTasksError: { code: "", message: "" },
  getAllTasksLoading: false,
  getAllTasksData: [],
  getUserTaskData: [],
  deleteUserTaskData: "",
  createUserTaskData: {} as UserTaskResponse,
  updateUserTaskData: {} as UserTaskResponse,
}