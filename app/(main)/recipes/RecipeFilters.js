"use client";

import { Magnifier } from "@gravity-ui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const selectClass =
  "cursor-pointer border-l border-border bg-surface px-4 py-1 text-foreground outline-none";

const optionClass = "bg-surface text-foreground";

const RecipeFilters = ({
  search = "",
  category = "",
  cuisineType = "",
  difficultyLevel = "",
  sortBy = "",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState(search);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateQuery("search", searchText.trim());
  };

  const clearFilters = () => {
    router.push(pathname);
    setSearchText("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-10 flex flex-col gap-4 border border-border bg-surface px-4 py-3 shadow-sm lg:flex-row lg:items-center"
    >
      <div className="flex flex-1 items-center gap-2">
        <Magnifier size={16} className="text-surface-secondary-foreground" />

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search recipes, ingredients, or chefs..."
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-surface-secondary-foreground"
        />

        <button
          type="submit"
          className="bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition hover:opacity-90"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <select
          value={category}
          onChange={(e) => updateQuery("category", e.target.value)}
          className={selectClass}
        >
          <option className={optionClass} value="">
            Category
          </option>
          <option className={optionClass} value="Breakfast">
            Breakfast
          </option>
          <option className={optionClass} value="Lunch">
            Lunch
          </option>
          <option className={optionClass} value="Dinner">
            Dinner
          </option>
          <option className={optionClass} value="Dessert">
            Dessert
          </option>
          <option className={optionClass} value="Street Food">
            Street Food
          </option>
        </select>

        <select
          value={cuisineType}
          onChange={(e) => updateQuery("cuisineType", e.target.value)}
          className={selectClass}
        >
          <option className={optionClass} value="">
            Cuisine
          </option>
          <option className={optionClass} value="Bangladeshi">
            Bangladeshi
          </option>
          <option className={optionClass} value="Indian">
            Indian
          </option>
          <option className={optionClass} value="Italian">
            Italian
          </option>
          <option className={optionClass} value="Chinese">
            Chinese
          </option>
          <option className={optionClass} value="American">
            American
          </option>
          <option className={optionClass} value="Mexican">
            Mexican
          </option>
        </select>

        <select
          value={difficultyLevel}
          onChange={(e) => updateQuery("difficultyLevel", e.target.value)}
          className={selectClass}
        >
          <option className={optionClass} value="">
            Difficulty
          </option>
          <option className={optionClass} value="Easy">
            Easy
          </option>
          <option className={optionClass} value="Medium">
            Medium
          </option>
          <option className={optionClass} value="Hard">
            Hard
          </option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => updateQuery("sortBy", e.target.value)}
          className={selectClass}
        >
          <option className={optionClass} value="">
            Sort By
          </option>
          <option className={optionClass} value="newest">
            Newest
          </option>
          <option className={optionClass} value="oldest">
            Oldest
          </option>
          <option className={optionClass} value="popular">
            Popular
          </option>
        </select>

        <button
          type="button"
          onClick={clearFilters}
          className="border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default RecipeFilters;