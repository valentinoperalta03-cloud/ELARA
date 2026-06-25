'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import { CheckCircle } from 'lucide-react'

const benefits = [
  'Respondés consultas sin estar presente',
  'Captás clientes nuevos mientras dormís',
  'Tus datos están organizados y accesibles',
  'Reducís el trabajo manual en más del 70%',
  'Tus clientes reciben atención inmediata',
  'Podés medir todo lo que pasa en tu negocio',
  'Recuperás horas cada semana para crecer',
  'El negocio funciona sin depender solo de vos',
]

const stats = [
  { value: '70%', label: 'Reducción en trabajo manual', accent: false },
  { value: '3×', label: 'Más consultas convertidas', accent: false },
  { value: '24/7', label: 'Atención automática activa', accent: false },
  { value: '<30d', label: 'Para ver los primeros resultados', accent: false },
]

export default function Benefits() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <FadeIn>
              <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4">
                Resultados
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-6 leading-tight">
                Lo que cambia cuando ELARA entra a tu negocio.
              </h2>
              <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
                No son promesas. Son los resultados que ven los negocios que implementan
                nuestros sistemas.
              </p>
            </FadeIn>

            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <FadeIn key={i} delay={i * 0.045}>
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      className="w-[18px] h-[18px] text-emerald-500 shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span className="text-zinc-700 text-sm leading-relaxed">{benefit}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: stats */}
          <FadeIn direction="left">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8"
                >
                  <div className="font-display text-[2.5rem] font-bold text-zinc-900 leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-500 leading-snug">{stat.label}</div>
                </motion.div>
              ))}

              {/* Highlight card */}
              <div className="col-span-2 rounded-2xl bg-zinc-950 p-8 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"
                />
                <div className="relative">
                  <div className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug">
                    &ldquo;El sistema trabaja. Yo crezco.&rdquo;
                  </div>
                  <p className="text-sm text-zinc-400">
                    Así describen su experiencia los negocios que usan ELARA.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
