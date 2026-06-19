"use client";

import { serverMutation } from "@/app/lib/core/server";
import { useRouter } from "next/navigation";

const RemoveRecipe = ({ reportId, status }) => {
  const router = useRouter();
  const handleRemoveRecipe = async () => {
    const data = await serverMutation(`/recipes/${reportId}`, {}, "DELETE");
    if (data.success) {
      router.refresh(); // Re-fetch server component data
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
