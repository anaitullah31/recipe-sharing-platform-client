import Image from "next/image";
import Link from "next/link";
import { Icon } from "@gravity-ui/uikit";
import {
  CheckShape,
  Pencil,
  Plus,
  SquareChartColumn,
  Star,
} from "@gravity-ui/icons";
import { fetchData } from "@/app/lib/core/server";
import DeleteRecipe from "./DeleteRecipe";
import FeaturedButton from "./FeaturedButton";
import { requireRole } from "@/app/lib/core/session";
import Pagination from "@/app/components/shared/Pagination";

const ManageRecipesPage = async ({ searchParams }) => {
  await requireRole("admin");

  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const data = await fetchData(`/recipes?page=${currentPage}&limit=${limit}`);

  const recipes = data?.data || [];
  const pagination = data?.pagination || {};

  const totalRecipes = pagination?.total || 0;

  const publishedRecipes = recipes.filter(
    (recipe) => recipe.status === "published",
  ).length;

  const featuredRecipes = recipes.filter((recipe) => recipe.isFeatured).length;

  return (
    <section className="min-h-screen bg-background px-6 py-10 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl">Manage Recipes</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
            Oversee your digital ateliers collection. Curate high-end culinary
            experiences and manage global recipe status.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                  Total Recipes
                </p>
                <h2 className="mt-2 font-serif text-4xl text-accent">
                  {totalRecipes}
                </h2>
              </div>
              <Icon
                data={SquareChartColumn}
                size={42}
                className="text-border"
              />
            </div>
          </div>

          <div className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                  Published On This Page
                </p>
                <h2 className="mt-2 font-serif text-4xl">{publishedRecipes}</h2>
              </div>
              <Icon data={CheckShape} size={42} className="text-border" />
            </div>
          </div>

          <div className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                  Featured On This Page
                </p>
                <h2 className="mt-2 font-serif text-4xl text-link">
                  {featuredRecipes}
                </h2>
              </div>
              <Icon data={Star} size={42} className="text-border" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-border bg-surface shadow-sm">
          <div className="flex flex-col gap-4 border-b border-separator bg-surface-secondary p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <select className="rounded border border-border bg-surface px-4 py-2 text-xs font-semibold outline-none">
                <option>All Chefs</option>
              </select>

              <select className="rounded border border-border bg-surface px-4 py-2 text-xs font-semibold outline-none">
                <option>All Categories</option>
              </select>

              <select className="rounded border border-border bg-surface px-4 py-2 text-xs font-semibold outline-none">
                <option>Status: All</option>
              </select>

              <input
                type="text"
                placeholder="Search recipe database..."
                className="h-10 w-full rounded border border-border bg-surface px-4 text-sm outline-none placeholder:text-surface-secondary-foreground focus:border-accent md:w-96"
              />
            </div>

            <Link
              href="/dashboard/add-recipe"
              className="inline-flex items-center justify-center gap-2 rounded bg-accent px-5 py-3 text-xs font-bold uppercase text-accent-foreground transition hover:bg-accent-hover"
            >
              <Icon data={Plus} size={14} />
              Create New Recipe
            </Link>
          </div>

          <div className="hidden grid-cols-[2fr_1.2fr_1fr_1fr_1fr_0.8fr_1fr] border-b border-separator bg-surface-secondary px-6 py-4 text-xs font-bold uppercase tracking-widest md:grid">
            <span>Recipe Name</span>
            <span>Chef</span>
            <span>Category</span>
            <span>Status</span>
            <span>Featured</span>
            <span>Likes</span>
            <span className="text-right">Actions</span>
          </div>

          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="grid gap-5 border-b border-separator px-6 py-5 last:border-b-0 md:grid-cols-[2fr_1.2fr_1fr_1fr_1fr_0.8fr_1fr] md:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded bg-surface-secondary">
                  <Image
                    src={recipe.recipeImage || "/assets/recipe-placeholder.png"}
                    alt={recipe.recipeName || "Recipe image"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-lg leading-tight">
                    {recipe.recipeName}
                  </h3>
                  <p className="mt-1 text-xs text-surface-secondary-foreground">
                    ID: #{recipe._id}
                  </p>
                </div>
              </div>

              <p className="text-sm text-surface-secondary-foreground">
                Chef {recipe.authorName}
              </p>

              <div>
                <span className="bg-surface-secondary px-3 py-1 text-[10px] font-bold uppercase text-surface-secondary-foreground">
                  {recipe.category}
                </span>
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-2 text-sm capitalize ${
                    recipe.status === "published"
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      recipe.status === "published"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  />
                  {recipe.status}
                </span>
              </div>

              <div>
                <Icon
                  data={Star}
                  size={18}
                  className={
                    recipe.isFeatured
                      ? "text-warning"
                      : "text-surface-tertiary-foreground"
                  }
                />
              </div>

              <p className="text-sm text-surface-secondary-foreground">
                {recipe.likesCount || 0}
              </p>

              <div className="flex items-center justify-end gap-4">
                <Link
                  href={`/dashboard/edit-recipe/${recipe._id}`}
                  className="text-surface-secondary-foreground transition hover:text-accent"
                  title="Edit Recipe"
                >
                  <Icon data={Pencil} size={16} />
                </Link>

                <FeaturedButton recipe={recipe} />

                <DeleteRecipe recipeId={recipe._id} />
              </div>
            </div>
          ))}

          {recipes.length === 0 && (
            <div className="px-6 py-16 text-center">
              <h3 className="font-serif text-2xl">No recipes found</h3>
              <p className="mt-2 text-sm text-surface-secondary-foreground">
                There are no recipes available right now.
              </p>
            </div>
          )}

          <Pagination
            pagination={pagination}
            itemName="recipes"
            limitOptions={[5, 8, 10, 20]}
          />
        </div>
      </div>
    </section>
  );
};

export default ManageRecipesPage;
