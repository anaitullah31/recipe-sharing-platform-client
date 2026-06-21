import Image from "next/image";
import Link from "next/link";
import { Pencil } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";

const TechniqueSection = () => {
  return (
    <section className="bg-background px-4 pb-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.4fr_0.7fr]">
        <div className="relative flex items-center">
          <div className="absolute left-0 top-0 z-20 w-57.5 border border-border bg-surface p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">
                The Science
              </p>
              <span className="font-serif text-2xl text-accent/40">01</span>
            </div>

            <h3 className="font-serif text-2xl leading-none text-foreground">
              Molecular
              <br />
              Bonds
            </h3>

            <p className="mt-4 text-xs leading-6 text-surface-secondary-foreground">
              Emulsion occurs when an emulsifier, like lecithin in egg yolks,
              creates a bridge between oil and water, preventing separation
              through surface tension reduction.
            </p>
          </div>

          <div className="ml-20 mt-10 h-95 w-full overflow-hidden md:ml-40">
            <Image
              src="/assets/technique.jpg"
              alt="Molecular cooking technique"
              width={900}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>

          <span className="absolute bottom-12 left-48 rounded-full bg-accent px-4 py-1 text-[8px] font-bold uppercase tracking-wider text-accent-foreground">
            Cinematic Focus
          </span>
        </div>

        <div className="grid gap-6">
          <div className="border border-border bg-surface p-7">
            <div className="mb-3 flex items-start justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">
                The Tools
              </p>
              <span className="font-serif text-2xl text-accent/40">02</span>
            </div>

            <h3 className="font-serif text-2xl leading-tight text-foreground">
              Precision Whisking
            </h3>

            <p className="mt-4 text-xs leading-6 text-surface-secondary-foreground">
              Use a balloon whisk for aeration or an immersion blender for
              high-shear stability. Temperature control is the silent partner in
              every successful bond.
            </p>

            <p className="mt-5 text-[10px] font-semibold text-foreground">
              ✣ Standard French Whisk
            </p>
          </div>

          <div className="border border-border bg-surface p-7">
            <div className="mb-3 flex items-start justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">
                Chef Secret
              </p>
              <span className="font-serif text-2xl text-accent/40">03</span>
            </div>

            <h3 className="font-serif text-2xl leading-tight text-foreground">
              The Slow Stream
            </h3>

            <p className="mt-4 text-xs leading-6 text-surface-secondary-foreground">
              Always introduce your fat drop-by-drop initially. Once the mother
              bond is established, you can accelerate to a fine, steady thread.
            </p>

            <Link
              href="/recipes"
              className="mt-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent"
            >
              Read More
              <Icon data={Pencil} size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechniqueSection;
