"use client";

import { serverMutation } from "@/app/lib/core/server";
import { TrashBin } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const DeleteFavoriteButton = ({ favoriteId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteFavorite = async () => {
    const result = await Swal.fire({
      title: "Remove Favorite?",
      text: "This recipe will be removed from your favorites list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const data = await serverMutation(
        `/favorites/${favoriteId}`,
        {},
        "DELETE",
      );

      if (data.success) {
        await Swal.fire({
          title: "Removed!",
          text: "Recipe removed from your favorites.",
          icon: "success",
          confirmButtonColor: "#a45a00",
        });

        router.refresh();
      } else {
        Swal.fire({
          title: "Failed",
          text: data.message || "Failed to remove favorite",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: "Failed to remove favorite",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDeleteFavorite}
      disabled={loading}
      className="cursor-pointer text-surface-secondary-foreground transition hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon data={TrashBin} size={16} />
    </button>
  );
};

export default DeleteFavoriteButton;
