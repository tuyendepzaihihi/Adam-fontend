import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import CategoryAdminSlice from "./admin/category/slice/CategoryAdminSlice";
import switchRoleSlice from "./admin/sliceSwitchRole/switchRoleSlice";
import userAdminReducer from "./admin/user/slice/UserAdminSlice";
import VoucherAdminSlice from "./admin/voucher/slice/VoucherAdminSlice";
import cartReducer from "./screen/cart/slice/CartSlice";
import homeReducer from "./screen/home/slice/HomeSlice";
import  addressSlice  from "./screen/setting/address/slice/AddressSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    userAdmin: userAdminReducer,
    categoryAdmin: CategoryAdminSlice,
    swicth: switchRoleSlice,
    voucherAdmin: VoucherAdminSlice,
    addressUser: addressSlice
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
