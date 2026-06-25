'use client'

import { createBrowserClient } from '@supabase/ssr'

// Client para Client Components (browser)
// Solo para auth — la data se fetcha desde Server Components
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
