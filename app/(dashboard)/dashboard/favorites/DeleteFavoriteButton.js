"use client";

import { serverMutation } from "@/app/lib/core/server";
import { TrashBin } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteFavoriteButton = ({ favoriteId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteFavorite = async () => {
    const confirmDelete = confirm("Remove this recipe from favorites?");
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const data = await serverMutation(
        `/favorites/${favoriteId}`,
        {},
        "DELETE",
      );

      if (data.success) {
        router.refresh();
      } else {
        alert(data.message || "Failed to remove favorite");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to remove favorite");
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
