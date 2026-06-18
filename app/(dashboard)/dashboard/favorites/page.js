import Image from "next/image";
import Link from "next/link";
import { TrashBin, ArrowRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { getUserSession } from "@/app/lib/core/session";
import { fetchData, serverMutation } from "@/app/lib/core/server";
import DeleteFavoriteButton from "./DeleteFavoriteButton";

const FavoritesPage = async () => {
  const user = await getUserSession();

  const data = await fetchData(`/favorites?userEmail=${user?.email}`);
  const favorites = data?.data;

  return (
    <section className="min-h-screen bg-background px-6 py-14 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h1 className="font-serif text-5xl md:text-6xl">My Favorites</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-surface-secondary-foreground">
            Your personal collection of favorite recipes. Save the dishes you
            love, revisit them anytime, and discover inspiration for your next
            delicious meal.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-2xl">Favorite Recipes</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
                {favorites.length} items saved
              </p>
            </div>

            <div className="hidden border-b border-separator pb-4 text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground md:grid md:grid-cols-[1fr_150px_140px]">
              <span>Recipe</span>
              <span>Added Date</span>
              <span className="text-right">Actions</span>
            </div>

            <div>
              {favorites.map((favorite) => (
                <div
                  key={favorite._id}
                  className="grid gap-4 border-b border-separator py-6 last:border-b-0 md:grid-cols-[1fr_150px_140px] md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-surface-secondary">
                      <Image
                        src={favorite.recipeImage}
                        alt={favorite.recipeName}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl leading-tight">
                        {favorite.recipeName}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-accent">
                        {favorite.category} • {favorite.preparationTime} mins
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-surface-secondary-foreground">
                    {new Date(favorite.addedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>

                  <div className="flex items-center justify-start gap-4 md:justify-end">
                    <Link
                      href={`/recipes/${favorite.recipeId}`}
                      className="inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-[10px] font-bold uppercase text-accent-foreground transition hover:bg-accent-hover"
                    >
                      View Details
                      <Icon data={ArrowRight} size={13} />
                    </Link>

                    <DeleteFavoriteButton favoriteId={favorite._id} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg bg-accent p-8 text-accent-foreground">
              <h3 className="font-serif text-2xl">Cooking Tonight?</h3>
              <p className="mt-4 text-sm leading-6 opacity-80">
                Get a generated shopping list based on your favorite recipes in
                one click.
              </p>

              <button className="mt-6 w-full rounded bg-foreground px-5 py-3 text-xs font-bold uppercase text-background">
                Generate List
              </button>
            </div>

            <div className="rounded-lg bg-surface-secondary p-8">
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

            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
                alt="Editorial"
                fill
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
