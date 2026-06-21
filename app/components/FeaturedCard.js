import Image from "next/image";
import Link from "next/link";
import { Icon } from "@gravity-ui/uikit";
import { Clock } from "@gravity-ui/icons";

const FeaturedCard = ({ recipe }) => {
  if (!recipe) {
    return null;
  }
  const {
    _id,
    recipeName,
    recipeImage,
    preparationTime = 30,
    difficulty = "Beginner",
  } = recipe;

  return (
    <Link href={`/recipes/${_id}`} className="group block">
      <article>
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={recipeImage}
            alt={recipeName}
            width={500}
            height={600}
            className="h-107.5 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-accent shadow">
            ★ Featured
          </span>
        </div>

        <div className="mt-4">
          <h3 className="font-serif text-2xl leading-tight text-foreground transition group-hover:text-accent">
            {recipeName}
          </h3>

          <div className="mt-3 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-foreground">
            <span className="flex items-center gap-1">
              <Icon data={Clock} size={13} />
              {preparationTime} Min
            </span>

            <span className="flex items-center gap-1">
              <Icon data={Clock} size={13} />
              {difficulty}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedCard;
