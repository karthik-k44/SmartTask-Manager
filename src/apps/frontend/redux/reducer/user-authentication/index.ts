import { createSlice } from "@reduxjs/toolkit";
import { initialUserAuthState } from "./initial-value";
import { CreateUser, LoginUser, DeleteUserByAdmin, GetAllUsers, GetUserById} from "./action";


const  authSlice = createSlice({
  name: "authUser",
  initialState: initialUserAuthState,
  reducers: {},
  
  extraReducers: (builder) => {

    builder.addCase(CreateUser.pending, (state) => {
      state.createUserLoading = true;
    })

    builder.addCase(CreateUser.fulfilled, (state) => {
      state.createUserLoading = false;
      state.createUserSuccess = true;
    })

    builder.addCase(CreateUser.rejected, (state, action) => {
      state.createUserLoading = false;
      state.createUserError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(LoginUser.pending, (state) => {
      state.loginLoading = true;
    })

    builder.addCase(LoginUser.fulfilled, (state) => {
      state.loginLoading = false;
      state.loginSuccess = true;
    })

    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(DeleteUserByAdmin.pending, (state) => {
      state.deleteUserLoading = true;
    })

    builder.addCase(DeleteUserByAdmin.fulfilled, (state, action) => {
      state.deleteUserLoading = false;
      state.deleteUserSuccess = action.payload;
    })

    builder.addCase(DeleteUserByAdmin.rejected, (state, action) => {
      state.deleteUserLoading = false
      state.deleteUserError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder .addCase(GetAllUsers.pending, (state) => {
      state.getAllUsersLoading = true;
    })

    builder.addCase(GetAllUsers.fulfilled, (state, action) => {
      state.getAllUsersLoading = false;
      state.getAllUsersSuccess = action.payload;
    })

    builder.addCase(GetAllUsers.rejected, (state, action) => {
      state.getAllUsersLoading = false
      state.getAllUsersError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })

    builder.addCase(GetUserById.pending, (state) => {
      state.getAllUsersLoading = true;
    })

    builder.addCase(GetUserById.fulfilled, (state, action) => {
      state.getUserByIdLoading = false;
      state.getUserByIdSuccess = action.payload;
    })

    builder.addCase(GetUserById.rejected, (state, action) => {
      state.getUserByIdLoading = false
      state.getUserByIdError = {
        code: action.error.code || "",
        message: action.error.message || "",
      }
    })
  }
})

export default authSlice.reducer;