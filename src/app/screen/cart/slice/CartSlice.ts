import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemCart, LIST_CART, LIST_PRODUCT } from "../../../contant/Contant";

interface DataState<T> {
  data?: T;
  isLoading?: boolean;
  isError?: boolean;
}

const initialState: DataState<ItemCart[]> = {
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
export const { updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
