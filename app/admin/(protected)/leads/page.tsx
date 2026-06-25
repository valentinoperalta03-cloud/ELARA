import { supabaseAdmin } from '@/lib/supabase/admin'
import type { Lead } from '@/types/database'

const statusLabel: Record<string, string> = {
  new:       'Nuevo',
  contacted: 'Contactado',
  qualified: 'Calificado',
  lost:      'Perdido',
}

const statusColor: Record<string, string> = {
  new:       'bg-blue-50 text-blue-700',
  contacted: 'bg-amber-50 text-amber-700',
  qualified: 'bg-emerald-50 text-emerald-700',
  lost:      'bg-zinc-100 text-zinc-400',
}

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

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {!leads?.length ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Los leads aparecerán aquí cuando los clientes activen sus formularios.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Lead</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Cliente ELARA</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Servicio</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Estado</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {leads.map((lead: Lead & { clients: { business_name: string | null; contact_name: string } | null }) => (
                <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-zinc-900">{lead.name ?? '—'}</div>
                    <div className="text-xs text-zinc-400">{lead.email} · {lead.phone}</div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600">
                    {lead.clients?.business_name ?? lead.clients?.contact_name ?? '—'}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500">{lead.service_interest ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${statusColor[lead.status]}`}>
                      {statusLabel[lead.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400">
                    {new Date(lead.captured_at).toLocaleString('es-AR', {
                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
