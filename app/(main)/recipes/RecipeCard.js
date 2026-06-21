"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";

const RecipeCard = ({ recipe }) => {
  if(!recipe) {
    return null
  }
  const {
    _id,
    recipeName,
    recipeImage,
    category,
    likesCount = 0,
    price = 0,
    cuisineType,
  } = recipe;

  return (
    <Link href={`/recipes/${_id}`} className="group block h-full">
      <article className="h-full bg-surface p-4">
        <div className="relative overflow-hidden">
          <Image
            src={recipeImage}
            alt={recipeName}
            width={500}
            height={250}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-3 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            {category}
          </p>

          <h3 className="font-serif text-2xl leading-tight text-foreground transition-colors group-hover:text-accent">
            {recipeName}
          </h3>

          <p className="line-clamp-2 text-sm text-surface-secondary-foreground">
            Explore authentic {cuisineType} flavors with detailed preparation
            techniques and professional cooking guidance.
          </p>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Icon data={Heart} size={16} />
              <span className="text-sm font-medium">
                {likesCount.toLocaleString()}
              </span>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-surface-secondary-foreground">
                Price
              </p>

              <p className="text-lg font-bold text-foreground">${price}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
