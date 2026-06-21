"use client";

import { clientMutation } from "@/app/lib/core/client";
import { Heart } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useState } from "react";

const LikeButton = ({ recipe, userEmail }) => {
  const [likesCount, setLikesCount] = useState(recipe?.likesCount || 0);
  const [liked, setLiked] = useState(
    recipe?.likedBy?.includes(userEmail) || false
  );
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!userEmail || loading) return;

    const previousLiked = liked;
    const previousCount = likesCount;

    setLoading(true);

    // Optimistic update
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      const data = await clientMutation(
        `/recipes/${recipe._id}`,
        {
          action: "like",
          userEmail,
        },
        "PATCH"
      );

      if (data.success) {
        setLiked(data.liked);
        setLikesCount(data.likesCount);
      } else {
        setLiked(previousLiked);
        setLikesCount(previousCount);
      }
    } catch (error) {
      console.error(error);

      setLiked(previousLiked);
      setLikesCount(previousCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex cursor-pointer items-center gap-2 transition disabled:opacity-60 ${
        liked
          ? "text-danger"
          : "hover:text-danger"
      }`}
    >
      <Icon data={Heart} size={17} />
      <span className="text-sm">{likesCount}</span>
    </button>
  );
};

export default LikeButton;