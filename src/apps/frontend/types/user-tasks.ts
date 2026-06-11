export enum TaskStatus{
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type CreateUserTaskParams = {
  userId: string;
  taskName: string;
  taskDescription: string;
  taskStatus: TaskStatus;
  taskDueDate: Date;
}

export type UpdateUserTaskParams = {
  taskName?: string;
  taskDescription?: string;
  taskStatus?: TaskStatus;
  taskDueDate?: Date;
}

export type UserTaskResponse = {
  userId: string;
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskStatus: TaskStatus;
  taskDueDate: Date;
}