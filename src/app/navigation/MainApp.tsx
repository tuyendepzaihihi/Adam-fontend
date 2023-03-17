import { Route, Routes } from "react-router-dom";
import { PrivateRouteAdmin, PRIVATE_ROUTE_ADMIN } from "../../route/AdminRoute";
import {
  AuthRoute,
  AUTH_ROUTE
} from "../../route/DefineRoute";

const MainApp = () => {
  return (
    <Routes>
      {AUTH_ROUTE.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={<AuthRoute >{e.screen}</AuthRoute>}
            key={index}
          />
        );
      })}
      {PRIVATE_ROUTE_ADMIN.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={
              <PrivateRouteAdmin >{e.screen}</PrivateRouteAdmin>
            }
            key={index}
          />
        );
      })}
    </Routes>
  );
};
export default MainApp;
