import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { fetchData } from "../lib/core/server";
import PopularRecipesCarousel from "./PopularRecipesCarousel";

const PopularRecipesSection = async () => {
  const popularData = await fetchData("/recipes?popular=true&limit=6");
  const popularRecipes = popularData?.data || [];

  return (
    <section className="bg-background px-4 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-4xl leading-tight text-foreground">
              Community Favorites
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-surface-secondary-foreground">
              The most celebrated recipes and dishes as chosen by our global
              community of food lovers.
            </p>
          </div>

          <Link
            href="/recipes"
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent transition hover:gap-5"
          >
            View All Recipes
            <Icon data={ArrowRight} size={14} />
          </Link>
        </div>

        <PopularRecipesCarousel recipes={popularRecipes} />
      </div>
    </section>
  );
};

export default PopularRecipesSection;
