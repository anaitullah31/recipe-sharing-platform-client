"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import PopularRecipeCard from "./PopularRecipeCard";

const PopularRecipesCarousel = ({ recipes = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const updateCarouselState = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updateCarouselState();

    emblaApi.on("select", updateCarouselState);
    emblaApi.on("reInit", updateCarouselState);

    return () => {
      emblaApi.off("select", updateCarouselState);
      emblaApi.off("reInit", updateCarouselState);
    };
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
            >
              <PopularRecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition hover:bg-surface"
          >
            <Icon data={ChevronLeft} size={18} />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition hover:bg-surface"
          >
            <Icon data={ChevronRight} size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {scrollSnaps.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-3 w-3 rounded-full border transition ${
                index === selectedIndex
                  ? "border-foreground bg-foreground"
                  : "border-border bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRecipesCarousel;
