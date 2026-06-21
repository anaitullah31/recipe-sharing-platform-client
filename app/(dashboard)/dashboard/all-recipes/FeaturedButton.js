"use client";

import { clientMutation } from "@/app/lib/core/client";
import { Star } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FeaturedButton = ({ recipe }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(recipe?.isFeatured || false);

  const handleFeatured = async () => {
    try {
      setLoading(true);

      const data = await clientMutation(
        `/recipes/${recipe._id}`,
        {
          action: "feature",
        },
        "PATCH",
      );

      if (data.success) {
        setIsFeatured(data.isFeatured);
        router.refresh();
      } else {
        alert(data.message || "Failed to update featured status");
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
      onClick={handleFeatured}
      disabled={loading}
      className={`cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-50 ${
        isFeatured
          ? "text-warning"
          : "text-surface-secondary-foreground hover:text-warning"
      }`}
      title={isFeatured ? "Remove from featured" : "Mark as featured"}
    >
      <Icon data={Star} size={16} />
    </button>
  );
};

export default FeaturedButton;
