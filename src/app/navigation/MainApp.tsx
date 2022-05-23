import { Route, Routes } from "react-router-dom";
import {
  AuthRoute,
  AUTH_ROUTE,
  PrivateRoute,
  PRIVATE_ROUTE,
} from "../../route/DefineRoute";

const MainApp = (props: { open: boolean }) => {
  return (
    // <main
    //   className={clsx(classes.content, {
    //     [classes.contentActive]: open,
    //   })}
    // >
    <Routes>
      {PRIVATE_ROUTE.map((e) => {
        return (
          <Route
            path={e.route}
            element={<PrivateRoute>{e.screen}</PrivateRoute>}
          />
        );
      })}
      {AUTH_ROUTE.map((e) => {
        return (
          <Route path={e.route} element={<AuthRoute>{e.screen}</AuthRoute>} />
        );
      })}
    </Routes>
    // </main>
  );
};
export default MainApp;
