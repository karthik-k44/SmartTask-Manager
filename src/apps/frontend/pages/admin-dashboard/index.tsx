import { useNavigate } from "react-router-dom";
import { NavbarItemsEnum, NavType } from "../../types/navbar";
import { useState } from "react";
import { ROUTES } from "../../routes/types";
import { AdminNavbar } from "../../constants/navbar";
import { Navbar } from "../../components";
import Users from "./users";
import TasksOverview from "./tasks-overview";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isActiveNavItem, setIsActiveNavItem] = useState<NavbarItemsEnum>(
    NavbarItemsEnum.USERS,
  );

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate(ROUTES.LANDING);
  };

  const handleNavChange = (item: NavbarItemsEnum) => {
    setIsActiveNavItem(item);
  };
  return (
    <>
      <Navbar
        navType={NavType.ADMIN}
        onLoginClick={handleLogout}
        navbarItems={AdminNavbar}
        setIsActiveNavItem={handleNavChange}
        isActiveNavItem={isActiveNavItem}
      />
      <div className="pt-20 pb-60  px-4 md:pb-20 md:px-6 lg:px-8">
        {isActiveNavItem === NavbarItemsEnum.USERS && <Users />}
        {isActiveNavItem === NavbarItemsEnum.TASKS_OVERVIEW && <TasksOverview/>}
      </div>
    </>
  );
};

export default AdminDashboard;
