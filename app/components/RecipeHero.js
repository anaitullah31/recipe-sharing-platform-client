import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";

const RecipeHero = () => {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 md:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
              Share • Discover • Cook
            </p>
          </div>

          <h1 className="font-serif text-5xl leading-none text-foreground md:text-7xl">
            Discover
            <br />
            <span className="ml-12 italic text-accent md:ml-20">
              Delicious Recipes
            </span>
          </h1>

          <div className="mt-8 max-w-md border-l border-accent/40 pl-5">
            <p className="text-sm italic leading-7 text-surface-secondary-foreground">
              Explore homemade recipes from passionate food lovers, save your
              favorites, share your own creations, and unlock premium dishes
              from talented chefs.
            </p>
          </div>

          <Link
            href="/recipes"
            className="mt-8 inline-flex items-center gap-3 bg-accent px-7 py-4 text-xs font-bold text-accent-foreground transition hover:bg-accent-hover"
          >
            Browse Recipes
            <Icon data={ArrowRight} size={15} />
          </Link>
        </div>

        <div className="relative mx-auto h-107.5 w-full max-w-140">
          <div className="absolute right-0 top-0 h-90 w-[82%] overflow-hidden rounded-md shadow-2xl">
            <Image
              src="/assets/hero.jpg"
              alt="Culinary dish"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute left-8 top-56 z-20 h-57.5 w-57.5 -rotate-2 overflow-hidden border-[7px] border-white bg-white shadow-2xl md:left-0 md:h-65 md:w-65">
            <Image
              src="/assets/hero2.jpg"
              alt="Kitchen atelier"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute right-40 top-10 z-30 flex h-20 w-20 rotate-14 items-center justify-center rounded-xl border-4 border-white bg-accent text-center text-[9px] font-bold uppercase leading-tight text-accent-foreground shadow-xl">
            New
            <br />
            Edition
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeHero;
