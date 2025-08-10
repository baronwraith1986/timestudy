import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div>
      <h2>Notes</h2>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
