import { Navigate } from "react-router";
import DashboardScreen from "../app/admin/dashboard/DashboardScreen";
import ProductAdminScreen from "../app/admin/product/ProductAdminScreen";
import UserScreen from "../app/admin/user/UserScreen";
import { ROUTE, ROUTE_ADMIN } from "../app/contant/Contant";
import { getToken } from "../app/service/StorageService";

export const PRIVATE_ROUTE_ADMIN = [
  {
    route: ROUTE_ADMIN.DASHBOARD,
    screen: <DashboardScreen />,
  },
  {
    route: ROUTE_ADMIN.USER,
    screen: <UserScreen />,
  },
  {
    route: ROUTE_ADMIN.PRODUCT,
    screen: <ProductAdminScreen />,
  },
];

export function PrivateRouteAdmin(props: { children: any; isAdmin?: boolean }) {
  const { children, isAdmin } = props;
  const token = getToken();
  return token && isAdmin ? children : <Navigate replace to={ROUTE.LOGIN} />;
}
