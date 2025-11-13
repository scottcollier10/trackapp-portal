import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase server env vars');
}

// Server-side client (uses service role, never exposed to browser)
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Optional helper if you prefer a function
export function getServerClient() {
  return supabaseServer;
}
