import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../types/user-authentication";
import { ROUTES } from "./types";
import { UserAuthenticationService } from "../services";

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const currentUser = await UserAuthenticationService.getUserById();
        setIsAdmin(currentUser.role === UserRole.ADMIN);
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Checking admin access...
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.PORTAL} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
