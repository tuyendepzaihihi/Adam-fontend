import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userAdminReducer from "./admin/user/slice/UserAdminSlice";

export const store = configureStore({
  reducer: {
    userAdmin: userAdminReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
