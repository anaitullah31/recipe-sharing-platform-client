import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";

const ChefStorySection = () => {
  return (
    <section className="bg-background px-4 pb-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative">
            <div className="relative h-140 overflow-hidden">
              <Image
                src="/assets/chef.jpg"
                alt="Featured chef"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-12 left-0 max-w-65 bg-surface p-6 shadow-lg">
              <p className="text-2xl leading-none text-accent">”</p>
              <p className="mt-2 font-serif text-lg italic leading-6 text-foreground">
                Luxury is not an excess of material, but a precision of thought.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-accent">
              Featured Master
            </p>

            <h2 className="mt-2 max-w-xl font-serif text-3xl leading-tight text-foreground">
              The Geometry of Flavor: In Conversation with Julian Vasseur
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-surface-secondary-foreground">
              Exploring the intersection of architectural precision and seasonal
              spontaneity in modern haute cuisine.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-accent/70">
            The Chef&apos;s Philosophy
          </p>

          <div className="space-y-6">
            {[
              {
                number: "01",
                title: "Ingredient Integrity",
                text: "Every element on the plate must be recognizable in its purest form, elevated but never disguised.",
              },
              {
                number: "02",
                title: "Seasonal Synchronicity",
                text: "The calendar dictates the menu. We work within the constraints of the earth&apos;s natural rhythm.",
              },
              {
                number: "03",
                title: "The Silent Bridge",
                text: "Cooking is the bridge between the farmer and the diner. The chef is merely the translator.",
              },
            ].map((item) => (
              <div key={item.number} className="grid grid-cols-[40px_1fr] gap-4">
                <span className="font-serif text-2xl text-accent/40">
                  {item.number}
                </span>

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-surface-secondary-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-10 border border-accent/25 bg-surface-secondary p-7">
            <h3 className="font-serif text-2xl text-accent">
              Curated Mentorship
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-surface-secondary-foreground">
              Members of The Atelier gain direct access to our chefs for
              personalized technique guidance and pairing advice.
            </p>

            <Link
              href="/recipes"
              className="mt-6 inline-flex items-center gap-3 bg-accent px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-accent-foreground transition hover:bg-accent-hover"
            >
              Ask a Chef
              <Icon data={ArrowRight} size={13} />
            </Link>

            <span className="absolute bottom-3 right-5 text-7xl text-accent/10">
              ψ
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefStorySection;