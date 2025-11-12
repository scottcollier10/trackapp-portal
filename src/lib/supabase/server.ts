import { cookies } from "next/headers";
import { createServerClient } from "@supabase/supabase-js";

export function getServerSupabase() {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createServerClient(supabaseUrl, supabaseKey, {
    global: { headers: { "x-portal-source": "server" } },
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value; },
    },
  });
}
