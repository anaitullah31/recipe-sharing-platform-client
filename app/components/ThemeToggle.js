"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex size-8 items-center justify-center rounded-full border border-border text-accent transition hover:bg-surface-hover"
      aria-label="Toggle theme"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
};

export default ThemeToggle;