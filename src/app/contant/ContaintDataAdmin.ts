import {
  Branch,
  CategoryAdmin,
  DataStateOption,
  DetailProductAdmin,
  HeadCell,
  Material,
  Option,
  OptionColor,
  OptionSize,
  ProductAdmin,
  Tag,
  UserAdmin,
  UserAdminInteface,
  VoucherAdmin,
} from "./IntefaceContaint";
import R from "../assets/R";
import { OrderDto } from "../screen/order/slice/OrderSlice";
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
    label: "Id",
  },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "phoneNumber", numeric: true, disablePadding: false, label: "Phone" },
  { id: "role", numeric: true, disablePadding: false, label: "Position" },
  {
    id: "fullName",
    numeric: true,
    disablePadding: false,
    label: "Full Name",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Status" },
];

export const headCellsCategory: HeadCell<CategoryAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  { id: "categoryName", numeric: true, disablePadding: false, label: "Name" },

  { id: "isDeleted", numeric: true, disablePadding: false, label: "Status" },
];

export const LIST_CATEGORY: CategoryAdmin[] = [
  {
    id: 1,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 2,
    create_date: "12/20/2022",
    categoryName: "Đồng hồ",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 3,
    create_date: "12/20/2022",
    categoryName: "Hạ chí",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 4,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 5,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: true,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 6,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
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
    startDate: "10/08/2022 18:00",
    endDate: "15/10/2022 16:00",
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
    startDate: "10/08/2022 18:00",
    endDate: "18/10/2022 18:00",
    create_date: "04/06/2022",
    description: "Hưởng ứng mùa hè sôi động của quân giải phóng",
    discountPersent: 5,
    discountMinValue: 10000,
    discountMaxValue: 25000000,
  },
];

export const headCellsMaterial: HeadCell<Material>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "materialName",
    numeric: true,
    disablePadding: false,
    label: "Material name",
  },
  { id: "isDelete", numeric: true, disablePadding: false, label: "Active" },
];

export const LIST_MATERIAL: Material[] = [
  {
    id: 1,
    isDelete: true,
    materialName: "Lụa mềm",
  },
  {
    id: 2,
    isDelete: true,
    materialName: "Cotton",
  },
];

export const LIST_BRANCH: Branch[] = [
  {
    id: 1,
    status: 1,
    branch_name: "Gucci",
  },
  {
    id: 2,
    status: 1,
    branch_name: "Owen",
  },
  {
    id: 3,
    status: 1,
    branch_name: "MieMode",
  },
];

export const headCellsBranch: HeadCell<Branch>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "branch_name",
    numeric: true,
    disablePadding: false,
    label: "Branch name",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Active" },
];

export const headCellsOrderAdmin: HeadCell<OrderDto>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "fullName",
    numeric: true,
    disablePadding: false,
    label: "Tên người nhận",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "Tổng tiền hàng",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Active" },
];

export const LIST_TAG: Tag[] = [
  {
    id: 1,
    isDelete: false,
    tagName: "Tag 1",
  },
  {
    id: 2,
    isDelete: false,
    tagName: "Tag 2",
  },
];

export const headCellsTag: HeadCell<Tag>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "tagName",
    numeric: true,
    disablePadding: false,
    label: "Tag name",
  },
  { id: "isDelete", numeric: true, disablePadding: false, label: "Active" },
];

export const OPTIONS_DATA: DataStateOption = {
  colors: [
    { id: 1, colorName: "Xanh", isActive: false, isDelete: false },
    { id: 2, colorName: "Đỏ", isActive: false, isDelete: false },
    { id: 3, colorName: "Vàng", isActive: false, isDelete: false },
  ],
  sizes: [
    { id: false, sizeName: "S", isActive: false, isDelete: false },
    { id: 2, sizeName: "M", isActive: false, isDelete: false },
    { id: 3, sizeName: "L", isActive: false, isDelete: false },
    { id: 4, sizeName: "XL", isActive: false, isDelete: false },
    { id: 5, sizeName: "XXL", isActive: false, isDelete: false },
  ],
};

export const headCellsOption: HeadCell<Option>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "option_name",
    numeric: true,
    disablePadding: false,
    label: "Option name",
  },
];

export const headCellsOptionColor: HeadCell<OptionColor>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "colorName",
    numeric: true,
    disablePadding: false,
    label: "Color name",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Active" },
];

export const headCellsOptionSize: HeadCell<OptionSize>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "sizeName",
    numeric: true,
    disablePadding: false,
    label: "Size name",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Active" },
];
// Product
export const headCellsProduct: HeadCell<ProductAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  { id: "productName", numeric: true, disablePadding: false, label: "Name" },
  {
    id: "createDate",
    numeric: true,
    disablePadding: false,
    label: "Create date",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Active" },
  { id: "isComplete", numeric: true, disablePadding: false, label: "Complete" },
];

export const LIST_PRODUCT: ProductAdmin[] = [
  // {
  //   productName: "Áo",
  //   category_id: 1,
  //   description: "cu",
  //   image: R.images.img_product,
  //   id: 1,
  //   createDate: "15/10/2021",
  //   isActive: 0,
  //   tag_id: 1,
  //   voteAverage: 0,
  // },
  // {
  //   productName: "Áo sơ mi",
  //   category_id: 1,
  //   description: "cu",
  //   image: R.images.img_product,
  //   id: 2,
  //   createDate: "15/10/2021",
  //   isActive: 0,
  //   tag_id: 1,
  //   voteAverage: 0,
  // },
  // {
  //   productName: "Áo gió",
  //   category_id: 1,
  //   description: "cu",
  //   image: R.images.img_product,
  //   id: 3,
  //   createDate: "15/10/2021",
  //   isActive: 0,
  //   tag_id: 1,
  //   voteAverage: 0,
  // },
];

export const headCellsProductDetail: HeadCell<DetailProductAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
];

export const LIST_PRODUCT_DETAIL: DetailProductAdmin[] = [
  {
    id: 1,
    color: {
      id: 1,
      isActive: true,
      isDelete: false,
      colorName: "Xanh",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 15000,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 1,
      isActive: true,
      isDelete: false,
      sizeName: "S",
    },
  },
  {
    id: 2,
    color: {
      id: 2,
      isActive: true,
      isDelete: false,
      colorName: "Vang",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 1111111111,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 2,
      isActive: true,
      isDelete: false,
      sizeName: "M",
    },
  },
  {
    id: 3,
    color: {
      id: 1,
      isActive: true,
      isDelete: false,
      colorName: "Xanh",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 222222222,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 2,
      isActive: true,
      isDelete: false,
      sizeName: "M",
    },
  },
  {
    id: 4,
    color: {
      id: 2,
      isActive: true,
      isDelete: false,
      colorName: "Vang",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 3333333,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 1,
      isActive: true,
      isDelete: false,
      sizeName: "S",
    },
  },
];

export const LIST_OPTION = [
  { id: 1, name: "Color" },
  { id: 2, name: "Size" },
];
