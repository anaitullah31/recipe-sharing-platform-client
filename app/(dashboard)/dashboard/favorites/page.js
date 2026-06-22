import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { getUserSession } from "@/app/lib/core/session";
import { fetchSecureData } from "@/app/lib/core/server";
import DeleteFavoriteButton from "./DeleteFavoriteButton";
import Pagination from "@/app/components/shared/Pagination";

const FavoritesPage = async ({ searchParams }) => {
  const user = await getUserSession();
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;

  const data = await fetchSecureData(
    `/favorites?userEmail=${user?.email}&page=${currentPage}&limit=${limit}`,
  );

  const favorites = data?.data || [];
  const pagination = data?.pagination || {};

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "N/A";

  return (
    <section className="min-h-screen bg-background px-4 pt-14 pb-8 text-foreground sm:px-6 sm:pt-16 sm:pb-10 lg:px-10 lg:pt-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h1 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            My Favorites
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
            Your personal collection of favorite recipes. Save the dishes you
            love, revisit them anytime, and discover inspiration for your next
            delicious meal.
          </p>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-8">
          <div className="self-start overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <div className="flex flex-col gap-2 border-b border-separator px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <h2 className="font-serif text-2xl">Favorite Recipes</h2>

              <p className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                {pagination?.total || 0} items saved
              </p>
            </div>

            <div className="hidden border-b border-separator bg-surface-secondary px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground xl:grid xl:grid-cols-[minmax(0,1fr)_150px_150px]">
              <span>Recipe</span>
              <span>Added Date</span>
              <span className="text-right">Actions</span>
            </div>

            <div>
              {favorites.map((favorite) => (
                <div
                  key={favorite._id}
                  className="border-b border-separator px-5 py-5 last:border-b-0 sm:px-6 xl:grid xl:grid-cols-[minmax(0,1fr)_150px_150px] xl:items-center xl:gap-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-secondary sm:h-20 sm:w-20">
                      <Image
                        src={
                          favorite.recipeImage ||
                          "/assests/recipe-placeholder.png"
                        }
                        alt={favorite.recipeName || "Recipe"}
                        fill
                        sizes="96px"
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="wrap-break-word font-serif text-xl leading-tight sm:text-2xl">
                        {favorite.recipeName}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {favorite.category && (
                          <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase text-accent">
                            {favorite.category}
                          </span>
                        )}

                        <span className="rounded-full bg-surface-secondary px-3 py-1 text-[10px] font-bold uppercase text-surface-secondary-foreground xl:hidden">
                          {formatDate(favorite.addedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="hidden text-sm text-surface-secondary-foreground xl:block">
                    {formatDate(favorite.addedAt)}
                  </p>

                  <div className="mt-5 flex items-center gap-3 xl:mt-0 xl:justify-end">
                    <Link
                      href={`/recipes/${favorite.recipeId}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-accent px-4 py-3 text-[10px] font-bold uppercase text-accent-foreground transition hover:bg-accent-hover sm:flex-none xl:py-2"
                    >
                      View Details
                      <Icon data={ArrowRight} size={13} />
                    </Link>

                    <DeleteFavoriteButton favoriteId={favorite._id} />
                  </div>
                </div>
              ))}
            </div>

            {favorites.length === 0 && (
              <div className="px-5 py-16 text-center sm:px-6">
                <h3 className="font-serif text-2xl">No favorites found</h3>
                <p className="mt-2 text-sm text-surface-secondary-foreground">
                  You have not saved any favorite recipes yet.
                </p>
              </div>
            )}

            {favorites.length > 0 && (
              <div className="border-t border-separator">
                <Pagination
                  pagination={pagination}
                  itemName="favorites"
                  limitOptions={[5, 8, 10, 20]}
                />
              </div>
            )}
          </div>

          <aside className="grid gap-6 md:grid-cols-3 xl:block xl:space-y-6">
            <div className="rounded-xl bg-accent p-6 text-accent-foreground lg:p-8">
              <h3 className="font-serif text-2xl">Cooking Tonight?</h3>

              <p className="mt-4 text-sm leading-6 opacity-80">
                Get a generated shopping list based on your favorite recipes in
                one click.
              </p>

              <button className="mt-6 w-full rounded bg-foreground px-5 py-3 text-xs font-bold uppercase text-background">
                Generate List
              </button>
            </div>

            <div className="rounded-xl bg-surface-secondary p-6 lg:p-8">
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                Popular Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {["Italian", "Quick", "Gourmet", "Seafood"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface px-3 py-1 text-[10px] font-bold uppercase text-surface-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative h-64 overflow-hidden rounded-xl md:h-auto md:min-h-64 xl:h-64">
              <Image
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
                alt="Editorial"
                fill
                sizes="(max-width: 1280px) 100vw, 300px"
                unoptimized
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-bold uppercase">New Editorial</p>
                <h3 className="mt-1 font-serif text-2xl">The Art of Plating</h3>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FavoritesPage;
