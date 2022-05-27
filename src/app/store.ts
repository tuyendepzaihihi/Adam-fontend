import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "./screen/cart/slice/CartSlice";
import homeReducer from "./screen/home/slice/HomeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
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
