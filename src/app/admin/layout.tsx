import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is Admin dashboard layout.",
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="h-[calc(100vh-150px)] flex items-start justify-between overflow-hidden">
      <div className="h-full w-14 lg:w-1/6 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>

      <div className="h-full w-full lg:w-5/6 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
