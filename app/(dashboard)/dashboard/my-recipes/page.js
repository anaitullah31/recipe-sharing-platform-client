import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@gravity-ui/uikit";
import {
  CheckShape,
  Pencil,
  Plus,
  SquareChartColumn,
  Star,
} from "@gravity-ui/icons";
import { getUserSession } from "@/app/lib/core/session";
import DeleteRecipe from "../all-recipes/DeleteRecipe";
import { fetchSecureData } from "@/app/lib/core/server";
import Pagination from "@/app/components/shared/Pagination";

const MyRecipes = async ({ searchParams }) => {
  const user = await getUserSession();

  if (!user?.email) {
    redirect("/login");
  }

  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const data = await fetchSecureData(
    `/recipes?authorEmail=${user.email}&page=${currentPage}&limit=${limit}`,
  );

  const recipes = data?.data || [];
  const pagination = data?.pagination || {};

  const totalRecipes = pagination?.total || 0;

  const publishedRecipes = recipes.filter(
    (recipe) => recipe.status === "published",
  ).length;

  const featuredRecipes = recipes.filter(
    (recipe) => recipe.isFeatured === true,
  ).length;

  return (
    <section className="min-h-screen bg-background px-4 pt-14 pb-8 text-foreground sm:px-6 sm:pt-16 sm:pb-10 lg:px-10 lg:pt-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            My Recipes
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
            Manage your personal recipe collection. Edit, review, and organize
            the dishes you have shared with the RecipeHub community.
          </p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:mb-8 xl:grid-cols-3 xl:gap-6">
          <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground sm:text-xs">
                  Total Recipes
                </p>
                <h2 className="mt-2 font-serif text-3xl text-accent sm:text-4xl">
                  {totalRecipes}
                </h2>
              </div>
              <Icon
                data={SquareChartColumn}
                size={38}
                className="shrink-0 text-border"
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground sm:text-xs">
                  Published
                </p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                  {publishedRecipes}
                </h2>
              </div>
              <Icon data={CheckShape} size={38} className="shrink-0 text-border" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 sm:col-span-2 sm:p-6 xl:col-span-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground sm:text-xs">
                  Featured
                </p>
                <h2 className="mt-2 font-serif text-3xl text-link sm:text-4xl">
                  {featuredRecipes}
                </h2>
              </div>
              <Icon data={Star} size={38} className="shrink-0 text-border" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="border-b border-separator bg-surface-secondary p-5">
            <div className="grid gap-3 lg:grid-cols-[180px_160px_minmax(0,1fr)_auto] lg:items-center">
              <select className="h-10 w-full rounded border border-border bg-surface px-4 text-xs font-semibold outline-none">
                <option>All Categories</option>
              </select>

              <select className="h-10 w-full rounded border border-border bg-surface px-4 text-xs font-semibold outline-none">
                <option>Status: All</option>
              </select>

              <input
                type="text"
                placeholder="Search my recipes..."
                className="h-10 w-full rounded border border-border bg-surface px-4 text-sm outline-none placeholder:text-surface-secondary-foreground focus:border-accent"
              />

              <Link
                href="/dashboard/add-recipe"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-accent px-5 text-xs font-bold uppercase text-accent-foreground transition hover:bg-accent-hover lg:w-auto"
              >
                <Icon data={Plus} size={14} />
                Create Recipe
              </Link>
            </div>
          </div>

          <div className="hidden border-b border-separator bg-surface-secondary px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground xl:grid xl:grid-cols-[minmax(0,2fr)_1fr_1fr_0.8fr_0.7fr_1fr]">
            <span>Recipe Name</span>
            <span>Category</span>
            <span>Status</span>
            <span>Featured</span>
            <span>Likes</span>
            <span className="text-right">Actions</span>
          </div>

          {recipes.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-6">
              <h3 className="font-serif text-2xl">No recipes found</h3>
              <p className="mt-2 text-sm text-surface-secondary-foreground">
                You have not added any recipes yet.
              </p>

              <Link
                href="/dashboard/add-recipe"
                className="mt-6 inline-flex items-center justify-center rounded bg-accent px-5 py-3 text-xs font-bold uppercase text-accent-foreground transition hover:bg-accent-hover"
              >
                Add Your First Recipe
              </Link>
            </div>
          ) : (
            recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="border-b border-separator px-5 py-5 last:border-b-0 sm:px-6 xl:grid xl:grid-cols-[minmax(0,2fr)_1fr_1fr_0.8fr_0.7fr_1fr] xl:items-center xl:gap-4"
              >
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-secondary sm:h-16 sm:w-20">
                    <Image
                      src={
                        recipe.recipeImage || "/assets/recipe-placeholder.png"
                      }
                      alt={recipe.recipeName || "Recipe"}
                      fill
                      sizes="96px"
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="wrap-break-word font-serif text-xl leading-tight sm:text-lg">
                      {recipe.recipeName}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-xs text-surface-secondary-foreground">
                      ID: #{recipe._id}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 xl:hidden">
                      <span className="rounded-full bg-surface-secondary px-3 py-1 text-[10px] font-bold uppercase text-surface-secondary-foreground">
                        {recipe.category || "Uncategorized"}
                      </span>

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                          recipe.status === "published"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            recipe.status === "published"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        />
                        {recipe.status || "draft"}
                      </span>

                      <span className="rounded-full bg-surface-secondary px-3 py-1 text-[10px] font-bold uppercase text-surface-secondary-foreground">
                        {recipe.likesCount || 0} Likes
                      </span>

                      {recipe.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-3 py-1 text-[10px] font-bold uppercase text-warning">
                          <Icon data={Star} size={12} />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden xl:block">
                  <span className="bg-surface-secondary px-3 py-1 text-[10px] font-bold uppercase text-surface-secondary-foreground">
                    {recipe.category || "Uncategorized"}
                  </span>
                </div>

                <div className="hidden xl:block">
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
                    {recipe.status || "draft"}
                  </span>
                </div>

                <div className="hidden xl:block">
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

                <p className="hidden text-sm text-surface-secondary-foreground xl:block">
                  {recipe.likesCount || 0}
                </p>

                <div className="mt-5 flex items-center justify-end gap-4 xl:mt-0">
                  <Link
                    href={`/dashboard/edit-recipe/${recipe._id}`}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded border border-border text-xs font-bold uppercase text-surface-secondary-foreground transition hover:border-accent hover:text-accent sm:flex-none sm:px-4 xl:h-auto xl:border-none xl:p-0"
                    title="Edit Recipe"
                  >
                    <span className="mr-2 xl:hidden">Edit</span>
                    <Icon data={Pencil} size={16} />
                  </Link>

                  <DeleteRecipe recipeId={recipe._id} />
                </div>
              </div>
            ))
          )}

          {recipes.length > 0 && (
            <div className="border-t border-separator">
              <Pagination
                pagination={pagination}
                itemName="recipes"
                limitOptions={[5, 8, 10, 20]}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyRecipes;