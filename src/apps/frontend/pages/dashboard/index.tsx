import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components';
import { ProtectedNavbar } from '../../constants/navbar';
import { useEffect, useState } from 'react';
import { NavbarItemsEnum, NavType } from '../../types/navbar';
import { ROUTES } from '../../routes/types';
import Home from './home';
import Tasks from './tasks';
import { useAppDispatch } from '../../redux/hook';
import { GetUserById } from '../../redux/action';

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

      <div className="py-20">
        {isActiveNavItem === NavbarItemsEnum.HOME && <Home />}
        {isActiveNavItem === NavbarItemsEnum.TASKS && <Tasks />}
      </div>
    </>
  );
};

export default PortalPage;
