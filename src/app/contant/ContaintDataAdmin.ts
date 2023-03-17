import {
  HeadCell, UserAdmin,
  UserAdminInterface
} from "./IntefaceContaint";
export const rows_example_user: UserAdminInterface[] = [
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
    last_name: "K cu",
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

export const headCells: HeadCell<UserAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  { id: "role", numeric: true, disablePadding: false, label: "Vai trò" },
  {
    id: "fullName",
    numeric: true,
    disablePadding: false,
    label: "Tên đầy đủ",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];

