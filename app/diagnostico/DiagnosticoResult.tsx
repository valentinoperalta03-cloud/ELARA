'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, TrendingUp, ArrowRight, Star, Zap } from 'lucide-react'
import { type DiagnosticoResult, CATEGORY_LABELS, CATEGORY_MAX, type Category } from './engine'

const CATEGORY_ORDER: Category[] = [
  'presencia_digital', 'automatizacion', 'captacion', 'organizacion', 'marketing', 'escalabilidad',
]

const LEVEL_CONFIG = {
  low:    { label: 'Oportunidad de mejora', bar: 'bg-amber-500',    text: 'text-amber-400',    bg: 'bg-amber-500/10',    border: 'border-amber-500/20' },
  medium: { label: 'En desarrollo',         bar: 'bg-blue-500',     text: 'text-blue-400',     bg: 'bg-blue-500/10',     border: 'border-blue-500/20' },
  high:   { label: 'Punto fuerte',          bar: 'bg-emerald-500',  text: 'text-emerald-400',  bg: 'bg-emerald-500/10',  border: 'border-emerald-500/20' },
}

const PRIORITY_LABELS = ['Prioridad 1', 'Prioridad 2', 'Prioridad 3']
const PRIORITY_COLORS = [
  'border-blue-500/40 bg-blue-500/[0.06]',
  'border-white/[0.1] bg-white/[0.02]',
  'border-white/[0.08] bg-white/[0.015]',
]

function scoreToPercent(category: Category, score: number): number {
  const max = CATEGORY_MAX[category]
  const min = -max / 2
  const pct = ((score - min) / (max - min)) * 100
  return Math.max(8, Math.min(100, pct))
}

interface Props { result: DiagnosticoResult }

export default function DiagnosticoResultScreen({ result }: Props) {
  const { scores, fortalezas, oportunidades, servicios, conclusion } = result

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <div className="relative pt-20 pb-16 px-5 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/[0.08] rounded-full blur-[80px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <CheckCircle className="w-3.5 h-3.5" />
            Diagnóstico completado
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Tu diagnóstico está listo
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Analizamos tus respuestas y armamos un plan específico para tu negocio.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-5 pb-24 space-y-10">

        {/* Category scores */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2.5 mb-7">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h2 className="font-display font-bold text-lg text-white">Estado de tu negocio</h2>
          </div>
          <div className="space-y-5">
            {CATEGORY_ORDER.map((cat, i) => {
              const data = scores[cat]
              const cfg = LEVEL_CONFIG[data.level]
              const pct = scoreToPercent(cat, data.score)
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-300 font-medium">{CATEGORY_LABELS[cat]}</span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${cfg.bar}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Fortalezas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-emerald-500/[0.04] border border-emerald-500/[0.15] rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <Star className="w-5 h-5 text-emerald-400" />
            <h2 className="font-display font-bold text-lg text-white">Lo que estás haciendo bien</h2>
          </div>
          <ul className="space-y-3">
            {fortalezas.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-[3px] w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-zinc-300 text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Oportunidades */}
        {oportunidades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="font-display font-bold text-lg text-white">Oportunidades de mejora</h2>
            </div>
            <ul className="space-y-3">
              {oportunidades.map((o, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-[3px] w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <span className="text-amber-400 text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <span className="text-zinc-300 text-sm leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Recommended services */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <h2 className="font-display font-bold text-xl text-white">Plan recomendado para tu negocio</h2>
          </div>
          <div className="space-y-4">
            {servicios.map((s, i) => (
              <div
                key={s.slug}
                className={`rounded-3xl border p-6 md:p-7 ${PRIORITY_COLORS[i]}`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-[11px] text-zinc-500 font-medium mb-1 uppercase tracking-wider">
                      {PRIORITY_LABELS[i]}
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display font-bold text-xl text-white">{s.name}</h3>
                      <span className="text-[11px] text-zinc-500 border border-white/[0.1] rounded-full px-2.5 py-0.5">{s.badge}</span>
                    </div>
                    <p className="text-zinc-500 text-[13px] mt-0.5">{s.description}</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed border-t border-white/[0.06] pt-4 mt-1">
                  {s.reason}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44 }}
          className="bg-blue-600/[0.06] border border-blue-500/20 rounded-3xl p-6 md:p-8"
        >
          <h2 className="font-display font-bold text-lg text-white mb-3">Nuestra recomendación</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{conclusion}</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          className="text-center pt-4"
        >
          <p className="text-zinc-500 text-sm mb-6">
            El diagnóstico es gratuito. El siguiente paso también es sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors shadow-[0_0_28px_rgba(37,99,235,0.4)] text-sm"
            >
              Quiero que Elara analice mi negocio
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/[0.12] text-zinc-300 hover:text-white hover:border-white/[0.22] rounded-xl transition-all text-sm"
            >
              Ver soluciones de Elara
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
