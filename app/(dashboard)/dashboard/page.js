import Image from "next/image";
import Link from "next/link";
import { Icon } from "@gravity-ui/uikit";
import { getUserSession } from "@/app/lib/core/session";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardOverviewPage = async () => {
  const currentUser = await getUserSession();

  if (currentUser?.role === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard user={currentUser} />;
};

export default DashboardOverviewPage;
