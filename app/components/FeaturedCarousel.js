"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import FeaturedCard from "./FeaturedCard";

const FeaturedCarousel = ({ recipes = [] }) => {
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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollSnaps = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    updateScrollSnaps();
    updateSelectedIndex();

    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateScrollSnaps);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateScrollSnaps);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <FeaturedCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={scrollPrev}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background transition hover:bg-surface"
          >
            <Icon data={ChevronLeft} size={18} />
          </button>

          <button
            onClick={scrollNext}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background transition hover:bg-surface"
          >
            <Icon data={ChevronRight} size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {scrollSnaps.map((_, index) => (
            <button
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

export default FeaturedCarousel;
