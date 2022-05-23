import { Navigate } from "react-router-dom";
import LoginScreen from "../app/auth/LoginScreen";
import RegisterScreen from "../app/auth/RegisterScreen";
import HomeScreen from "../app/screen/home/HomeScreen";
import ProductScreen from "../app/screen/product/ProductScreen";
import { getToken } from "../app/service/StorageService";

export const AUTH_ROUTE = [
  {
    route: "/login",
    screen: <LoginScreen />,
  },
  {
    route: "/register",
    screen: <RegisterScreen />,
  },
];

export const PRIVATE_ROUTE = [
  {
    route: "/",
    screen: <HomeScreen />,
  },
  {
    route: "/product",
    screen: <ProductScreen />,
  },
];

export function PrivateRoute(props: { children: any }) {
  const { children } = props;
  return children;
}

export function AuthRoute(props: { children: any }) {
  const { children } = props;
  const token = getToken();
  return !token ? children : <Navigate replace to="/" />;
}
