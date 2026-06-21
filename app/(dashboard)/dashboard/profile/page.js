import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, FileArrowUp } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { getUserSession } from "@/app/lib/core/session";
import { fetchData } from "@/app/lib/core/server";
import ProfileUpdateForm from "./ProfileUpdateForm";

const ProfilePage = async () => {
  const user = await getUserSession();

  const recipesData = await fetchData(`/recipes?authorEmail=${user?.email}`);
  const recipes = recipesData?.data || [];

  const favoritesData = await fetchData(`/favorites?userEmail=${user?.email}`);
  const favorites = favoritesData?.data || [];

  return (
    <section className="min-h-screen bg-background px-6 py-14 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-center gap-8">
          <div className="relative h-36 w-36 overflow-hidden rounded-lg border border-border bg-surface-secondary">
            <Image
              src={user?.image || "/assests/profile.png"}
              alt={user?.name || "User"}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-5xl leading-tight md:text-5xl">
                {user?.name || "User Profile"}
              </h1>

              {user?.plan === "premium" && (
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase text-accent-foreground">
                  Premium Member
                </span>
              )}
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-surface-secondary-foreground">
              Member of RecipeHub. Curator of culinary creations and passionate
              recipe explorer.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-8">
            <ProfileUpdateForm user={user} />
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-surface-secondary p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Current Plan
              </p>

              <div className="mt-2 flex items-center justify-between">
                <h3 className="font-serif text-3xl capitalize">
                  {user?.plan === "premium" ? "RecipeHub Premium" : "Free Plan"}
                </h3>

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    user?.plan === "premium"
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface text-surface-secondary-foreground"
                  }`}
                >
                  <Icon data={Star} size={16} />
                </span>
              </div>

              {user?.plan === "premium" ? (
                <>
                  <div className="mt-4 inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    ✓ Premium Membership Active
                  </div>

                  <ul className="mt-8 space-y-4 text-sm text-surface-secondary-foreground">
                    <li>⊙ Unlimited recipe submissions</li>
                    <li>⊙ Premium chef profile badge</li>
                    <li>⊙ Early access to masterclasses</li>
                    <li>⊙ Ad-free RecipeHub experience</li>
                    <li>⊙ Priority support access</li>
                  </ul>

                  <Link
                    href="/dashboard/subscription"
                    className="mt-8 flex items-center justify-center gap-2 border border-accent px-6 py-4 text-xs font-bold uppercase text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Manage Membership
                    <Icon data={ArrowRight} size={14} />
                  </Link>

                  <p className="mt-4 text-center text-xs text-surface-secondary-foreground">
                    Your premium membership is currently active.
                  </p>
                </>
              ) : (
                <>
                  <ul className="mt-8 space-y-4 text-sm text-surface-secondary-foreground">
                    <li>⊙ Add up to 2 recipes</li>
                    <li>⊙ Save up to 5 favorite recipes</li>
                    <li>⊙ Access community features</li>
                    <li>⊙ Upgrade anytime for premium benefits</li>
                  </ul>

                  <Link
                    href="/pricing"
                    className="mt-8 flex items-center justify-center gap-2 bg-accent px-6 py-4 text-xs font-bold uppercase text-accent-foreground hover:bg-accent-hover"
                  >
                    Upgrade to Premium
                    <Icon data={ArrowRight} size={14} />
                  </Link>

                  <p className="mt-4 text-center text-xs text-surface-secondary-foreground">
                    Unlock unlimited recipes, premium badge, and exclusive
                    content.
                  </p>
                </>
              )}
            </div>

            <div className="border border-border bg-surface-secondary p-8">
              <h3 className="font-serif text-2xl">My Atelier</h3>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-surface p-6 text-center">
                  <p className="font-serif text-3xl text-accent">
                    {recipes.length}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase text-surface-secondary-foreground">
                    Recipes
                  </p>
                </div>

                <div className="bg-surface p-6 text-center">
                  <p className="font-serif text-3xl text-accent">
                    {favorites.length}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase text-surface-secondary-foreground">
                    Saved
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
