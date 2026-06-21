import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { fetchData } from "../lib/core/server";
import FeaturedCarousel from "./FeaturedCarousel";

const FeaturedSection = async () => {
  const featuredData = await fetchData("/recipes?featured=true&limit=6");
  const featuredRecipes = featuredData?.data || [];

  return (
    <section className="border-y border-border bg-background px-4 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
              The Curated Collection
            </p>

            <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Featured Selections
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-surface-secondary-foreground">
              A hand-picked collection of seasonal recipes, community favorites,
              and premium dishes shared by passionate home cooks and chefs.
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

        <FeaturedCarousel recipes={featuredRecipes} />
      </div>
    </section>
  );
};

export default FeaturedSection;
