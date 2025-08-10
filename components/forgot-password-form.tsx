"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const supabase = createClient(); // browser version is fine
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const email = (e.target as HTMLFormElement).email.value;
    await supabase.auth.resetPasswordForEmail(email);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Reset Email"}
      </button>
    </form>
  );
}
