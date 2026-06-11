import { Route, Routes } from "react-router-dom"
import PublicRoute from "./public-routes"
import { ROUTES } from "./types"
import LandingPage from "../pages/landing-page";
import ProtectedRoute from "./protected-routes";
import PortalPage from "../pages/dashboard";
import AdminDashboard from "../pages/admin-dashboard";
import AdminRoute from "./admin-route";

const  AppRouter = () =>{
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.PORTAL} element={<PortalPage />} />

        <Route element={<AdminRoute />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter