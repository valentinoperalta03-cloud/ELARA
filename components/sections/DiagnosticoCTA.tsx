'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Clock, Star } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const PILLS = [
  { icon: Clock, text: '5 minutos' },
  { icon: Zap, text: 'Sin registro' },
  { icon: Star, text: '100% gratuito' },
]

export default function DiagnosticoCTA() {
  return (
    <section className="relative py-24 lg:py-32 bg-zinc-950 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/[0.07] rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-3xl p-10 md:p-14 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              Diagnóstico Gratuito
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2 className="font-display font-bold text-[2.1rem] md:text-5xl text-white tracking-tight leading-tight mb-5">
              Descubrí exactamente{' '}
              <span className="text-gradient">qué le falta a tu negocio</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Respondé 11 preguntas y recibís un análisis personalizado con las oportunidades concretas para crecer, ahorrar tiempo y conseguir más clientes.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="flex items-center justify-center gap-5 mb-9 flex-wrap">
              {PILLS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-zinc-500 text-sm">
                  <Icon className="w-3.5 h-3.5 text-zinc-600" />
                  {text}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(37,99,235,0.5)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="inline-block"
            >
              <Link
                href="/diagnostico"
                className="inline-flex items-center gap-2.5 px-9 py-4 text-base font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_28px_rgba(37,99,246,0.35)]"
              >
                Hacer el diagnóstico gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-5 text-xs text-zinc-700">Sin registro. Sin tarjeta. Sin compromiso.</p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
