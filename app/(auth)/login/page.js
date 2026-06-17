"use client";

import { useState } from "react";
import { Button, Link } from "@heroui/react";
import { Envelope, Eye, EyeSlash, Lock } from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    console.log(formData);

    const { data, error } = await authClient.signIn.email({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (data) {
      redirect("/");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-lg md:min-h-175 md:grid-cols-2 md:p-8">
        {/* Left Side */}
        <div
          className="relative hidden overflow-hidden rounded-xl bg-cover bg-center md:block"
          style={{
            backgroundImage: "url('/assets/kitchen.avif')",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute bottom-10 left-10 z-10 text-white">
            <h2 className="text-5xl font-bold leading-tight">Welcome Back</h2>

            <p className="mt-3 max-w-sm text-white/90">
              Sign in and continue sharing your favorite recipes.
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
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-muted">
                Sign in to your RecipeHub account
              </p>
            </div>

            <form onSubmit={handleLoginFormSubmit} className="space-y-4">
              {/* Email */}
              <div className="flex h-12 items-center gap-3 rounded-lg border border-field-border bg-field px-4 transition-all focus-within:border-field-border-focus">
                <Envelope className="size-4 text-accent" />

                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
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

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  underline="none"
                  className="text-sm font-medium text-link no-underline! hover:no-underline!"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                radius="md"
                className="h-12 w-full bg-accent font-semibold text-accent-foreground hover:bg-accent-hover rounded-md"
              >
                Login
              </Button>

              <div className="flex items-center gap-4 py-2">
                <span className="h-px flex-1 bg-separator" />
                <span className="text-xs text-muted">or</span>
                <span className="h-px flex-1 bg-separator" />
              </div>

              <Button
                type="button"
                variant="bordered"
                radius="md"
                className="h-12 w-full border bg-surface font-medium text-foreground rounded-md"
              >
                Sign In with Google
              </Button>

              <p className="pt-2 text-center text-sm text-muted">
                Do not have an account?{" "}
                <Link
                  href="/register"
                  underline="none"
                  className="font-semibold text-link no-underline! hover:no-underline!"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
