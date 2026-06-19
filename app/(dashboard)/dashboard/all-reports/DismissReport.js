"use client"
import { serverMutation } from "@/app/lib/core/server";
import { useRouter } from "next/navigation";

const DismissReport = ({ reportId, status }) => {
  const router = useRouter();
  const handleDismissReport = async () => {
    const data = await serverMutation(`/reports/${reportId}`, {}, "PATCH");
    if (data.success) {
      router.refresh(); // Re-fetch server component data
    }
  };
  return (
   <button
  onClick={handleDismissReport}
  disabled={status === "resolved"}
  className={`border border-border px-4 py-2 text-xs font-semibold transition ${
    status === "resolved"
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer text-surface-secondary-foreground hover:bg-surface-hover"
  }`}
>
  {status === "resolved" ? "Resolved" : "Dismiss"}
</button>
  );
};

export default DismissReport;
