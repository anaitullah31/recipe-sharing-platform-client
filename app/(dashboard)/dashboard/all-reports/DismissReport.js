"use client";

import Swal from "sweetalert2";
import { serverMutation } from "@/app/lib/core/server";
import { useRouter } from "next/navigation";

const DismissReport = ({ reportId, status }) => {
  const router = useRouter();

  const handleDismissReport = async () => {
    const result = await Swal.fire({
      title: "Dismiss Report?",
      text: "This report will be marked as resolved and removed from pending review.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Dismiss",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#a45a00",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await serverMutation(`/reports/${reportId}`, {}, "PATCH");

      if (data.success) {
        await Swal.fire({
          title: "Report Dismissed",
          text: "The report has been marked as resolved.",
          icon: "success",
          confirmButtonColor: "#a45a00",
        });

        router.refresh();
      } else {
        Swal.fire({
          title: "Failed",
          text: data.message || "Failed to dismiss report.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error",
      });
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
