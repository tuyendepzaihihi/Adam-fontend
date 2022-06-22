import { Navigate } from "react-router";
import BranchScreen from "../app/admin/branch/OrderScreen";
import CategoryScreen from "../app/admin/category/CategoryScreen";
import DashboardScreen from "../app/admin/dashboard/DashboardScreen";
import MaterialScreen from "../app/admin/material/MaterialScreen";
import OptionScreen from "../app/admin/option/OptionScreen";
import ProductAdminScreen from "../app/admin/product/ProductAdminScreen";
import TagScreen from "../app/admin/tag/TagScreen";
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
  {
    route: ROUTE_ADMIN.CATEGORY,
    screen: <CategoryScreen />,
  },
  {
    route: ROUTE_ADMIN.VOUCHER,
    screen: <VoucherScreen />,
  },
  {
    route: ROUTE_ADMIN.MATERIAL,
    screen: <MaterialScreen />,
  },
  {
    route: ROUTE_ADMIN.ORDER,
    screen: <BranchScreen />,
  },
  {
    route: ROUTE_ADMIN.TAG,
    screen: <TagScreen />,
  },
  {
    route: ROUTE_ADMIN.OPTION,
    screen: <OptionScreen />,
  },
];

export function PrivateRouteAdmin(props: { children: any; isAdmin?: boolean }) {
  const { children, isAdmin } = props;
  const token = getToken();
  return children;
  return token && isAdmin ? children : <Navigate replace to={ROUTE.LOGIN} />;
}
