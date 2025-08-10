"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function UpdatePasswordForm() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const password = (e.target as HTMLFormElement).password.value;
    await supabase.auth.updateUser({ password });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="password" type="password" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
