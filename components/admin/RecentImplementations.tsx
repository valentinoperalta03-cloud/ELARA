import Link from 'next/link'
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

interface Props {
  implementations: Array<{
    id: string
    status: string
    priority: string
    created_at: string
    clients: { contact_name: string; business_name: string | null } | null
    products: { name: string } | null
  }>
}

export default function RecentImplementations({ implementations }: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-zinc-900 text-sm">
          Implementaciones recientes
        </h2>
        <Link
          href="/admin/implementaciones"
          className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1"
        >
          Ver todas <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {implementations.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-6">Sin implementaciones</p>
      ) : (
        <div className="space-y-2">
          {implementations.map((impl) => (
            <Link
              key={impl.id}
              href={`/admin/implementaciones/${impl.id}`}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-zinc-900">
                  {impl.clients?.business_name ?? impl.clients?.contact_name ?? 'Sin nombre'}
                </div>
                <div className="text-xs text-zinc-400">{impl.products?.name}</div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-lg ${statusColor[impl.status] ?? 'bg-zinc-100 text-zinc-600'}`}>
                {statusLabel[impl.status] ?? impl.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
