import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./types";

const AUTH_ROLE_STORAGE_KEY = "userRole";

const PublicRoute = () => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem(AUTH_ROLE_STORAGE_KEY);

  if (token) {
    if (userRole === "admin") {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }
    return <Navigate to={ROUTES.PORTAL} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
