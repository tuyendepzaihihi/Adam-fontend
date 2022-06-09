import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LIST_ADDRESS } from "../../../../contant/Contant";
import { DataState } from "../../../../contant/IntefaceContaint";
import { createNotification } from "../../../../utils/MessageUtil";

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
  data: LIST_ADDRESS,
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
    deleteAddress: (state, action) => {
      let array = state.data;
      let deleteArray = action.payload?.array;
      deleteArray.map((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      state.data = array;
      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
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
export const {createAddress,deleteAddress,updateAddress} = addressSlice.actions

export default addressSlice.reducer;
