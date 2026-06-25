import { createClient } from '@supabase/supabase-js'

// Client con service_role key
// Bypasea RLS — solo usar en API routes y webhooks (server-side)
// NUNCA exponer en el browser
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
