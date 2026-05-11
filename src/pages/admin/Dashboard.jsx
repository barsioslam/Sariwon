import { AdminLayout } from "../../layouts/AdminLayout";

function Dashboard() {
  return (
    <AdminLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-lg text-gray-700">
          Manage your administrative tasks and monitor the server.
        </p>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
