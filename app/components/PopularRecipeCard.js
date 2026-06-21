import Image from "next/image";
import Link from "next/link";
import { Heart } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";

const PopularRecipeCard = ({ recipe }) => {
  const { _id, recipeName, recipeImage, authorName, likesCount = 0 } = recipe;

  return (
    <Link href={`/recipes/${_id}`} className="group block">
      <article className="overflow-hidden rounded-sm border border-border bg-surface">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={recipeImage}
            alt={recipeName}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-sm bg-accent px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-accent-foreground">
            Popular
          </span>
        </div>

        <div className="p-4">
          <h3 className="min-h-18 font-serif text-2xl leading-none text-foreground transition group-hover:text-accent">
            {recipeName}
          </h3>

          <div className="mt-6 flex items-center justify-between text-[11px]">
            <span className="text-surface-secondary-foreground">
              Chef {authorName}
            </span>

            <span className="flex items-center gap-1 font-semibold text-accent">
              <Icon data={Heart} size={13} />
              {likesCount >= 1000
                ? `${(likesCount / 1000).toFixed(1)}k`
                : likesCount}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PopularRecipeCard;
