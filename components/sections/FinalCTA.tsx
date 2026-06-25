'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative py-28 lg:py-40 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-600/[0.12] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-xs text-zinc-400 mb-8">
            Sin compromiso. Sin contrato largo.
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="font-display text-[2.75rem] lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.04] mb-6">
            Tu negocio ya tiene{' '}
            <span className="text-gradient">suficiente trabajo manual.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="text-zinc-400 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Empezá a construir sistemas que trabajen por vos.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(37,99,235,0.55)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_28px_rgba(37,99,235,0.4)]"
              >
                Empezar con ELARA
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-white/[0.14] text-zinc-300 rounded-xl hover:border-white/[0.26] hover:text-white transition-all"
              >
                Ver soluciones
              </Link>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.32}>
          <p className="mt-8 text-sm text-zinc-600">Resultados reales. Sin promesas vacías.</p>
        </FadeIn>
      </div>
    </section>
  )
}
