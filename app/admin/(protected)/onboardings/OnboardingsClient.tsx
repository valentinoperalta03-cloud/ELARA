'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { OnboardingSubmission, Client } from '@/types/database'
import { getQuestions, getQuestionLabel } from '@/app/onboarding/[token]/questions'
import { products } from '@/data/products'

type Row = OnboardingSubmission & { clients: Pick<Client, 'contact_name' | 'contact_email'> | null }

function productName(slug: string) {
  return products.find(p => p.slug === slug)?.name ?? slug
}

export default function OnboardingsClient({ rows }: { rows: Row[] }) {
  const [selected, setSelected] = useState<Row | null>(null)

  return (
    <>
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {!rows.length ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Todavía no hay formularios completados.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Producto</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Estado</th>
                <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Completado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-zinc-900">{row.clients?.contact_name ?? '—'}</div>
                    <div className="text-xs text-zinc-400">{row.clients?.contact_email ?? ''}</div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600">{productName(row.product_slug)}</td>
                  <td className="px-5 py-3.5">
                    {row.status === 'completed' ? (
                      <span className="text-xs font-medium px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700">
                        Completado
                      </span>
                    ) : (
                      <span className="text-xs font-medium px-2 py-1 rounded-lg bg-amber-50 text-amber-700">
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400">
                    {row.completed_at
                      ? new Date(row.completed_at).toLocaleString('es-AR', {
                          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                        })
                      : '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setSelected(row)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Ver respuestas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Panel lateral */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-lg bg-zinc-950 border-l border-white/[0.08] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-zinc-950 border-b border-white/[0.06] px-6 py-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-display font-bold text-white text-base">
                  {selected.clients?.contact_name ?? 'Cliente'}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {productName(selected.product_slug)}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 mt-0.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 flex-1">
              {/* Logo */}
              {selected.logo_url && (
                <div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
                    Logo
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.logo_url}
                    alt="Logo"
                    className="max-h-20 rounded-lg border border-white/10 bg-white/5 p-2 object-contain"
                  />
                </div>
              )}

              {/* Answers */}
              {getQuestions(selected.product_slug).map(q => {
                const val = (selected.answers as Record<string, unknown>)[q.id]
                if (val === undefined || val === null || val === '') return null

                let displayVal: string
                if (q.type === 'location' && typeof val === 'object') {
                  const loc = val as Record<string, string>
                  displayVal = [loc.direccion, loc.ciudad, loc.maps_url].filter(Boolean).join(' · ')
                } else if (Array.isArray(val)) {
                  displayVal = val.join(', ')
                } else if (q.type === 'upload') {
                  return (
                    <div key={q.id}>
                      <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1.5">
                        {getQuestionLabel(q.id)}
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={val as string}
                        alt="Logo subido"
                        className="max-h-16 rounded-lg border border-white/10 bg-white/5 p-2 object-contain"
                      />
                    </div>
                  )
                } else {
                  displayVal = String(val)
                }

                return (
                  <div key={q.id}>
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1.5">
                      {getQuestionLabel(q.id)}
                    </div>
                    <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                      {displayVal}
                    </div>
                  </div>
                )
              })}

              {selected.status === 'pending' && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-300">
                  El cliente todavía no completó el formulario.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
