"use client";

import { clientMutation } from "@/app/lib/core/client";
import { TrashBin } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const DeleteRecipe = ({ recipeId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleDeleteRecipe = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This recipe will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#777",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const data = await clientMutation(`/recipes/${recipeId}`, {}, "DELETE");

      if (data.success) {
        await Swal.fire({
          title: "Deleted!",
          text: "Recipe deleted successfully.",
          icon: "success",
          confirmButtonColor: "#a45a00",
        });

        router.refresh();
      } else {
        Swal.fire({
          title: "Failed",
          text: data.message || "Failed to delete recipe",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
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
