import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGetListUser } from "../HomeApi";

export interface Image {
  id: number;
  is_active: boolean;
  url: number;
  user_id: string;
}
interface DataState<T> {
  data?: T;
  isLoading?: boolean;
  isError?: boolean;
}

const initialState: DataState<Image[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncHome = createAsyncThunk(
  "home/getImage",
  async () => {
    const response = await requestGetListUser();
    return response.data;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncHome.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncHome.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload?.data ?? [];
      })
      .addCase(incrementAsyncHome.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default homeSlice.reducer;
