import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemCart, LIST_ADDRESS, LIST_CART } from "../../../contant/Contant";
import { DataState, VoucherAdmin } from "../../../contant/IntefaceContaint";
import { DataAddress } from "../../setting/address/slice/AddressSlice";

export interface History {
  id: number;
  status: number;
  time: string;
}
export interface DataOrder {
  id: number;
  create_date: string;
  totalPrice: number;
  address?: DataAddress | null;
  products?: ItemCart[] | null;
  voucher?: VoucherAdmin | null;
  status: number;
  totalProduct: number;
  totalDiscount: number;
  code?: string;
  history?: History[];
}
interface DataOrderList {
  pedding: DataState<DataOrder[]>;
  confirm: DataState<DataOrder[]>;
  delivery: DataState<DataOrder[]>;
  adrived: DataState<DataOrder[]>;
  done: DataState<DataOrder[]>;
  cancel: DataState<DataOrder[]>;
  roll_back: DataState<DataOrder[]>;
}

const LIST_ORDER_PENDING: DataOrder[] = [
  {
    id: 1,
    create_date: "09/05/2009 08:15",
    status: 1,
    totalPrice: 1500000,
    voucher: null,
    address: LIST_ADDRESS[0],
    products: LIST_CART,
    totalDiscount: 1200000,
    totalProduct: 300000,
    code: "#VFGFF4F6AFF4F52",
    history: [
      { id: 1, status: 1, time: "10/10/2022 08:22" },
      { id: 1, status: 2, time: "10/10/2022 08:22" },
      { id: 1, status: 3, time: "10/10/2022 08:22" },
    ],
  },
  {
    id: 2,
    create_date: "09/05/2009 08:15",
    status: 1,
    totalPrice: 180000,
    voucher: null,
    address: LIST_ADDRESS[0],
    products: LIST_CART,
    totalDiscount: 1500000,
    totalProduct: 300000,
    code: "#VFGFF4F6AFF4F51",
    history: [
      { id: 1, status: 1, time: "10/10/2022 08:22" },
      { id: 1, status: 2, time: "10/10/2022 08:22" },
      { id: 1, status: 3, time: "10/10/2022 08:22" },
      { id: 1, status: 4, time: "10/10/2022 08:22" },
    ],
  },
  {
    id: 3,
    create_date: "09/05/2009 08:15",
    status: 1,
    totalPrice: 180000,
    voucher: null,
    address: LIST_ADDRESS[0],
    products: LIST_CART,
    totalDiscount: 1500000,
    totalProduct: 300000,
    code: "#VFGFF4F6AFF4F51",
    history: [{ id: 1, status: 1, time: "10/10/2022 08:22" }],
  },
];

const initialState: DataOrderList = {
  pedding: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  adrived: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  cancel: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  confirm: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  delivery: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  done: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  roll_back: {
    data: [],
    isError: false,
    isLoading: false,
  },
};

export const getOrderInfo = createAsyncThunk("order", async () => {
  return true;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {},
    createOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state, action) => {})
      .addCase(getOrderInfo.fulfilled, (state, action) => {})
      .addCase(getOrderInfo.rejected, (state, action) => {});
  },
});
export const { createOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;
