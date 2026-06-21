import { fetchData } from "@/app/lib/core/server";
import RecipeCard from "./RecipeCard";
import { Magnifier } from "@gravity-ui/icons";

const RecipePage = async () => {
  const recipesData = await fetchData("/recipes");
  const recipes = recipesData?.data || [];

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">
          <h1 className="mt-4 font-serif text-5xl leading-tight md:text-5xl">
            Culinary Collections
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-surface-secondary-foreground">
            Explore our curated library of professional techniques, seasonal
            inspirations, and signature plates from the world finest digital
            atelier.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border border-border bg-surface px-4 py-3 shadow-sm lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-2">
            <Magnifier
              size={16}
              className="text-surface-secondary-foreground"
            />

            <input
              type="text"
              placeholder="Search recipes, ingredients, or chefs..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-surface-secondary-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <select className="border-l border-border bg-transparent px-4 py-1 outline-none">
              <option>Category</option>
            </select>

            <select className="border-l border-border bg-transparent px-4 py-1 outline-none">
              <option>Cuisine</option>
            </select>

            <select className="border-l border-border bg-transparent px-4 py-1 outline-none">
              <option>Difficulty</option>
            </select>

            <select className="border-l border-border bg-transparent px-4 py-1 outline-none">
              <option>Sort By</option>
            </select>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="mt-16 text-center">
            <h3 className="font-serif text-2xl">No recipes found</h3>
            <p className="mt-2 text-sm text-surface-secondary-foreground">
              Please try again later.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default RecipePage;
