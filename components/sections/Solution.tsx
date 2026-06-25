'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import { Users, FolderOpen, RefreshCw, Timer, TrendingUp } from 'lucide-react'

const solutions = [
  {
    icon: Users,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    title: 'Más clientes',
    description:
      'Captación automática de oportunidades. Cada consulta respondida, cada lead capturado, cada interesado seguido — sin que tengas que hacer nada.',
    badge: 'Nunca más perdés una consulta',
    wide: true,
  },
  {
    icon: FolderOpen,
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    title: 'Más organización',
    description:
      'Toda la información centralizada. Clientes, ventas, conversaciones y datos en un solo lugar.',
    badge: 'Control total del negocio',
    wide: false,
  },
  {
    icon: RefreshCw,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    title: 'Más seguimiento',
    description:
      'Clientes que vuelven y recomiendan. Recordatorios, seguimientos y reactivaciones automáticas.',
    badge: 'Retención sin esfuerzo',
    wide: false,
  },
  {
    icon: Timer,
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    title: 'Más tiempo libre',
    description:
      'Menos tareas repetitivas. Las operaciones que hoy hacés a mano, mañana las hace el sistema.',
    badge: 'Recuperás horas cada semana',
    wide: false,
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    title: 'Más ventas',
    description:
      'Mejor atención, respuestas más rápidas y seguimiento constante. El resultado natural es más conversiones.',
    badge: 'Más ingresos, misma energía',
    wide: false,
  },
]

export default function Solution() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-14 lg:mb-16">
          <p className="text-xs font-semibold text-blue-400 tracking-widest uppercase mb-4">
            La solución
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-xl leading-tight">
              Instalamos sistemas que hacen crecer tu negocio.
            </h2>
            <p className="text-zinc-400 text-base lg:text-lg max-w-xs leading-relaxed shrink-0">
              Captación, atención, seguimiento y organización. Todo funcionando incluso cuando no estás.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => (
            <FadeIn key={i} delay={i * 0.07} className={s.wide ? 'lg:col-span-2' : ''}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.1)' }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 h-full flex flex-col cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${s.iconBg}`}>
                  <s.icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-5">{s.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  {s.badge}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
