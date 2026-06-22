import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { getUserSession } from "@/app/lib/core/session";
import { fetchSecureData } from "@/app/lib/core/server";
import ProfileUpdateForm from "./ProfileUpdateForm";

const ProfilePage = async () => {
  const user = await getUserSession();

  const recipesData = await fetchSecureData(
    `/recipes?authorEmail=${user?.email}`
  );
  const recipes = recipesData?.data || [];

  const favoritesData = await fetchSecureData(
    `/favorites?userEmail=${user?.email}`
  );
  const favorites = favoritesData?.data || [];

  return (
    <section className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 sm:py-10 lg:px-10 xl:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col items-center gap-5 text-center sm:mb-10 sm:flex-row sm:items-center sm:gap-6 sm:text-left lg:mb-14 lg:gap-8">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-secondary sm:h-32 sm:w-32 lg:h-36 lg:w-36">
            <Image
              src={user?.image || "/assests/profile.png"}
              alt={user?.name || "User"}
              fill
              sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <h1 className="wrap-break-word font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
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

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-8">
          <div className="min-w-0 space-y-6 lg:space-y-8">
            <ProfileUpdateForm user={user} />
          </div>

          <aside className="space-y-6 lg:space-y-8">
            <div className="rounded-xl border border-border bg-surface-secondary p-5 sm:p-6 lg:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Current Plan
              </p>

              <div className="mt-3 flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl capitalize sm:text-3xl">
                  {user?.plan === "premium" ? "RecipeHub Premium" : "Free Plan"}
                </h3>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
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

                  <ul className="mt-6 space-y-3 text-sm leading-6 text-surface-secondary-foreground sm:mt-8 sm:space-y-4">
                    <li>⊙ Unlimited recipe submissions</li>
                    <li>⊙ Premium chef profile badge</li>
                    <li>⊙ Early access to masterclasses</li>
                    <li>⊙ Ad-free RecipeHub experience</li>
                    <li>⊙ Priority support access</li>
                  </ul>

                  <Link
                    href="/dashboard/subscription"
                    className="mt-6 flex w-full items-center justify-center gap-2 border border-accent px-5 py-4 text-xs font-bold uppercase text-accent transition hover:bg-accent hover:text-accent-foreground sm:mt-8"
                  >
                    Manage Membership
                    <Icon data={ArrowRight} size={14} />
                  </Link>

                  <p className="mt-4 text-center text-xs leading-5 text-surface-secondary-foreground">
                    Your premium membership is currently active.
                  </p>
                </>
              ) : (
                <>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-surface-secondary-foreground sm:mt-8 sm:space-y-4">
                    <li>⊙ Add up to 2 recipes</li>
                    <li>⊙ Save up to 5 favorite recipes</li>
                    <li>⊙ Access community features</li>
                    <li>⊙ Upgrade anytime for premium benefits</li>
                  </ul>

                  <Link
                    href="/pricing"
                    className="mt-6 flex w-full items-center justify-center gap-2 bg-accent px-5 py-4 text-xs font-bold uppercase text-accent-foreground transition hover:bg-accent-hover sm:mt-8"
                  >
                    Upgrade to Premium
                    <Icon data={ArrowRight} size={14} />
                  </Link>

                  <p className="mt-4 text-center text-xs leading-5 text-surface-secondary-foreground">
                    Unlock unlimited recipes, premium badge, and exclusive
                    content.
                  </p>
                </>
              )}
            </div>

            <div className="rounded-xl border border-border bg-surface-secondary p-5 sm:p-6 lg:p-8">
              <h3 className="font-serif text-2xl">My Atelier</h3>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-8">
                <div className="rounded-lg bg-surface p-5 text-center sm:p-6">
                  <p className="font-serif text-3xl text-accent">
                    {recipes.length}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase text-surface-secondary-foreground">
                    Recipes
                  </p>
                </div>

                <div className="rounded-lg bg-surface p-5 text-center sm:p-6">
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