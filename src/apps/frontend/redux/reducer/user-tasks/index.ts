import { createSlice } from "@reduxjs/toolkit";
import { initialUserTaskState } from "./initial-value";
import { CreateUserTask, DeleteUserTask, GetUserTaskById, GetUserTasks, UpdateUserTask } from "./action";

const userTaskSlice = createSlice({
  name: "userTasks",
  initialState: initialUserTaskState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(CreateUserTask.pending, (state) => {
      state.CreateUserTaskLoading = true;
    })

    builder.addCase(CreateUserTask.fulfilled, (state, action) => {
      state.CreateUserTaskLoading = false;
      state.CreateUserTaskSuccess = action.payload;
    })

    builder.addCase(CreateUserTask.rejected, (state, action) => {
      state.CreateUserTaskLoading = false;
      state.CreateUserTaskError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })
  
    builder.addCase(UpdateUserTask.pending, (state) => {
      state.UpdateUserTaskLoading = true;
    })
  
    builder.addCase(UpdateUserTask.fulfilled, (state, action) => {
      state.UpdateUserTaskLoading = false;
      state.UpdateUserTaskSuccess = action.payload;
    })

    builder.addCase(UpdateUserTask.rejected, (state, action) => {
      state.UpdateUserTaskLoading = false
      state.UpdateUserTaskError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(GetUserTasks.pending, (state) => {
      state.GetUserTasksLoading = true;
    })

    builder.addCase(GetUserTasks.fulfilled, (state, action) => {
      state.GetUserTasksLoading = false;
      state.GetUserTasksSuccess = action.payload;
    })

    builder.addCase(GetUserTasks.rejected, (state, action) => {
      state.GetUserTasksLoading = false
      state.GetUserTasksError= {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(GetUserTaskById.pending, (state) => {
      state.GetUserTaskByIdLoading = true;
    })  

    builder.addCase(GetUserTaskById.fulfilled, (state, action) => {
      state.GetUserTaskByIdLoading = false;
      state.GetUserTaskByIdSuccess = [action.payload];
    })

    builder.addCase(GetUserTaskById.rejected, (state, action) => {
      state.GetUserTaskByIdLoading = false
      state.GetUserTaskByIdError= {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(DeleteUserTask.pending, (state) => {
      state.DeleteUserTaskLoading = true;
    })

    builder.addCase(DeleteUserTask.fulfilled, (state, action) => {
      state.DeleteUserTaskLoading = false;
      state.DeleteUserTaskSuccess = action.payload;
    })

    builder.addCase(DeleteUserTask.rejected, (state, action) => {
      state.DeleteUserTaskLoading = false
      state.DeleteUserTaskError= {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })
  }
})

export default userTaskSlice.reducer;