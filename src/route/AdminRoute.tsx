import DashboardScreen from "../app/admin/dashboard/DashboardScreen";
import ProductAdminScreen from "../app/admin/product/ProductAdminScreen";
import UserScreen from "../app/admin/user/UserScreen";
import { ROUTE_ADMIN } from "../app/contant/Contant";

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
