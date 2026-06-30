'use client'

import { useState } from 'react'
import { X, MessageCircle, Mail, TrendingUp } from 'lucide-react'

type Category = 'presencia_digital' | 'automatizacion' | 'captacion' | 'organizacion' | 'marketing' | 'escalabilidad'

const CATEGORY_LABELS: Record<Category, string> = {
  presencia_digital: 'Presencia',
  automatizacion: 'Automatización',
  captacion: 'Captación',
  organizacion: 'Organización',
  marketing: 'Marketing',
  escalabilidad: 'Escalabilidad',
}

const LEVEL_COLORS = {
  low:    { bar: 'bg-amber-400',   bg: 'bg-amber-50',   text: 'text-amber-700' },
  medium: { bar: 'bg-blue-400',    bg: 'bg-blue-50',    text: 'text-blue-700' },
  high:   { bar: 'bg-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-700' },
}

const CATEGORY_ORDER: Category[] = ['presencia_digital', 'automatizacion', 'captacion', 'organizacion', 'marketing', 'escalabilidad']

const CATEGORY_MAX: Record<Category, number> = {
  presencia_digital: 6, automatizacion: 6, captacion: 4, organizacion: 4, marketing: 4, escalabilidad: 4,
}

interface DiagnosticLead {
  id: string
  name: string
  email: string
  phone: string | null
  scores: Record<Category, { score: number; level: 'low' | 'medium' | 'high' }>
  recommended_services: string[] | null
  answers: Record<string, unknown> | null
  created_at: string
}

function scoreToPercent(cat: Category, score: number): number {
  const max = CATEGORY_MAX[cat]
  const min = -max / 2
  return Math.max(8, Math.min(100, ((score - min) / (max - min)) * 100))
}

function MiniScores({ scores }: { scores: DiagnosticLead['scores'] }) {
  const lowCount = Object.values(scores).filter(s => s.level === 'low').length
  const highCount = Object.values(scores).filter(s => s.level === 'high').length
  return (
    <div className="flex gap-1">
      {lowCount > 0 && (
        <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
          {lowCount} oport.
        </span>
      )}
      {highCount > 0 && (
        <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
          {highCount} fuertes
        </span>
      )}
    </div>
  )
}

export default function DiagnosticosClient({ leads }: { leads: DiagnosticLead[] }) {
  const [selected, setSelected] = useState<DiagnosticLead | null>(null)

  return (
    <>
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {!leads.length ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-zinc-200" />
            Todavía no hay diagnósticos con datos de contacto.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Persona</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Scores</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Recomendaciones</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Fecha</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Contacto</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-zinc-900">{lead.name}</div>
                    <div className="text-xs text-zinc-400">{lead.email}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    {lead.scores ? <MiniScores scores={lead.scores} /> : '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {(lead.recommended_services ?? []).map((s, i) => (
                        <span key={i} className="text-[10px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400 text-xs">
                    {new Date(lead.created_at).toLocaleString('es-AR', {
                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      {lead.phone && (
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
                          title="Abrir WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={`mailto:${lead.email}`}
                        className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors"
                        title="Enviar email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setSelected(lead)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Ver análisis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-white/[0.08] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-zinc-950 border-b border-white/[0.06] px-6 py-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-bold text-white text-base">{selected.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{selected.email}</div>
                {selected.phone && (
                  <div className="text-xs text-zinc-500">{selected.phone}</div>
                )}
              </div>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Score bars */}
              {selected.scores && (
                <div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Análisis por área</div>
                  <div className="space-y-3">
                    {CATEGORY_ORDER.map(cat => {
                      const data = selected.scores[cat]
                      if (!data) return null
                      const cfg = LEVEL_COLORS[data.level]
                      const pct = scoreToPercent(cat, data.score)
                      return (
                        <div key={cat}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-400">{CATEGORY_LABELS[cat]}</span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>
                              {data.level === 'low' ? 'Oportunidad' : data.level === 'medium' ? 'En desarrollo' : 'Punto fuerte'}
                            </span>
                          </div>
                          <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Recommended services */}
              {(selected.recommended_services ?? []).length > 0 && (
                <div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">Plan recomendado</div>
                  <div className="space-y-2">
                    {selected.recommended_services.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                        <span className="text-zinc-600 text-[11px] font-mono">#{i + 1}</span>
                        <span className="text-zinc-200 text-sm font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick contact */}
              <div>
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">Contactar</div>
                <div className="flex gap-3">
                  {selected.phone && (
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(selected.name)}%2C%20vi%20que%20completaste%20el%20diagn%C3%B3stico%20de%20Elara.%20%C2%BFTe%20puedo%20contar%20m%C3%A1s%20sobre%20el%20plan%20que%20armamos%20para%20vos%3F`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  )}
                  <a
                    href={`mailto:${selected.email}?subject=Tu%20plan%20personalizado%20de%20Elara`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
