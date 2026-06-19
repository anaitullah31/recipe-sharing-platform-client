"use client";

import { serverMutation } from "@/app/lib/core/server";
import { TrashBin } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteRecipe = ({ recipeId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteRecipe = async () => {
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete this recipe?",
    // );
    // if (!confirmed) return;

    try {
      setLoading(true);

      const data = await serverMutation(`/recipes/${recipeId}`, {}, "DELETE");

      if (data.success) {
        router.refresh(); // Refresh server component data
      } else {
        alert(data.message || "Failed to delete recipe");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDeleteRecipe}
      disabled={loading}
      className="cursor-pointer text-danger transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      title="Delete Recipe"
    >
      <Icon data={TrashBin} size={16} />
    </button>
  );
};

export default DeleteRecipe;
