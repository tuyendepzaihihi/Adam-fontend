import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    return true;
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
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(incrementAsyncHome.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default homeSlice.reducer;
