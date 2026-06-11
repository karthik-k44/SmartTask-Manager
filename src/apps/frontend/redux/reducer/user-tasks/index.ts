import { createSlice } from "@reduxjs/toolkit";
import { initialUserTaskState } from "./initial-value";
import { CreateUserTask, DeleteUserTask, GetAllTasks, GetUserTasks, UpdateUserTask } from "./action";

const userTaskSlice = createSlice({
  name: "userTasks",
  initialState: initialUserTaskState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(CreateUserTask.pending, (state) => {
      state.createUserTaskLoading = true;
    })

    builder.addCase(CreateUserTask.fulfilled, (state, action) => {
      state.createUserTaskLoading = false;
      state.createUserTaskData = action.payload;
    })

    builder.addCase(CreateUserTask.rejected, (state, action) => {
      state.createUserTaskLoading = false;
      state.createUserTaskError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })
  
    builder.addCase(UpdateUserTask.pending, (state) => {
      state.updateUserTaskLoading = true;
    })
  
    builder.addCase(UpdateUserTask.fulfilled, (state, action) => {
      state.updateUserTaskLoading = false;
      state.updateUserTaskData = action.payload;
    })

    builder.addCase(UpdateUserTask.rejected, (state, action) => {
      state.updateUserTaskLoading = false
      state.updateUserTaskError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(GetUserTasks.pending, (state) => {
      state.getUserTasksLoading = true;
    })

    builder.addCase(GetUserTasks.fulfilled, (state, action) => {
      state.getUserTasksLoading = false;
      state.getUserTaskData = action.payload;
    })

    builder.addCase(GetUserTasks.rejected, (state, action) => {
      state.getUserTasksLoading = false
      state.getUserTasksError= {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(GetAllTasks.pending, (state) => {
      state.getAllTasksLoading = true;
    })  

    builder.addCase(GetAllTasks.fulfilled, (state, action) => {
      state.getAllTasksLoading = false;
      state.getAllTasksData = action.payload;
    })

    builder.addCase(GetAllTasks.rejected, (state, action) => {
      state.getAllTasksLoading = false
      state.getAllTasksError= {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(DeleteUserTask.pending, (state) => {
      state.deleteUserTaskLoading = true;
    })

    builder.addCase(DeleteUserTask.fulfilled, (state, action) => {
      state.deleteUserTaskLoading = false;
      state.deleteUserTaskData = action.payload;
    })

    builder.addCase(DeleteUserTask.rejected, (state, action) => {
      state.deleteUserTaskLoading = false
      state.deleteUserTaskError= {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })
  }
})

export default userTaskSlice.reducer;