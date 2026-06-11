import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components';
import { ProtectedNavbar } from '../../constants/navbar';
import { useEffect, useState } from 'react';
import { NavbarItemsEnum, NavType } from '../../types/navbar';
import { ROUTES } from '../../routes/types';
import Tasks from './tasks';
import { useAppDispatch } from '../../redux/hook';
import { GetUserById } from '../../redux/action';
import UserPage from './user';

const PortalPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [isActiveNavItem, setIsActiveNavItem] = useState<NavbarItemsEnum>(NavbarItemsEnum.TASKS);

  useEffect(() => {
    dispatch(GetUserById());
    dispatch(GetUserById());
  }, []);

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
        navType={NavType.PROTECTED}
        onLoginClick={handleLogout}
        navbarItems={ProtectedNavbar}
        setIsActiveNavItem={handleNavChange}
        isActiveNavItem={isActiveNavItem}
      />

      <div className="pt-24 pb-36 px-4 md:pt-28 md:pb-24 md:px-6 lg:px-8">
        {isActiveNavItem === NavbarItemsEnum.USERS && <UserPage />}
        {isActiveNavItem === NavbarItemsEnum.TASKS && <Tasks />}
      </div>
    </>
  );
};

export default PortalPage;
