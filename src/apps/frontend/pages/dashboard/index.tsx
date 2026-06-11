import { useNavigate } from 'react-router-dom';
import { Navbar, Spinner } from '../../components';
import { ProtectedNavbar } from '../../constants/navbar';
import { useEffect, useState } from 'react';
import { NavbarItemsEnum, NavType } from '../../types/navbar';
import { ROUTES } from '../../routes/types';
import Tasks from './tasks';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { GetUserById } from '../../redux/action';
import UserPage from './user';
import { UserStatus } from '../../types/user-authentication';
import { AlertTriangle, LogOut } from 'lucide-react';

const PortalPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { getUserByIdData, getUserByIdLoading } = useAppSelector((state) => state.authUser);

  const [isActiveNavItem, setIsActiveNavItem] = useState<NavbarItemsEnum>(NavbarItemsEnum.TASKS);

  useEffect(() => {
    dispatch(GetUserById());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate(ROUTES.LANDING);
  };

  const handleNavChange = (item: NavbarItemsEnum) => {
    setIsActiveNavItem(item);
  };

  if (getUserByIdLoading)
  {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if(getUserByIdData?.userStatus === UserStatus.INACTIVE)
  {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-[2rem] border border-rose-200 bg-white p-8 text-center shadow-lg shadow-rose-100/50">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
            <AlertTriangle className="h-8 w-8 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Account Inactive</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Your account is currently inactive. Please contact the administrator
            for further assistance to restore your access.
          </p>
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
