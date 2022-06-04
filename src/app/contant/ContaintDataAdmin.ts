import {
  CategoryAdmin,
  HeadCell,
  UserAdminInteface,
  VoucherAdmin,
} from "./IntefaceContaint";
import R from "../assets/R";
export const rows_example_user: UserAdminInteface[] = [
  {
    id: 1,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 2,
    email: "Levancu562@gmail.com",
    phone: "097940215",
    position: "User",
    first_name: "Le",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 3,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Tam",
    active: 1,
  },
  {
    id: 4,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "K kkk",
    active: 0,
  },
  {
    id: 5,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 6,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 7,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "K Khanh",
    active: 0,
  },
  {
    id: 8,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
];

export const headCells: HeadCell<UserAdminInteface>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "phone", numeric: true, disablePadding: false, label: "Phone" },
  { id: "position", numeric: true, disablePadding: false, label: "Position" },
  {
    id: "first_name",
    numeric: true,
    disablePadding: false,
    label: "First Name",
  },
  { id: "last_name", numeric: true, disablePadding: false, label: "Last Name" },
  { id: "active", numeric: true, disablePadding: false, label: "Active" },
];

export const headCellsCategory: HeadCell<CategoryAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  { id: "name", numeric: true, disablePadding: false, label: "Name" },
  {
    id: "create_date",
    numeric: true,
    disablePadding: false,
    label: "create_date",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
];

export const LIST_CATEGORY: CategoryAdmin[] = [
  {
    id: 1,
    create_date: "12/20/2022",
    name: "Thu đông",
    status: 1,
    url: R.images.img_product,
  },
  {
    id: 2,
    create_date: "12/20/2022",
    name: "Đồng hồ",
    status: 1,
    url: R.images.img_product,
  },
  {
    id: 3,
    create_date: "12/20/2022",
    name: "Hạ chí",
    status: 1,
    url: R.images.img_product,
  },
  {
    id: 4,
    create_date: "12/20/2022",
    name: "Thu đông",
    status: 0,
    url: R.images.img_product,
  },
  {
    id: 5,
    create_date: "12/20/2022",
    name: "Thu đông",
    status: 1,
    url: R.images.img_product,
  },
  {
    id: 6,
    create_date: "12/20/2022",
    name: "Thu đông",
    status: 1,
    url: R.images.img_product,
  },
];

export const headCellsVoucher: HeadCell<VoucherAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  { id: "title", numeric: true, disablePadding: false, label: "Title" },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "startDate",
    numeric: true,
    disablePadding: false,
    label: "Start time",
  },
  { id: "endDate", numeric: true, disablePadding: false, label: "End time" },
  {
    id: "create_date",
    numeric: true,
    disablePadding: false,
    label: " Create date",
  },
  {
    id: "discountPersent",
    numeric: true,
    disablePadding: false,
    label: "Discount persent",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
];

export const LIST_VOUCHER: VoucherAdmin[] = [
  {
    id: 1,
    title: "Hè đỏ lửa",
    status: 1,
    url: R.images.img_banner1,
    startDate: "10/8/2022",
    endDate: "15/10/2022",
    create_date: "04/06/2022",
    description: "Hưởng ứng mùa hè sôi động",
    discountPersent: 10,
    discountMinValue: 10000,
    discountMaxValue: 25000000,
  },
  {
    id: 2,
    title: "Mùa hè đỏ lửa 1972",
    status: 1,
    url: R.images.img_banner2,
    startDate: "10/8/2022",
    endDate: "18/10/2022",
    create_date: "04/06/2022",
    description: "Hưởng ứng mùa hè sôi động của quân giải phóng",
    discountPersent: 5,
    discountMinValue: 10000,
    discountMaxValue: 25000000,
  },
];
