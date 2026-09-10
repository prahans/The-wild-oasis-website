import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/_types/database";

let supabase: SupabaseClient<Database> | undefined;

// Initialize on the first database call so importing getCountries does not
// require Supabase configuration.
export function getSupabase(): SupabaseClient<Database> {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  if (!url || !key) {
    throw new Error(
      "Set SUPABASE_URL and SUPABASE_KEY in .env.local before using the data service.",
    );
  }

  supabase = createClient<Database>(url, key);
  return supabase;
}
