import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `hace ${hours}h`
  return `hace ${Math.floor(hours / 24)}d`
}

interface Props {
  leads: Array<{
    id: string
    name: string | null
    email: string | null
    service_interest: string | null
    captured_at: string
    clients: { business_name: string | null } | null
  }>
}

export default function RecentLeads({ leads }: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-zinc-900 text-sm">
          Leads recientes
        </h2>
        <Link
          href="/admin/leads"
          className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1"
        >
          Ver todos <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-6">Sin leads</p>
      ) : (
        <div className="space-y-2">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-zinc-900">
                  {lead.name ?? lead.email ?? 'Anónimo'}
                </div>
                <div className="text-xs text-zinc-400">
                  {lead.clients?.business_name && (
                    <span className="mr-2">{lead.clients.business_name}</span>
                  )}
                  {lead.service_interest}
                </div>
              </div>
              <span className="text-xs text-zinc-400 whitespace-nowrap ml-4">
                {timeAgo(lead.captured_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
