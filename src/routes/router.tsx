import Index from "@/contactsRoutes";
import ErrorPage from "@/error-page";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Protected from "./protected";
import Login, { loginAction, loginLoader } from "./login";
import { logoutAction } from "./logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Outlet />}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route
         index 
         element={<Navigate to="/login" />}
         loader={loginLoader}
        />
        <Route
          path="/login"
          element={<Login />}
          loader={loginLoader}
          action={loginAction}
        />
        <Route
          path="/protected"
          element={<Protected />}
        />
        <Route
          path="/protected/logout"
          action={logoutAction}
        />
      </Route> 
    </Route>
  )
);

export default router