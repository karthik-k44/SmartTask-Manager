const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-3 text-gray-600">
          This page is protected and only accessible to users with admin privileges.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <p className="mt-2 text-sm text-gray-600">
              View all users, update roles, or delete users from the application.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">System Analytics</h2>
            <p className="mt-2 text-sm text-gray-600">
              Monitor task activity, access logs, and admin-only statistics.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Admin Actions</h2>
            <p className="mt-2 text-sm text-gray-600">
              Create or remove users and manage application permissions securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
