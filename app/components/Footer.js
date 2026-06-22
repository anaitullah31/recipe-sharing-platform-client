import Link from "next/link";
import { Icon } from "@gravity-ui/uikit";
import { FaPinterestP, FaSquareInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface-secondary px-6 py-14 text-foreground lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="font-serif text-2xl text-accent">RecipeHub</h2>
            <p className="mt-6 max-w-xs text-sm leading-6 text-surface-secondary-foreground">
              The digital atelier for modern culinary creators. Discover, share,
              and master the art of fine cooking.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl">Explore</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-surface-secondary-foreground">
              <Link href="/recipes" className="hover:text-accent">
                Recipes
              </Link>
              <Link href="/pricing" className="hover:text-accent">
                Membership
              </Link>
              <Link href="/dashboard/my-recipes" className="hover:text-accent">
                My Recipes
              </Link>
              <Link href="/dashboard/favorites" className="hover:text-accent">
                Favorites
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-surface-secondary-foreground">
              <p>RecipeHub Support</p>
              <p>support@recipehub.com</p>
              <p>+1 (555) RECIPE</p>
              <p>
                123 Culinary Way,
                <br />
                Gastronomy District
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl">Social Platform</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-surface-secondary-foreground">
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-accent"
              >
                <Icon data={FaSquareInstagram} size={14} />
                Instagram
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-accent"
              >
                <Icon data={FaPinterestP} size={14} />
                Pinterest
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-accent"
              >
                <Icon data={FaYoutube} size={14} />
                YouTube
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-accent"
              >
                <Icon data={FaXTwitter} size={14} />
                Twitter
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-separator pt-8 text-xs text-surface-secondary-foreground md:flex-row md:items-center">
          <p>© 2026 RecipeHub Digital Atelier. All rights reserved.</p>

          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:text-accent">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
