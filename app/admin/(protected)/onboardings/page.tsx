import { supabaseAdmin } from '@/lib/supabase/admin'
import OnboardingsClient from './OnboardingsClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ELARA Admin — Onboardings' }

export default async function OnboardingsPage() {
  const { data: rows } = await supabaseAdmin
    .from('onboarding_submissions')
    .select('*, clients(contact_name, contact_email)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-zinc-900">Onboardings</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Formularios de onboarding completados por clientes
        </p>
      </div>

      <OnboardingsClient rows={rows ?? []} />
    </div>
  )
}
