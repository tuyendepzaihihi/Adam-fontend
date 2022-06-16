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
    id: "material_name",
    numeric: true,
    disablePadding: false,
    label: "Material name",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Active" },
];

export const LIST_MATERIAL: Material[] = [
  {
    id: 1,
    status: 2,
    material_name: "Lụa mềm",
  },
  {
    id: 2,
    status: 1,
    material_name: "Cotton",
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

export const LIST_TAG: Tag[] = [
  {
    id: 1,
    status: 2,
    tag_name: "Tag 1",
  },
  {
    id: 2,
    status: 1,
    tag_name: "Tag 2",
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
    id: "tag_name",
    numeric: true,
    disablePadding: false,
    label: "Tag name",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Active" },
];

export const OPTIONS_DATA: DataStateOption = {
  colors: [
    { id: 1, color_name: "Xanh", status: 1 },
    { id: 2, color_name: "Đỏ", status: 1 },
    { id: 3, color_name: "Vàng", status: 1 },
  ],
  sizes: [
    { id: 1, size_name: "S", status: 1 },
    { id: 2, size_name: "M", status: 1 },
    { id: 3, size_name: "L", status: 1 },
    { id: 4, size_name: "XL", status: 1 },
    { id: 5, size_name: "XXL", status: 1 },
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
    id: "color_name",
    numeric: true,
    disablePadding: false,
    label: "Color name",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Active" },
];

export const headCellsOptionSize: HeadCell<OptionSize>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "size_name",
    numeric: true,
    disablePadding: false,
    label: "Size name",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Active" },
];

// Product
export const headCellsProduct: HeadCell<ProductAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  { id: "product_name", numeric: true, disablePadding: false, label: "Name" },
  {
    id: "category_id",
    numeric: true,
    disablePadding: false,
    label: "Category id",
  },
  {
    id: "create_date",
    numeric: true,
    disablePadding: false,
    label: "Create date",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Active" },
];

export const LIST_PRODUCT: ProductAdmin[] = [
  {
    product_name: "Áo",
    branch_id: 1,
    category_id: 1,
    description: "khanh",
    image: R.images.img_product,
    id: 1,
    create_date: "15/10/2021",
    is_delete: 0,
    status: 1,
    tag_id: 1,
  },
  {
    product_name: "Áo sơ mi",
    branch_id: 1,
    category_id: 1,
    description: "khanh",
    image: R.images.img_product,
    id: 2,
    create_date: "15/10/2021",
    is_delete: 0,
    status: 1,
    tag_id: 1,
  },
  {
    product_name: "Áo gió",
    branch_id: 1,
    category_id: 1,
    description: "khanh",
    image: R.images.img_product,
    id: 3,
    create_date: "15/10/2021",
    is_delete: 0,
    status: 1,
    tag_id: 1,
  },
];

export const headCellsProductDetail: HeadCell<DetailProductAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  { id: "color_id", numeric: true, disablePadding: false, label: "Active" },
  { id: "size_id", numeric: true, disablePadding: false, label: "Active" },
];

export const LIST_PRODUCT_DETAIL: DetailProductAdmin[] = [
  {
    id: 1,
    color_id: 1,
    size_id: 1,
    price_export: 0,
    price_import: 0,
    quantity: 0,
    product_id: 1,
    image_product: "",
    is_delete: 1,
    status: 1,
  },
  {
    id: 2,
    color_id: 1,
    size_id: 1,
    price_export: 0,
    price_import: 0,
    quantity: 0,
    product_id: 1,
    image_product: "",
    is_delete: 1,
    status: 1,
  },
];

export const LIST_OPTION = [
  { id: 1, name: "Color" },
  { id: 2, name: "Size" },
];
