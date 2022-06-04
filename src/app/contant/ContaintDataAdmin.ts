import { CategoryAdmin, HeadCell, UserAdminInteface } from "./IntefaceContaint";
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
