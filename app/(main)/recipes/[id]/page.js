import { fetchData } from "@/app/lib/core/server";
import { ArrowLeft, Clock, Flame, Heart, Printer, ShoppingCart, Star } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;
  const recipe = await fetchData(`/recipes/${id}`);

  const {
    recipeName,
    recipeImage,
    category,
    cuisineType,
    difficultyLevel,
    preparationTime,
    ingredients = [],
    instructions,
    authorName,
    likesCount,
    isFeatured,
  } = recipe;

  const instructionSteps = instructions
    ?.split(".")
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
          >
            <ArrowLeft size={18} />
            Recipe Details
          </Link>

          <div className="flex items-center gap-3 text-accent">
            <Printer size={18} />
            <Heart size={18} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left Content */}
          <div>
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <Image
                src={recipeImage}
                alt={recipeName}
                width={900}
                height={520}
                className="h-70 w-full object-cover md:h-105"
                priority
              />

              {isFeatured && (
                <span className="absolute right-4 top-4 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white shadow">
                  Featured Recipe
                </span>
              )}
            </div>

            {/* Title */}
            <div className="mt-8">
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
                {recipeName}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-sm text-foreground/60">Recipe by</p>
                  <p className="font-semibold text-foreground">{authorName}</p>
                </div>

                <div className="flex items-center gap-1 text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-foreground/70">
                    {likesCount} likes
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-(--success)/10 px-4 py-1.5 text-sm font-medium text-success">
                  {category}
                </span>
                <span className="rounded-full bg-(--accent)/10 px-4 py-1.5 text-sm font-medium text-accent">
                  {cuisineType}
                </span>
                <span className="rounded-full bg-(--warning)/10 px-4 py-1.5 text-sm font-medium text-warning">
                  {difficultyLevel}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 max-w-4xl">
              <p className="leading-8 text-foreground/70">
                This delicious {recipeName} is a flavorful {cuisineType} recipe
                perfect for {category.toLowerCase()}. It uses simple ingredients
                and can be prepared in around {preparationTime} minutes.
              </p>
            </div>

            {/* Instructions */}
            <div className="mt-12">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-2xl font-bold">Cooking Instructions</h2>

                <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-surface-hover">
                  <Printer size={16} />
                  Print Recipe
                </button>
              </div>

              <div className="space-y-8">
                {instructionSteps.map((step, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-bold">
                        Step {index + 1}
                      </h3>
                      <p className="max-w-4xl leading-7 text-foreground/70">
                        {step}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-surface p-5 shadow-sm">
              <div className="text-center">
                <Clock
                  className="mx-auto mb-2 text-accent"
                  size={20}
                />
                <p className="text-xs font-bold">TOTAL</p>
                <p className="text-xs text-foreground/60">
                  {preparationTime} min
                </p>
              </div>

              <div className="text-center">
                {/* <ChefHat
                  className="mx-auto mb-2 text-accent"
                  size={20}
                /> */}
                <p className="text-xs font-bold">DIFFICULTY</p>
                <p className="text-xs text-foreground/60">{difficultyLevel}</p>
              </div>

              <div className="text-center">
                <Flame
                  className="mx-auto mb-2 text-accent"
                  size={20}
                />
                <p className="text-xs font-bold">CUISINE</p>
                <p className="text-xs text-foreground/60">{cuisineType}</p>
              </div>
            </div>

            {/* Timer */}
            <div className="rounded-2xl bg-accent p-5 text-white shadow-sm">
              <p className="text-xs font-bold uppercase opacity-80">
                Cooking Timer
              </p>
              <div className="mt-2 flex items-center justify-between">
                <h3 className="text-3xl font-extrabold">
                  {preparationTime}:00
                </h3>
                <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-accent">
                  Start
                </button>
              </div>
            </div>

            {/* Ingredients */}
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <h2 className="mb-5 text-xl font-bold">Ingredients</h2>

              <ul className="space-y-3">
                {ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <span className="h-4 w-4 rounded-full border border-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:opacity-90">
                <ShoppingCart size={16} />
                Order Ingredients
              </button>

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-accent px-4 py-3 text-sm font-bold text-accent hover:bg-accent hover:text-white">
                <Heart size={16} />
                Save for Later
              </button>
            </div>

            {/* Author */}
            <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--accent)/10">
                {/* <ChefHat className="text-accent" size={30} /> */}
              </div>

              <h3 className="text-lg font-bold">Hi! I am {authorName}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/60">
                I create simple, delicious recipes that are easy to follow and
                perfect for everyday cooking.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default RecipeDetailsPage;
