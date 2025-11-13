import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase server env vars');
}

/**
 * Server-side Supabase client using the service role key.
 * Never call this from client-side code.
 */
export function getServerSupabase() {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
