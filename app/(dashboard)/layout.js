import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { getUserSession } from "../lib/core/session";

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex">
        <DashboardSidebar />
        <main className="min-h-screen flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;