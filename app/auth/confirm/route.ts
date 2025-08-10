import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "signup" | "magiclink" | "recovery" | "email_change"
    });

    if (!error) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.redirect(new URL("/error", req.url));
}
