import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import BranchAdminSlice from "./admin/branch/slice/BranchAdminSlice";
import CategoryAdminSlice from "./admin/category/slice/CategoryAdminSlice";
import MaterialAdminSlice from "./admin/material/slice/MaterialAdminSlice";
import OptionAdminSlice from "./admin/option/slice/OptionAdminSlice";
import ProductAdminSlice from "./admin/product/slice/ProductAdminSlice";
import switchRoleSlice from "./admin/sliceSwitchRole/switchRoleSlice";
import TagAdminSlice from "./admin/tag/slice/TagAdminSlice";
import userAdminReducer from "./admin/user/slice/UserAdminSlice";
import VoucherAdminSlice from "./admin/voucher/slice/VoucherAdminSlice";
import cartReducer from "./screen/cart/slice/CartSlice";
import homeReducer from "./screen/home/slice/HomeSlice";
import OrderSlice from "./screen/order/slice/OrderSlice";
import addressSlice from "./screen/setting/address/slice/AddressSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    userAdmin: userAdminReducer,
    categoryAdmin: CategoryAdminSlice,
    swicth: switchRoleSlice,
    voucherAdmin: VoucherAdminSlice,
    addressUser: addressSlice,
    orderUser: OrderSlice,
    materialAdmin: MaterialAdminSlice,
    tagAdmin: TagAdminSlice,
    branchAdmin: BranchAdminSlice,
    optionAdmin: OptionAdminSlice,
    productAdmin: ProductAdminSlice,
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
