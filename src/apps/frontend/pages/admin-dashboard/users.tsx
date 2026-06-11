import { useEffect, useState } from "react";
import { DeleteUserByAdmin, GetAllUsers, GetUserById } from "../../redux/action";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import UserCards from "../../components/user-card";
import { DeletionPopup } from "../../components";
import toast from "react-hot-toast";

const Users = () => {
  const dispatch = useAppDispatch();
  const { getAllUsersSuccess, getUserByIdData } = useAppSelector((state) => state.authUser);

  const [isOpen, setIsOpen] = useState(false);
  const [deletionId, setDeletionId] = useState('');

  const handleRefreshUsers = () => {
    dispatch(GetAllUsers());
  };

  useEffect(() => {
    handleRefreshUsers()
    dispatch(GetUserById());
  }, [dispatch]);

  const handleDeleteUser = async () => {
    if (!deletionId) {
      return;
    }
    try {
      await dispatch(DeleteUserByAdmin(deletionId)).unwrap();
      toast.success('User deleted successfully');
      setDeletionId('');
      await dispatch(GetAllUsers());
    } catch (error: unknown) {
      const errorMessage = typeof error === 'string'
        ? error
        : error instanceof Error
        ? error.message
        : 'Unable to delete user';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Registered users
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            All users are shown in a card layout with admin controls.
          </p>
        </div>
      </div>

      {getAllUsersSuccess?.length ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {getAllUsersSuccess.map((user) => (
            <UserCards
              key={user._id}
              user={user}
              setDeletionId={setDeletionId}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-200/30">
          <p className="text-lg font-semibold text-slate-900">No users found</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            No Users Found
          </p>
        </div>
      )}
      <DeletionPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={handleDeleteUser}
        title="Are you sure you want to delete this user?"
        isDeleteDisabled={deletionId === getUserByIdData?._id}
        disabledMessage={deletionId === getUserByIdData?._id ? "You cant delete your own account!" : undefined}
      />
    </div>
  );
};

export default Users;
