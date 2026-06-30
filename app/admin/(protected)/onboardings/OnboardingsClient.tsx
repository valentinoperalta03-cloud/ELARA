'use client'

import { useState } from 'react'
import { X, ClipboardCopy, Check, ClipboardList } from 'lucide-react'
import type { OnboardingSubmission, Client } from '@/types/database'
import { getQuestions, getQuestionLabel } from '@/app/onboarding/[token]/questions'
import { products } from '@/data/products'

type Row = OnboardingSubmission & {
  clients: Pick<Client, 'contact_name' | 'contact_email'> | null
  token?: string
}

function productName(slug: string) {
  return products.find(p => p.slug === slug)?.name ?? slug
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <ClipboardCopy className="w-3 h-3" />}
      {copied ? 'Copiado' : 'Copiar link'}
    </button>
  )
}

type TabType = 'todos' | 'pendientes' | 'completados'

export default function OnboardingsClient({ rows }: { rows: Row[] }) {
  const [tab, setTab] = useState<TabType>('todos')
  const [selected, setSelected] = useState<Row | null>(null)

  const pending   = rows.filter(r => r.status !== 'completed')
  const completed = rows.filter(r => r.status === 'completed')
  const visible   = tab === 'pendientes' ? pending : tab === 'completados' ? completed : rows

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'todos',        label: 'Todos',        count: rows.length },
    { id: 'pendientes',   label: 'Pendientes',   count: pending.length },
    { id: 'completados',  label: 'Completados',  count: completed.length },
  ]

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5 bg-zinc-100 p-1 rounded-xl w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              tab === t.id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            {t.label}
            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
              tab === t.id ? 'bg-zinc-100 text-zinc-600' : 'bg-zinc-200 text-zinc-500'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {!visible.length ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            <ClipboardList className="w-8 h-8 mx-auto mb-3 text-zinc-200" />
            No hay formularios en esta categoría.
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
              {visible.map(row => {
                const onboardingUrl = row.token
                  ? `${typeof window !== 'undefined' ? window.location.origin : ''}/onboarding/${row.token}`
                  : null
                return (
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
                    <td className="px-5 py-3.5 text-zinc-400 text-xs">
                      {row.completed_at
                        ? new Date(row.completed_at).toLocaleString('es-AR', {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                          })
                        : onboardingUrl
                          ? <CopyButton text={onboardingUrl} />
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
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Panel lateral */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
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
                {selected.status !== 'completed' && selected.token && (
                  <div className="mt-2">
                    <CopyButton
                      text={`${typeof window !== 'undefined' ? window.location.origin : ''}/onboarding/${selected.token}`}
                    />
                  </div>
                )}
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
              {selected.logo_url && (
                <div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">Logo</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.logo_url}
                    alt="Logo"
                    className="max-h-20 rounded-lg border border-white/10 bg-white/5 p-2 object-contain"
                  />
                </div>
              )}

              {getQuestions(selected.product_slug).map(q => {
                const val = (selected.answers as Record<string, unknown>)[q.id]
                if (val === undefined || val === null || val === '') return null

                if (q.type === 'upload') {
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
                }

                if (q.type === 'photos') {
                  const urls = val as string[]
                  if (!urls?.length) return null
                  return (
                    <div key={q.id}>
                      <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
                        {getQuestionLabel(q.id)}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {urls.map((url, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={url}
                            alt=""
                            className="aspect-square object-cover rounded-xl border border-white/10"
                          />
                        ))}
                      </div>
                    </div>
                  )
                }

                if (q.type === 'yesno') {
                  return (
                    <div key={q.id}>
                      <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1.5">
                        {getQuestionLabel(q.id)}
                      </div>
                      <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-lg ${
                        val === 'si' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {val === 'si' ? 'Sí' : 'No'}
                      </span>
                    </div>
                  )
                }

                if (q.type === 'products') {
                  const list = val as Array<{ name: string; price: string; description: string; fotos: string[] }>
                  if (!list?.length) return null
                  return (
                    <div key={q.id}>
                      <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
                        {getQuestionLabel(q.id)} ({list.length})
                      </div>
                      <div className="space-y-3">
                        {list.map((p, i) => (
                          <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
                            <div className="flex items-start justify-between mb-1">
                              <div className="font-medium text-white text-sm">{p.name}</div>
                              {p.price && (
                                <div className="text-xs text-emerald-400 font-medium">{p.price}</div>
                              )}
                            </div>
                            {p.description && (
                              <div className="text-xs text-zinc-400 leading-relaxed mb-3">{p.description}</div>
                            )}
                            {p.fotos?.length > 0 && (
                              <div className="grid grid-cols-3 gap-1.5">
                                {p.fotos.map((url, j) => (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    key={j}
                                    src={url}
                                    alt=""
                                    className="aspect-square object-cover rounded-lg border border-white/10"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                if (q.type === 'location' && typeof val === 'object') {
                  const loc = val as Record<string, string>
                  const text = [loc.direccion, loc.ciudad, loc.maps_url].filter(Boolean).join(' · ')
                  return (
                    <div key={q.id}>
                      <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1.5">
                        {getQuestionLabel(q.id)}
                      </div>
                      <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">{text}</div>
                    </div>
                  )
                }

                const displayVal = Array.isArray(val) ? val.join(', ') : String(val)
                return (
                  <div key={q.id}>
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1.5">
                      {getQuestionLabel(q.id)}
                    </div>
                    <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">{displayVal}</div>
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
