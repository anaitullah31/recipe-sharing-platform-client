"use client";
import { Heart } from "@gravity-ui/icons";
import { Card, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  const {
    recipeName,
    recipeImage,
    likesCount,
    authorName,
    cuisineType,
    category,
    preparationTime,
    _id,
  } = recipe;

  return (
    <Card className="w-full overflow-hidden rounded-md">
      <div className="relative h-55 w-full rounded-md overflow-hidden">
        <Image
          src={recipeImage}
          alt={recipeName}
          width={500}
          height={300}
          className="h-55 w-full object-cover transition duration-300 hover:scale-105"
        />

        <button className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur">
          <Heart size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Card.Header className="flex flex-col items-start gap-2 p-0">
          <div className="flex flex-wrap gap-2">
            <Chip color="warning" variant="flat" size="sm">
              {category}
            </Chip>

            <Chip color="success" variant="flat" size="sm">
              {cuisineType}
            </Chip>
          </div>

          <Card.Title>{recipeName}</Card.Title>

          <Card.Description>
            Prepared by {authorName}. This recipe takes approximately{" "}
            {preparationTime || 30} minutes to prepare.
          </Card.Description>
        </Card.Header>

        <Card.Footer className="mt-auto flex items-center justify-between p-0 pt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">
              {likesCount}
            </span>
            <span className="text-xs text-muted-foreground">Likes</span>
          </div>

          <Link
            href={`/recipes/${_id}`}
            className=" inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent  text-white font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300
  "
          >
            View Recipe
          </Link>
        </Card.Footer>
      </div>
    </Card>
  );
};

export default RecipeCard;
