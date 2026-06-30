import { supabaseAdmin } from '@/lib/supabase/admin'
import LeadsClient from './LeadsClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ELARA Admin — Leads' }

export default async function LeadsPage() {
  const { data: leads } = await supabaseAdmin
    .from('leads')
    .select('*, clients(business_name, contact_name)')
    .order('captured_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-zinc-900">Leads</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Leads capturados desde los sitios de los clientes
        </p>
      </div>
      <LeadsClient leads={(leads ?? []) as Parameters<typeof LeadsClient>[0]['leads']} />
    </div>
  )
}
