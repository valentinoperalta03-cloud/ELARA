import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ChevronRight } from 'lucide-react'

const statusLabel: Record<string, string> = {
  pending:        'Pendiente',
  in_progress:    'En proceso',
  waiting_client: 'Esperando cliente',
  completed:      'Completado',
  paused:         'Pausado',
  cancelled:      'Cancelado',
}

const statusColor: Record<string, string> = {
  pending:        'bg-zinc-100 text-zinc-600',
  in_progress:    'bg-blue-50 text-blue-700',
  waiting_client: 'bg-amber-50 text-amber-700',
  completed:      'bg-emerald-50 text-emerald-700',
  paused:         'bg-zinc-100 text-zinc-500',
  cancelled:      'bg-red-50 text-red-600',
}

const priorityDot: Record<string, string> = {
  low:    'bg-zinc-300',
  normal: 'bg-blue-400',
  high:   'bg-amber-400',
  urgent: 'bg-red-500',
}

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ELARA Admin — Implementaciones' }

export default async function ImplementacionesPage() {
  const { data: implementations } = await supabaseAdmin
    .from('implementations')
    .select(`
      id, status, priority, checklist, created_at, deadline,
      clients(contact_name, business_name),
      products(name),
      elara_admins(name)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-zinc-900">Implementaciones</h1>
        <p className="text-sm text-zinc-500 mt-1">{implementations?.length ?? 0} en total</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {!implementations?.length ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Sin implementaciones aún.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Producto</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Estado</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Progreso</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Deadline</th>
                <th className="w-8 px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {implementations.map((impl: any) => {
                const checklist = Array.isArray(impl.checklist) ? impl.checklist : []
                const done = checklist.filter((t: any) => t.done).length
                const total = checklist.length
                const pct = total > 0 ? Math.round((done / total) * 100) : 0

                return (
                  <Link key={impl.id} href={`/admin/implementaciones/${impl.id}`} legacyBehavior>
                    <tr className="hover:bg-zinc-50 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[impl.priority] ?? 'bg-zinc-300'}`} />
                          <div>
                            <div className="font-medium text-zinc-900">
                              {impl.clients?.business_name ?? impl.clients?.contact_name ?? '—'}
                            </div>
                            {impl.elara_admins?.name && (
                              <div className="text-xs text-zinc-400">{impl.elara_admins.name}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-zinc-600">{impl.products?.name ?? '—'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${statusColor[impl.status]}`}>
                          {statusLabel[impl.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {total > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-zinc-400">{done}/{total}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-zinc-400 text-xs">
                        {impl.deadline
                          ? new Date(impl.deadline).toLocaleDateString('es-AR')
                          : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <ChevronRight className="w-4 h-4 text-zinc-300" />
                      </td>
                    </tr>
                  </Link>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
