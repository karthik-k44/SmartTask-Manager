import { useAppSelector } from "../../redux/hook";

const Home = () => {
  const getUserByIdData = useAppSelector((state) => state.authUser.getUserByIdData);

  return (
    <div className=" m-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/40">
      {!getUserByIdData?._id ? (
        <p className="text-sm text-slate-500">Loading user information...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-slate-900">
            Hello, {getUserByIdData.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Here is your profile summary.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Name</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {getUserByIdData.name}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {getUserByIdData.email}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Role</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {getUserByIdData.role}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
