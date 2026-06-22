"use client";

import { Button } from "@heroui/react";
// import { FcGoogle } from "react-icons/fc";
import { authClient } from "../lib/auth-client";

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
     const data = await authClient.signIn.social({
    provider: "google",
  });
  };

  return (
    <Button
      type="button"
      variant="bordered"
      radius="md"
      className="h-12 w-full border bg-surface font-medium rounded-md"
    //   startContent={<FcGoogle size={20} />}
      onPress={handleGoogleSignIn}
    >
      Sign Up with Google
    </Button>
  );
}
