import User from "@material-ui/icons/AccountBalance";
import Dashboard from "@material-ui/icons/Dashboard";

export const BaseUrl = "https://adam-store.herokuapp.com/";
// export const BaseUrl = "https://localhost:9000/";

export const REG_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
export const NAME_REGEX =
  /^[a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;

export const textValidate = {
  phone: {
    error_validate: "Phone number is error validate",
    require: "Please enter phone number",
  },
  pass: {
    require: "Please enter a password",
    short: "Pass word dont short more than 6 char",
    long: "Pass word dont long more than 25 char ",
  },
  re_pass: {
    not_found: "Confirm password incorrect",
    require: "Please enter confirm password",
  },
  full_name: {
    require: "Please enter a full name",
    error_validate: "Full name is error validate!",
  },
  company: {
    require: "Please enter a company",
  },
  email: {
    require: "Please enter a email!",
    error_validate: "Email is error validate!",
  },
  user_name: {
    require: "Please enter a User name!",
    error_validate: "User name is error validate!",
  },
};

export const DEFAULT_ADDRESS_ORDER = {
  addressDetail: "360 Đường Cầu Giấy",
  addressId: 58,
  fullName: "Admin Đỗ Văn Duy",
  phoneNumber: "0969351428",
};

export const URL_IMAGE =
  "https://us.123rf.com/450wm/kiuikson/kiuikson1610/kiuikson161000021/63802708-man-posing.jpg?ver=6";

export const IMAGE_URL_DEFAULT =
  "https://adam-store.herokuapp.com/downloadFile/292798654_571644561221609_3963627227934195443_n.jpg";

export const ROUTE = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASS: "/auth/forgotPassword",
  EMAIL_INPUT: "/auth/emailInput",
  ACCOUNT: "/account",
  VERIFY_CODE: '/auth/verifyPhone'
};

export const ROUTE_ADMIN = {
  DASHBOARD: "/",
  USER: "/admin/user",
};

export const LIST_MENU_DRAWER = [
  {
    name: "Statistic",
    route: ROUTE_ADMIN.DASHBOARD,
    icon: Dashboard,
  },
  {
    name: "User management",
    route: ROUTE_ADMIN.USER,
    icon: User,
  },
];

export const TYPE_DIALOG = {
  CREATE: 1,
  UPDATE: 2,
};