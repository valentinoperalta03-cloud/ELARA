'use client'

import { useState } from 'react'
import { MessageCircle, Inbox } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'new',       label: 'Nuevo',       color: 'bg-blue-50 text-blue-700' },
  { value: 'contacted', label: 'Contactado',   color: 'bg-amber-50 text-amber-700' },
  { value: 'qualified', label: 'Calificado',   color: 'bg-emerald-50 text-emerald-700' },
  { value: 'lost',      label: 'Perdido',      color: 'bg-zinc-100 text-zinc-400' },
]

function statusColor(s: string) {
  return STATUS_OPTIONS.find(o => o.value === s)?.color ?? 'bg-zinc-100 text-zinc-500'
}

interface Lead {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  status: string
  service_interest: string | null
  captured_at: string
  clients: { business_name: string | null; contact_name: string } | null
}

function StatusSelect({ lead }: { lead: Lead }) {
  const [value, setValue] = useState(lead.status)
  const [saving, setSaving] = useState(false)

  async function update(newStatus: string) {
    setSaving(true)
    setValue(newStatus)
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setSaving(false)
  }

  const cfg = STATUS_OPTIONS.find(o => o.value === value)

  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => update(e.target.value)}
        disabled={saving}
        className={`text-xs font-medium px-2 py-1 rounded-lg border-0 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200 pr-5 ${cfg?.color ?? ''} ${saving ? 'opacity-50' : ''}`}
      >
        {STATUS_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-current opacity-50 text-[10px]">▾</span>
    </div>
  )
}

export default function LeadsClient({ leads }: { leads: Lead[] }) {
  if (!leads.length) {
    return (
      <div className="bg-white border border-zinc-200 rounded-2xl text-center py-16 text-zinc-400 text-sm">
        <Inbox className="w-8 h-8 mx-auto mb-3 text-zinc-200" />
        Los leads aparecerán aquí cuando los clientes activen sus formularios.
      </div>
    )
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 border-b border-zinc-100">
          <tr>
            <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Lead</th>
            <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Cliente ELARA</th>
            <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Servicio</th>
            <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Estado</th>
            <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Fecha</th>
            <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Contacto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
              <td className="px-5 py-3.5">
                <div className="font-medium text-zinc-900">{lead.name ?? '—'}</div>
                <div className="text-xs text-zinc-400">{lead.email}</div>
              </td>
              <td className="px-5 py-3.5 text-zinc-600">
                {lead.clients?.business_name ?? lead.clients?.contact_name ?? '—'}
              </td>
              <td className="px-5 py-3.5 text-zinc-500">{lead.service_interest ?? '—'}</td>
              <td className="px-5 py-3.5">
                <StatusSelect lead={lead} />
              </td>
              <td className="px-5 py-3.5 text-zinc-400 text-xs">
                {new Date(lead.captured_at).toLocaleString('es-AR', {
                  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                })}
              </td>
              <td className="px-5 py-3.5">
                {lead.phone && (
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.name ?? '')}%2C%20vi%20tu%20consulta%20y%20quería%20ayudarte.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
                    title="Abrir WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
