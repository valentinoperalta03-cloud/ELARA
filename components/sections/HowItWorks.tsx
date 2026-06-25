'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import { Search, Wrench, Zap, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Analizamos tu negocio',
    description:
      'Entendemos cómo operás hoy, qué cuellos de botella tenés y dónde estás perdiendo clientes y tiempo valioso.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Implementamos los sistemas',
    description:
      'Configuramos los sistemas necesarios para tu negocio específico. Sin tecnología innecesaria, sin complicaciones.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Automatizamos procesos',
    description:
      'Activamos las automatizaciones para que funcionen solas. No tenés que hacer nada extra.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Tu negocio escala',
    description:
      'Con los sistemas activos, tu negocio consigue más clientes y opera con mucho menos dependencia.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4">
            Proceso
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-5">
            De cero a piloto automático en 4 pasos.
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed">
            Sin meses de implementación. Sin complejidades técnicas. Sin depender de vos
            para que funcione.
          </p>
        </FadeIn>

        {/* Steps grid */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[2.375rem] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  {/* Icon + number */}
                  <div className="relative mb-7">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="w-[76px] h-[76px] rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm"
                    >
                      <step.icon className="w-7 h-7 text-zinc-700" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                      <span className="text-white text-[10px] font-bold">{i + 1}</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-bold text-zinc-200 tracking-[0.2em] mb-2 font-display">
                    {step.number}
                  </div>
                  <h3 className="font-display font-bold text-zinc-900 text-lg mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
