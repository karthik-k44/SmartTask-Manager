import userTaskSlice from "./reducer/user-tasks";
import userAuthSlice from "./reducer/user-authentication";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    userTask : userTaskSlice,
    authUser : userAuthSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch