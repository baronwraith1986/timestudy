"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <Button
      onClick={logout}
      className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors px-4 py-2 rounded-md shadow"
    >
      Logout
    </Button>
  );
}
