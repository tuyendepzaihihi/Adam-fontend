import Product from "@material-ui/icons/Computer";
import Home from "@material-ui/icons/HomeSharp";

export const BaseUrl = "http://localhost:3001/";
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
};

export const ROUTE = {
  HOME: "HOME",
  PRODUCT: "PRODUCT",
};

export const DEFINE_ROUTE = {
  [ROUTE.HOME]: {
    name: "Home",
    route: "/",
  },
  [ROUTE.PRODUCT]: {
    name: "Product",
    route: "/product",
  },
};

export const LIST_MENU_DRAWER = [
  {
    name: ROUTE.HOME,
    route: DEFINE_ROUTE[ROUTE.HOME].route,
    icon: Home,
  },
  {
    name: ROUTE.PRODUCT,
    route: DEFINE_ROUTE[ROUTE.PRODUCT].route,
    icon: Product,
  },
];
