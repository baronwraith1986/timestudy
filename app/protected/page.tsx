import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("some_table").select("*");

  return (
    <div>
      <h1>Protected Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
