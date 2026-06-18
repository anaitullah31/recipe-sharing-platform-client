"use client";

import { serverMutation } from "@/app/lib/core/server";
import { Flag } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useState } from "react";

const FavoriteButton = ({
  recipe,
  user,
  favoriteId,
  initiallyFavorite = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);
  const [currentFavoriteId, setCurrentFavoriteId] = useState(
    favoriteId || null,
  );

  const handleFavorite = async () => {
    if (!user?.email) {
      alert("Please login first");
      return;
    }

    const previousFavorite = isFavorite;
    const previousFavoriteId = currentFavoriteId;

    try {
      setLoading(true);

      if (isFavorite) {
        const data = await serverMutation(
          `/favorites/${currentFavoriteId}`,
          {},
          "DELETE",
        );

        if (data.success) {
          setIsFavorite(false);
          setCurrentFavoriteId(null);
        } else {
          alert(data.message || "Failed to remove favorite");
        }

        return;
      }

      const favoriteData = {
        userEmail: user.email,
        userId: user?.id || null,
        recipeId: recipe._id,
        recipeName: recipe.recipeName,
        recipeImage: recipe.recipeImage,
      };

      const data = await serverMutation("/favorites", favoriteData, "POST");

      if (data.success) {
        setIsFavorite(true);
        setCurrentFavoriteId(data.insertedId);
      } else {
        alert(data.message || "Failed to add favorite");
      }
    } catch (error) {
      setIsFavorite(previousFavorite);
      setCurrentFavoriteId(previousFavoriteId);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      className={`ml-auto cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-60 ${
        isFavorite ? "text-danger" : "hover:text-danger"
      }`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Icon data={Flag} size={17} />
    </button>
  );
};

export default FavoriteButton;
