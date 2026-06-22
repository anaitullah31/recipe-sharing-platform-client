"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import NextLink from "next/link";
import {
  Envelope,
  LinkSlash,
  Eye,
  EyeSlash,
  Lock,
  Person,
} from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { data, error } = await authClient.signUp.email({
      name: formData.get("name"),
      email: formData.get("email"),
      image: formData.get("image"),
      password: formData.get("password"),
      role: formData.get("role"),
      plan: "free",
      status: "active",
    });
    if (data) {
      redirect("/");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-lg md:min-h-175 md:grid-cols-2 md:p-8">
        {/* Left Side */}
        <div
          className="relative hidden overflow-hidden rounded-xl bg-cover bg-center md:block"
          style={{
            backgroundImage: "url('/assets/kitchen.avif')",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute bottom-10 left-10 z-10 text-white">
            <h2 className="text-5xl font-bold leading-tight">
              Share Your Recipe
            </h2>

            <p className="mt-3 max-w-sm text-white/90">
              Discover, cook, and save your favorite recipes from around the
              world.
            </p>

            <div className="mt-8 flex gap-2">
              <span className="h-2 w-10 rounded-full bg-white" />
              <span className="h-2 w-2 rounded-full bg-white/50" />
              <span className="h-2 w-2 rounded-full bg-white/50" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex h-full items-center justify-center px-2 md:px-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-10 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                RecipeHub
              </p>

              <h1 className="font-serif text-5xl font-bold text-foreground">
                Kitchen
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-foreground">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-muted">
                Start sharing recipes for free
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegisterFormSubmit} className="space-y-4">
              {/* Name */}
              <div className="flex h-12 items-center gap-3 rounded-lg border border-field-border bg-field px-4 transition-all focus-within:border-field-border-focus">
                <Person className="size-4 text-accent" />

                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                />
              </div>

              {/* Email */}
              <div className="flex h-12 items-center gap-3 rounded-lg border border-field-border bg-field px-4 transition-all focus-within:border-field-border-focus">
                <Envelope className="size-4 text-accent" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                />
              </div>

              {/* Image URL */}
              <div className="flex h-12 items-center gap-3 rounded-lg border border-field-border bg-field px-4 transition-all focus-within:border-field-border-focus">
                <LinkSlash className="size-4 text-accent" />

                <input
                  type="url"
                  name="image"
                  placeholder="Image URL"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                />
              </div>

              {/* Password */}
              <div className="flex h-12 items-center gap-3 rounded-lg border border-field-border bg-field px-4 transition-all focus-within:border-field-border-focus">
                <Lock className="size-4 text-accent" />

                <input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                />

                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {isVisible ? (
                    <EyeSlash className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {/* Role */}
              <input
                type="hidden"
                name="role"
                defaultValue="user"
                placeholder="User Role"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />

              {/* Register Button */}
              <Button
                type="submit"
                radius="md"
                className="h-12 w-full bg-accent font-semibold text-accent-foreground hover:bg-accent-hover rounded-md"
              >
                Register
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <span className="h-px flex-1 bg-separator" />
                <span className="text-xs text-muted">or</span>
                <span className="h-px flex-1 bg-separator" />
              </div>

              {/* Google Button */}
              <Button
                type="button"
                variant="bordered"
                radius="md"
                className="h-12 w-full border bg-surface font-medium rounded-md"
              >
                Sign Up with Google
              </Button>

              {/* Login Link */}
              <p className="pt-2 text-center text-sm text-muted">
                Already have an account?{" "}
                <NextLink
                  href="/login"
                  underline="none"
                  className="font-semibold text-link no-underline! hover:no-underline! rounded-md"
                >
                  Login
                </NextLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
