"use client";

import { serverMutation } from "@/app/lib/core/server";
import { Heart } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { useState } from "react";

const LikeButton = ({ recipe, userEmail }) => {
  const [likesCount, setLikesCount] = useState(recipe?.likesCount || 0);
  const [liked, setLiked] = useState(
    recipe?.likedBy?.includes(userEmail) || false,
  );
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!userEmail || loading) return;

    const previousLiked = liked;
    const previousCount = likesCount;

    setLoading(true);
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      const data = await serverMutation(
        `/recipes/${recipe._id}`,
        { userEmail },
        "PATCH",
      );

      if (data.success) {
        setLiked(data.liked);
        setLikesCount(data.likesCount);
      } else {
        setLiked(previousLiked);
        setLikesCount(previousCount);
      }
    } catch (error) {
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
      className={`flex cursor-pointer items-center gap-2 transition hover:text-danger disabled:opacity-60 ${
        liked ? "text-danger" : ""
      }`}
    >
      <Icon data={Heart} size={17} />
      <span className="text-sm">{likesCount}</span>
    </button>
  );
};

export default LikeButton;
