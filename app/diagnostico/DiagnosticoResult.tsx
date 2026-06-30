'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, TrendingUp, Star, Zap, Clock, Gift, ArrowRight, Check, Plus } from 'lucide-react'
import {
  MONTHLY_SERVICES, ELARA_LAUNCH, SLUG_TO_ID,
  getCheckoutUrl, formatPrice, getLaunchPromo,
  PROMO_DURATION_SECONDS, PROMO_STORAGE_KEY,
  type LaunchPromoLevel,
} from './config'
import { type DiagnosticoResult, CATEGORY_LABELS, CATEGORY_MAX, type Category } from './engine'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props { result: DiagnosticoResult }

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_ORDER: Category[] = [
  'presencia_digital', 'automatizacion', 'captacion', 'organizacion', 'marketing', 'escalabilidad',
]

const LEVEL_CONFIG = {
  low:    { label: 'Oportunidad',  bar: 'bg-amber-500',   text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  medium: { label: 'En desarrollo', bar: 'bg-blue-500',    text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  high:   { label: 'Punto fuerte', bar: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

// ─── Countdown hook ───────────────────────────────────────────────────────────

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    let expiry = parseInt(localStorage.getItem(PROMO_STORAGE_KEY) ?? '0', 10)
    if (!expiry || expiry <= Date.now()) {
      expiry = Date.now() + PROMO_DURATION_SECONDS * 1000
      localStorage.setItem(PROMO_STORAGE_KEY, expiry.toString())
    }

    const tick = () => setTimeLeft(Math.max(0, Math.floor((expiry - Date.now()) / 1000)))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ─── Score bar ────────────────────────────────────────────────────────────────

function scoreToPercent(category: Category, score: number): number {
  const max = CATEGORY_MAX[category]
  const min = -max / 2
  return Math.max(8, Math.min(100, ((score - min) / (max - min)) * 100))
}

// ─── Service toggle card ──────────────────────────────────────────────────────

function ServiceCard({
  service, selected, recommended, onToggle, disabled,
}: {
  service: typeof MONTHLY_SERVICES[string]
  selected: boolean
  recommended: boolean
  onToggle: () => void
  disabled: boolean
}) {
  return (
    <motion.button
      onClick={disabled && !selected ? undefined : onToggle}
      whileTap={disabled && !selected ? {} : { scale: 0.985 }}
      transition={{ duration: 0.1 }}
      className={`w-full text-left rounded-2xl border p-5 transition-all duration-200 relative ${
        selected
          ? 'border-blue-500 bg-blue-500/[0.08] shadow-[0_0_0_1px_rgba(59,130,246,0.25)]'
          : disabled
          ? 'border-white/[0.05] bg-white/[0.01] opacity-40 cursor-not-allowed'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04] cursor-pointer'
      }`}
    >
      {recommended && (
        <div className="absolute -top-2.5 left-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-semibold">
          <Star className="w-2.5 h-2.5" />
          Recomendado
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-bold text-base text-white">{service.name}</span>
            <span className="text-[10px] text-zinc-600 border border-white/[0.08] rounded-full px-1.5 py-0.5">{service.badge}</span>
          </div>
          <p className="text-zinc-500 text-[13px] mb-3 leading-snug">{service.description}</p>
          <ul className="space-y-1">
            {service.benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-1.5 text-[12px] text-zinc-400">
                <div className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-3">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
            selected ? 'bg-blue-600 border-blue-600' : 'border-white/20'
          }`}>
            {selected && <Check className="w-3.5 h-3.5 text-white" />}
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-sm">{formatPrice(service.price)}</div>
            <div className="text-zinc-600 text-[10px]">/mes</div>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

// ─── Launch promo section ─────────────────────────────────────────────────────

function LaunchPromo({ level, promoExpired }: { level: LaunchPromoLevel; promoExpired: boolean }) {
  if (level === 'hidden') return null

  if (promoExpired) {
    return (
      <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-zinc-500" />
          </div>
          <div>
            <p className="text-zinc-300 font-medium text-sm mb-1">El tiempo de la oferta especial venció</p>
            <p className="text-zinc-500 text-[13px] leading-relaxed">
              Ya realizaste tu diagnóstico. Si te arrepentiste y querés aprovechar la oferta de todas formas,
              contactate con nuestro equipo de atención al cliente y te informarán si podés efectuar la compra.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contactar al equipo <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (level === 'normal') {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-0.5">Podés agregar ELARA Launch™ al precio normal</p>
            <p className="text-zinc-500 text-[13px] mb-2">Sitio profesional + chatbot + WhatsApp + captura de leads.</p>
            <p className="text-zinc-300 font-semibold text-sm">{formatPrice(ELARA_LAUNCH.normalPrice)} <span className="text-zinc-600 font-normal text-xs">pago único</span></p>
          </div>
        </div>
      </div>
    )
  }

  if (level === 'promo') {
    const saving = ELARA_LAUNCH.normalPrice - ELARA_LAUNCH.promoPrice
    const pct = Math.round((saving / ELARA_LAUNCH.normalPrice) * 100)
    return (
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.05] p-5"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-white font-semibold text-sm">Precio especial para vos en ELARA Launch™</p>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/25 rounded-full px-2 py-0.5">
                -{pct}%
              </span>
            </div>
            <p className="text-zinc-500 text-[13px] mb-3">Sitio profesional + chatbot + WhatsApp + captura de leads.</p>
            <div className="flex items-center gap-3">
              <span className="text-amber-300 font-bold text-lg">{formatPrice(ELARA_LAUNCH.promoPrice)}</span>
              <span className="text-zinc-600 text-sm line-through">{formatPrice(ELARA_LAUNCH.normalPrice)}</span>
              <span className="text-emerald-400 text-xs font-medium">Ahorrás {formatPrice(saving)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // free
  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.06] p-6 text-center"
    >
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <Gift className="w-6 h-6 text-emerald-400" />
        </div>
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-3">
        🎁 Beneficio exclusivo
      </div>
      <h3 className="font-display font-bold text-xl text-white mb-1">ELARA Launch™ incluido GRATIS</h3>
      <p className="text-zinc-400 text-sm mb-3">Sitio profesional + chatbot + WhatsApp + captura de leads.</p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-emerald-400 font-bold text-2xl">$0</span>
        <div className="text-left">
          <div className="text-zinc-600 text-xs line-through">{formatPrice(ELARA_LAUNCH.normalPrice)}</div>
          <div className="text-emerald-400 text-[11px] font-medium">Incluido sin costo</div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DiagnosticoResultScreen({ result }: Props) {
  const { scores, fortalezas, oportunidades, servicios, conclusion } = result

  // Build initially selected IDs from recommendations
  const recommendedIds = servicios
    .map(s => SLUG_TO_ID[s.slug])
    .filter(Boolean)

  const [selected, setSelected] = useState<string[]>(recommendedIds)
  const timeLeft = useCountdown()
  const promoExpired = timeLeft === 0

  const toggle = useCallback((id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev  // min 1
        return prev.filter(x => x !== id)
      }
      if (prev.length >= 3) return prev    // max 3
      return [...prev, id]
    })
  }, [])

  const count = selected.length
  const launchPromo = promoExpired ? 'expired' : getLaunchPromo(count)
  const checkoutUrl = getCheckoutUrl(selected)
  const totalMonthly = selected.reduce((sum, id) => sum + (MONTHLY_SERVICES[id]?.price ?? 0), 0)

  const ctaIsExternal = checkoutUrl.startsWith('http')
  const ctaLabel = count === 3 ? 'Quiero este plan' : count === 2 ? 'Comenzar ahora' : 'Empezar con este servicio'

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ── Hero ── */}
      <div className="relative pt-20 pb-12 px-5 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/[0.07] rounded-full blur-[80px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            <CheckCircle className="w-3.5 h-3.5" />
            Diagnóstico completado
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3">
            Tu diagnóstico está listo
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            Analizamos tus respuestas y armamos un plan específico para tu negocio.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-5 pb-24 space-y-8">

        {/* ── Score bars ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-base text-white">Estado actual de tu negocio</h2>
          </div>
          <div className="space-y-4">
            {CATEGORY_ORDER.map((cat, i) => {
              const data = scores[cat]
              const cfg = LEVEL_CONFIG[data.level]
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-zinc-400">{CATEGORY_LABELS[cat]}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${cfg.bar}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${scoreToPercent(cat, data.score)}%` }}
                      transition={{ duration: 0.65, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ── Fortalezas + Oportunidades ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div className="bg-emerald-500/[0.04] border border-emerald-500/[0.14] rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-white">Lo que estás haciendo bien</h3>
            </div>
            <ul className="space-y-2.5">
              {fortalezas.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-[13px] leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {oportunidades.length > 0 && (
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-sm text-white">Oportunidades de mejora</h3>
              </div>
              <ul className="space-y-2.5">
                {oportunidades.map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 text-[9px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-zinc-300 text-[13px] leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* ── Divider + section header ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-zinc-600 text-xs uppercase tracking-widest font-medium">Tu plan</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        {/* ── Plan selector ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-white">Diseñá tu plan</h2>
              <p className="text-zinc-500 text-[13px] mt-0.5">Los recomendados ya están seleccionados. Podés agregar o quitar servicios.</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-zinc-500 text-[11px] mb-0.5">Seleccionados</div>
              <div className="font-mono font-bold text-white text-lg">{count}/3</div>
            </div>
          </div>

          {count >= 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[13px] flex items-center gap-2"
            >
              <span>Máximo 3 servicios. Quitá uno para seleccionar otro.</span>
            </motion.div>
          )}

          <div className="space-y-3">
            {Object.values(MONTHLY_SERVICES).map(service => {
              const isSelected = selected.includes(service.id)
              const isRecommended = recommendedIds.includes(service.id)
              const atMax = count >= 3 && !isSelected
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={isSelected}
                  recommended={isRecommended}
                  onToggle={() => toggle(service.id)}
                  disabled={atMax}
                />
              )
            })}
          </div>
        </motion.div>

        {/* ── ELARA Launch promo ── */}
        <AnimatePresence mode="wait">
          {launchPromo !== 'hidden' && (
            <motion.div
              key={launchPromo}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <LaunchPromo level={launchPromo} promoExpired={promoExpired} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Countdown + summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.44 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-6"
        >
          {/* Timer */}
          {timeLeft !== null && !promoExpired && (
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-white text-sm font-medium">Oferta válida por</div>
                  <div className="text-zinc-500 text-[11px]">No se reinicia si cerrás el navegador</div>
                </div>
              </div>
              <div className="font-mono font-bold text-2xl text-white bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2">
                {formatTime(timeLeft)}
              </div>
            </div>
          )}

          {promoExpired && (
            <div className="flex items-center gap-2 mb-5 pb-5 border-b border-white/[0.06] text-zinc-500 text-sm">
              <Clock className="w-4 h-4" />
              La oferta promocional expiró. El diagnóstico sigue disponible.
            </div>
          )}

          {/* Plan summary */}
          <div className="space-y-2 mb-5">
            <div className="text-zinc-600 text-[11px] uppercase tracking-wider mb-3">Resumen del plan</div>
            {selected.map(id => {
              const svc = MONTHLY_SERVICES[id]
              if (!svc) return null
              return (
                <div key={id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-zinc-300">{svc.name}</span>
                  </div>
                  <span className="text-zinc-400">{formatPrice(svc.price)}/mes</span>
                </div>
              )
            })}

            {launchPromo === 'free' && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-300">{ELARA_LAUNCH.name}</span>
                </div>
                <span className="text-emerald-400 font-semibold">GRATIS</span>
              </div>
            )}

            <div className="pt-3 mt-1 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-white font-semibold text-sm">Total mensual</span>
              <div className="text-right">
                <span className="text-white font-bold text-xl">{formatPrice(totalMonthly)}</span>
                <span className="text-zinc-600 text-xs">/mes</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div layout>
            {ctaIsExternal ? (
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-[0_0_28px_rgba(37,99,235,0.4)] text-sm"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href={checkoutUrl}
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-[0_0_28px_rgba(37,99,235,0.4)] text-sm"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>

          <p className="text-center text-[11px] text-zinc-700 mt-3">
            Sin compromiso. Podés cancelar cuando quieras.
          </p>
        </motion.div>

        {/* ── Conclusion ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.52 }}
          className="bg-blue-600/[0.05] border border-blue-500/20 rounded-3xl p-6"
        >
          <h3 className="font-semibold text-white text-sm mb-2">Nuestra lectura de tu negocio</h3>
          <p className="text-zinc-400 text-[13px] leading-relaxed">{conclusion}</p>
        </motion.div>

      </div>
    </div>
  )
}
