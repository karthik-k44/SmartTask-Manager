import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateUserParams, LoginParams, LoginResponse, User } from "../../../types";
import { UserAuthenticationService } from "../../../services";
import type { UserStatus } from "../../../types/user-authentication";

const CreateUser = createAsyncThunk(
  'CreateUser',
    async (params: CreateUserParams): Promise<User> => UserAuthenticationService.createUser(params)
)

const GetAllUsers = createAsyncThunk(
  'GetAllUsers',
     async (): Promise<User[]> => UserAuthenticationService.getAllUsers()
)

const LoginUser = createAsyncThunk(
  'LoginUser',
    async (params: LoginParams): Promise<LoginResponse> => UserAuthenticationService.loginUser(params)
)

const DeleteUserByAdmin = createAsyncThunk(
  'DeleteUserByAdmin',
    async (userId: string): Promise<string> => UserAuthenticationService.deleteUserByAdmin(userId)
)

const GetUserById = createAsyncThunk(
  'GetUserById',
    async (): Promise<User> => UserAuthenticationService.getUserById()
)

const UpdateUserStatus = createAsyncThunk(
  'UpdateUserStatus',
  async ({ userId, status }: { userId: string, status: UserStatus }): Promise<string> => UserAuthenticationService.updateUserStatus(userId, status)
)


export {
  CreateUser,
  GetAllUsers,
  LoginUser,
  DeleteUserByAdmin,
  GetUserById,
  UpdateUserStatus
}