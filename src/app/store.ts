import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import CategoryAdminSlice from "./admin/category/slice/CategoryAdminSlice";
import switchRoleSlice from "./admin/sliceSwitchRole/switchRoleSlice";
import userAdminReducer from "./admin/user/slice/UserAdminSlice";
import cartReducer from "./screen/cart/slice/CartSlice";
import homeReducer from "./screen/home/slice/HomeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    userAdmin: userAdminReducer,
    categoryAdmin: CategoryAdminSlice,
    swicth: switchRoleSlice,
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
