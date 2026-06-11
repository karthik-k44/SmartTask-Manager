import type { AsyncError, User } from "../../../types";

export type UserAuthSliceType = {
  createUserLoading: boolean;
  createUserError: AsyncError;
  createUserSuccess: boolean;
  loginLoading: boolean;
  loginError: AsyncError;
  loginSuccess: boolean;
  deleteUserLoading: boolean;
  deleteUserError: AsyncError;
  deleteUserSuccess: String;
  getAllUsersLoading: boolean;
  getAllUsersError: AsyncError;
  getAllUsersSuccess: User[];
  getUserByIdLoading: boolean;
  getUserByIdError: AsyncError;
  getUserByIdSuccess: User;
}

export const initialUserAuthState: UserAuthSliceType = {
  createUserLoading: false,
  createUserError: { code: "", message: "" },
  createUserSuccess: false,
  loginLoading: false,
  loginError: { code: "", message: "" },
  loginSuccess: false,
  deleteUserLoading: false,
  deleteUserError: { code: "", message: "" },
  deleteUserSuccess: "",
  getAllUsersLoading: false,
  getAllUsersError: { code: "", message: "" },
  getAllUsersSuccess: [],
  getUserByIdLoading: false,
  getUserByIdError: { code: "", message: "" },
  getUserByIdSuccess: {} as User,
}