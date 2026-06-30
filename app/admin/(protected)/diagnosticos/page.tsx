import { supabaseAdmin } from '@/lib/supabase/admin'
import DiagnosticosClient from './DiagnosticosClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ELARA Admin — Diagnósticos' }

export default async function DiagnosticosPage() {
  const { data: leads } = await supabaseAdmin
    .from('diagnostic_leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-zinc-900">Diagnósticos</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Personas que completaron el diagnóstico gratuito y dejaron sus datos
        </p>
      </div>
      <DiagnosticosClient leads={leads ?? []} />
    </div>
  )
}
