import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  NodesRight,
  Clock,
  ShoppingBasket,
} from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { fetchData } from "@/app/lib/core/server";
import LikeButton from "./LikeButton";
import { getUserSession } from "@/app/lib/core/session";
import FavoriteButton from "./FavoriteButton";

const RecipeDetails = async ({ params }) => {
  const user = await getUserSession();

  const { id } = await params;
  const recipe = await fetchData(`/recipes/${id}`);
  const favorites = await fetchData(`/favorites?userEmail=${user.email}`);
  const favoriteInfo = favorites?.data?.find(
    (favorite) => favorite.recipeId === recipe._id,
  );
  const {
    recipeName,
    recipeImage,
    category,
    cuisineType,
    difficultyLevel,
    preparationTime,
    ingredients = [],
    instructions = "",
    authorName,
    likesCount,
    isFeatured,
    _id,
  } = recipe || {};

  const steps = instructions
    .split(".")
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <div className="grid min-h-160 grid-cols-1 lg:grid-cols-12">
        {/* Left Content */}
        <div className="flex flex-col justify-center bg-surface-secondary px-6 py-12 lg:col-span-5 lg:px-16">
          <Link
            href="/recipes"
            className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-surface-secondary-foreground hover:text-accent"
          >
            <Icon data={ArrowLeft} size={16} />
            Recipe Details
          </Link>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">
            {isFeatured ? "Signature Series" : category}
          </p>

          <h1 className="max-w-md font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            {recipeName}
          </h1>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
              {authorName?.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-bold text-foreground">{authorName}</p>
              <p className="text-xs text-surface-secondary-foreground">
                {cuisineType} Recipe Creator
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-5 border-y border-separator py-5 text-surface-secondary-foreground">
            <LikeButton recipe={recipe} userEmail={user?.email} />

            <button className="hover:text-accent">
              <Icon data={Bookmark} size={17} />
            </button>

            <button className="hover:text-accent">
              <Icon data={NodesRight} size={17} />
            </button>

            <FavoriteButton
              recipe={recipe}
              user={user}
              initiallyFavorite={!!favoriteInfo}
              favoriteId={favoriteInfo?._id}
            />
          </div>

          <button className="mt-8 flex w-full max-w-md items-center justify-between rounded bg-accent px-6 py-4 text-sm font-bold text-accent-foreground shadow-lg transition hover:bg-accent-hover">
            <span>Purchase Full Recipe Guide</span>
            <span className="rounded bg-(--surface)/20 px-3 py-1">$4.99</span>
          </button>

          <p className="mt-3 max-w-md text-center text-xs italic text-surface-secondary-foreground">
            Includes video masterclass & sourcing guide
          </p>
        </div>

        {/* Right Image */}
        <div className="relative h-90 overflow-hidden bg-surface lg:col-span-7 lg:h-160">
          <Image
            src={recipeImage}
            alt={recipeName || "Recipe image"}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:px-16">
        {/* Sidebar */}
        <aside className="space-y-8 lg:col-span-4">
          <div className="rounded-lg border border-border bg-surface p-8 text-surface-foreground">
            <h2 className="mb-6 font-serif text-2xl">Ingredients</h2>

            <ul className="space-y-4">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-surface-secondary-foreground"
                >
                  <span className="mt-1 h-4 w-4 rounded-full border border-(--field-border)" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-surface-secondary p-8">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
              Recipe Summary
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <SummaryItem label="Minutes" value={preparationTime} />
              <SummaryItem label="Difficulty" value={difficultyLevel} />
              <SummaryItem label="Cuisine" value={cuisineType} />
              <SummaryItem label="Category" value={category} />
            </div>
          </div>
        </aside>

        {/* Instructions */}
        <article className="lg:col-span-8">
          <div className="mb-10 flex flex-wrap items-center gap-5 text-sm text-surface-secondary-foreground">
            <span className="flex items-center gap-2">
              <Icon data={Clock} size={17} />
              Prep: {preparationTime}m
            </span>

            <span className="text-separator">|</span>

            <span className="flex items-center gap-2">
              <Icon data={Clock} size={17} />
              Difficulty: {difficultyLevel}
            </span>

            <span className="text-separator">|</span>

            <span className="flex items-center gap-2">
              <Icon data={ShoppingBasket} size={17} />
              Cuisine: {cuisineType}
            </span>
          </div>

          <div className="space-y-10">
            {steps.map((step, index) => (
              <section key={index} className="flex gap-6">
                <div className="select-none font-serif text-7xl leading-none text-(--accent)/20">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="pt-2">
                  <h3 className="mb-3 font-serif text-2xl text-foreground">
                    Step {index + 1}
                  </h3>

                  <p className="max-w-3xl text-base leading-8 text-surface-secondary-foreground">
                    {step}.
                  </p>

                  {index === steps.length - 1 && (
                    <div className="mt-6 flex items-center justify-between border-l-4 border-accent bg-surface-secondary px-5 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Icon data={Clock} size={17} />
                        Cooking Timer - {preparationTime}:00
                      </div>

                      <button className="rounded bg-accent px-4 py-2 text-[10px] font-bold uppercase text-accent-foreground hover:bg-accent-hover">
                        Start Timer
                      </button>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

const SummaryItem = ({ label, value }) => {
  return (
    <div>
      <p className="font-serif text-2xl text-accent">{value}</p>
      <p className="text-[10px] font-bold uppercase text-surface-secondary-foreground">
        {label}
      </p>
    </div>
  );
};

export default RecipeDetails;
