"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/auth/login");
    setLoading(false);
  };

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        className="bg-red-600 hover:bg-red-700 text-white font-semibold"
        onClick={handleSignIn}
      >
        Sign In
      </Button>
      <Button
        variant="outline"
        className="border-red-600 text-red-600 hover:bg-red-100"
        onClick={handleSignOut}
        disabled={loading}
      >
        {loading ? "Signing Out..." : "Sign Out"}
      </Button>
    </div>
  );
}
