import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { Client } from '@/types/database'
import { UserPlus } from 'lucide-react'

const statusLabel: Record<string, string> = {
  lead:       'Lead',
  onboarding: 'Onboarding',
  active:     'Activo',
  paused:     'Pausado',
  churned:    'Churned',
}

const statusColor: Record<string, string> = {
  lead:       'bg-zinc-100 text-zinc-500',
  onboarding: 'bg-blue-50 text-blue-700',
  active:     'bg-emerald-50 text-emerald-700',
  paused:     'bg-amber-50 text-amber-600',
  churned:    'bg-red-50 text-red-600',
}

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ELARA Admin — Clientes' }

export default async function ClientesPage() {
  const { data: clients } = await supabaseAdmin
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-zinc-900">Clientes</h1>
          <p className="text-sm text-zinc-500 mt-1">{clients?.length ?? 0} registros</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {!clients?.length ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            <UserPlus className="w-8 h-8 mx-auto mb-3 text-zinc-200" />
            Sin clientes aún — llegará el primer pago pronto.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Email</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Estado</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Ciudad</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Registrado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {clients.map((client: Client) => (
                <Link key={client.id} href={`/admin/clientes/${client.id}`} legacyBehavior>
                  <tr className="hover:bg-zinc-50 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-zinc-900">
                        {client.business_name ?? client.contact_name}
                      </div>
                      {client.business_name && (
                        <div className="text-xs text-zinc-400">{client.contact_name}</div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600">{client.contact_email}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${statusColor[client.status]}`}>
                        {statusLabel[client.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-500">{client.business_city ?? '—'}</td>
                    <td className="px-5 py-3.5 text-zinc-400">
                      {new Date(client.created_at).toLocaleDateString('es-AR')}
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
