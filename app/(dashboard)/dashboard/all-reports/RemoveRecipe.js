"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { clientMutation } from "@/app/lib/core/client";

const RemoveRecipe = ({ reportId, status }) => {
  const router = useRouter();

  const handleRemoveRecipe = async () => {
    const result = await Swal.fire({
      title: "Remove Recipe?",
      text: "This recipe will be permanently deleted and cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove It",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await clientMutation(`/recipes/${reportId}`, {}, "DELETE");

      if (data.success) {
        await Swal.fire({
          title: "Removed!",
          text: "Recipe has been removed successfully.",
          icon: "success",
          confirmButtonColor: "#a45a00",
        });

        router.refresh();
      } else {
        Swal.fire({
          title: "Failed",
          text: data.message || "Failed to remove recipe.",
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
      onClick={handleRemoveRecipe}
      disabled={status === "resolved"}
      className={`px-4 py-2 text-xs font-bold transition ${
        status === "resolved"
          ? "cursor-not-allowed bg-default text-default-foreground opacity-60"
          : "cursor-pointer bg-danger text-danger-foreground hover:opacity-90"
      }`}
    >
      Remove Recipe
    </button>
  );
};

export default RemoveRecipe;
