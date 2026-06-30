'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap, TrendingUp, TrendingDown } from 'lucide-react'

/* ── Animated SVG line chart ── */
function MiniChart({ up, color }: { up: boolean; color: string }) {
  const pathRef = useRef<SVGPathElement>(null)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const ascPath = 'M 0,44 C 10,42 20,36 30,28 C 40,20 50,12 60,6 C 68,2 72,1 76,0'
  const descPath = 'M 0,0 C 8,2 18,8 28,16 C 38,24 50,34 60,40 C 68,44 72,45 76,46'

  useEffect(() => {
    if (inView) controls.start({ pathLength: 1, transition: { duration: 1.4, ease: 'easeOut', delay: 0.3 } })
  }, [inView, controls])

  return (
    <div ref={ref} className="w-full h-12 mt-1">
      <svg viewBox="0 0 76 48" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="76" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor={color} stopOpacity="0.2" />
            <stop offset="1" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        <motion.path
          ref={pathRef}
          d={up ? ascPath : descPath}
          stroke={`url(#grad-${color})`}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={controls}
        />
      </svg>
    </div>
  )
}

/* ── Before / After visual ── */
function HeroVisual() {
  const beforeItems = [
    { label: 'Consultas sin responder', value: '12', bad: true },
    { label: 'Horas en tareas manuales', value: '18h', bad: true },
  ]
  const afterCards = [
    { dot: 'bg-emerald-400', text: '+12 clientes esta semana', time: 'Ahora' },
    { dot: 'bg-blue-400', text: '4 sistemas funcionando solos', time: '2 min' },
    { dot: 'bg-violet-400', text: '8.3h ahorradas hoy', time: '15 min' },
    { dot: 'bg-amber-400', text: 'Prospecto detectado automáticamente', time: '31 min' },
    { dot: 'bg-emerald-400', text: 'Consulta respondida automáticamente', time: '44 min' },
    { dot: 'bg-cyan-400', text: 'Seguimiento automático enviado', time: '1h' },
  ]

  const charts = [
    { label: 'Clientes', up: true, color: '#34d399' },
    { label: 'Tiempo ahorrado', up: true, color: '#60a5fa' },
    { label: 'Trabajo manual', up: false, color: '#f87171' },
    { label: 'Oportunidades perdidas', up: false, color: '#fb923c' },
  ]

  return (
    <div className="relative w-full max-w-[440px] mx-auto select-none">

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-semibold text-zinc-500 tracking-widest uppercase">Con ELARA</span>
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Funcionando ahora
          </span>
        </div>

        {/* 4 mini charts 2x2 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {charts.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-zinc-500 leading-tight">{c.label}</span>
                {c.up
                  ? <TrendingUp className="w-3 h-3 text-emerald-400" />
                  : <TrendingDown className="w-3 h-3 text-red-400" />
                }
              </div>
              <MiniChart up={c.up} color={c.color} />
            </motion.div>
          ))}
        </div>

        {/* Activity feed */}
        <div>
          <div className="text-[9px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">Actividad en vivo</div>
          <div className="space-y-0">
            {afterCards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.08 }}
                className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                  <span className="text-[11px] text-zinc-300 truncate">{item.text}</span>
                </div>
                <span className="text-[9px] text-zinc-600 shrink-0 ml-2">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating card bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 12, x: -8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="absolute -bottom-6 -left-8 glass rounded-xl px-4 py-3 shadow-2xl animate-float"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white leading-none mb-0.5">Sin intervención manual</div>
            <div className="text-[10px] text-zinc-500">100% automatizado</div>
          </div>
        </div>
      </motion.div>

      {/* Floating card top-right */}
      <motion.div
        initial={{ opacity: 0, y: -12, x: 8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.5, delay: 1.25 }}
        className="absolute -top-5 -right-6 glass rounded-xl px-4 py-3 shadow-2xl animate-float-slow"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white leading-none mb-0.5">6 sistemas activos</div>
            <div className="text-[10px] text-zinc-500">Corriendo ahora</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-zinc-950 flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] bg-blue-600/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] bg-indigo-600/[0.06] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(37,99,235,0.06),transparent)]" />
      </div>

      <div className="relative flex-1 flex items-center max-w-6xl mx-auto px-6 w-full pt-24 pb-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-xs text-zinc-400 mb-8"
            >
              <Zap className="w-3 h-3 text-blue-400" />
              Sistemas para negocios que quieren crecer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-display text-5xl lg:text-[64px] xl:text-[72px] font-bold text-white leading-[1.04] tracking-tight mb-6"
            >
              Más clientes.{' '}
              <span className="text-gradient">Menos tareas.</span>
              <br />
              Menos dependencia de vos.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-zinc-400 text-lg lg:text-xl leading-[1.65] mb-10 max-w-[480px]"
            >
              ELARA instala sistemas que capturan clientes, responden consultas, automatizan
              operaciones y organizan tu negocio — sin que tengas que estar presente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_28px_rgba(37,99,235,0.45)]"
              >
                <Zap className="w-4 h-4" />
                Diagnóstico Gratuito
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium border border-white/[0.14] text-white rounded-xl hover:border-white/[0.26] hover:bg-white/[0.04] transition-all duration-150"
              >
                Empezar con ELARA
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.38 }}
              className="text-zinc-600 text-[13px] mt-1"
            >
              Descubrí qué oportunidades tiene tu negocio en menos de 3 minutos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-white/[0.07] flex flex-wrap gap-x-8 gap-y-4"
            >
              {[
                { value: '40+', label: 'Negocios con sistemas' },
                { value: '200h+', label: 'Ahorradas por mes' },
                { value: '98%', label: 'Satisfacción' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-lg text-white">{s.value}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual */}
          <div className="hidden lg:flex items-center justify-end">
            <HeroVisual />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
