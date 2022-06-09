import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemCart, LIST_CART } from "../../../contant/Contant";
import {
  AddressOrderInterface,
  DataState,
  VoucherAdmin,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
interface DataStateCart extends DataState<ItemCart[]> {
  addressSelected?: AddressOrderInterface | null;
  voucherSelected?: VoucherAdmin | null;
}

const initialState: DataStateCart = {
  data: LIST_CART,
  isError: false,
  isLoading: false,
};

export const incrementAsyncCart = createAsyncThunk("getCart", async () => {
  return { data: [] };
});

export const cartSlice = createSlice({
  name: "getCart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      let array = state.data;
      const { id, new_quantity } = action.payload;
      state.data = array?.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            count: new_quantity,
            totalPrice: new_quantity * e.price,
          };
        }
        return e;
      });
    },
    deleteItemCart: (state, action) => {
      state.data = state.data?.filter((e) => e.id !== action.payload?.id);
      createNotification({
        type: "success",
        message: `Bạn đã xoá sản phẩm khỏi giỏ hàng thành công`,
      });
    },
    addProductToCart: (state, action) => {
      let carts = state.data;
      let item: ItemCart = action.payload?.item;
      let checkExistItem = carts?.find((e) => e.product_id === item.product_id);
      if (checkExistItem) {
        carts = carts?.map((e) => {
          if (e.product_id === item?.product_id) {
            return {
              ...e,
              count: e.count + item.count,
              totalPrice: (e.count + item.count) * e.price,
            };
          }
          return e;
        });
      } else {
        carts = carts?.concat([item]);
      }
      state.data = carts;
      createNotification({
        type: "success",
        message: "Bạn đã thêm vào giỏ hàng thành công",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncCart.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload?.data ?? [];
      })
      .addCase(incrementAsyncCart.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { updateQuantity, addProductToCart, deleteItemCart } =
  cartSlice.actions;
export default cartSlice.reducer;
