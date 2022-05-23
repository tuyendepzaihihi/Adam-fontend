import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../Account.props";
import { requestGetUserInfo } from "../AccountApi";

interface DataState<T> {
  data?: T;
  isLoading?: boolean;
  isError?: boolean;
}

const initialState: DataState<UserInterface | null> = {
  data: null,
  isError: false,
  isLoading: false,
};

export const getUserInfo = createAsyncThunk("account", async () => {
  const response = await requestGetUserInfo();
  return response.data;
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload?.data ?? {};
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default accountSlice.reducer;
