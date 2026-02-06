import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 admin-full py-8">
        <div className="grid lg:grid-cols-[200px_1fr] gap-6 admin-shell admin-shell-left">
          <AdminSidebar />
          <div className="glass-card p-6">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
