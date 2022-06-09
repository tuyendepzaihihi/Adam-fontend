import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../contant/IntefaceContaint";

export interface DataAddress {
  wardId?: number
  wardName?: string 
  districtId?: number
  districtName?: string 
  provinceId?: number
  provinceName?: string 
  addressDetail?: string
  isDefault?: boolean
  phone?: string
  name?: string
  id?: any
}

const initialState: DataState<DataAddress[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const getAddressInfo = createAsyncThunk("address", async () => {
  return true;
});

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      let oldArray = state.data;
      let item: DataAddress = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createAddress: (state, action) => {
      let item: DataAddress = action.payload?.item;
      state.data = state.data?.concat([item]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddressInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getAddressInfo.fulfilled, (state, action) => {
        
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getAddressInfo.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {createAddress,updateAddress} = addressSlice.actions

export default addressSlice.reducer;
