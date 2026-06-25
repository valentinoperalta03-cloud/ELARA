'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { Check } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Analizamos tu negocio',
    description:
      'Entendemos cómo funciona tu operación hoy, dónde se pierden clientes y cuáles son las tareas que más tiempo consumen.',
  },
  {
    number: '02',
    title: 'Identificamos oportunidades',
    description:
      'Detectamos los puntos exactos donde un sistema puede generar más ingresos, ahorrar tiempo o reducir errores.',
  },
  {
    number: '03',
    title: 'Implementamos sistemas',
    description:
      'Configuramos e instalamos los sistemas correctos para tu tipo de negocio. Sin que tengas que entender de tecnología.',
  },
  {
    number: '04',
    title: 'Automatizamos lo repetitivo',
    description:
      'Respuestas, seguimientos, recordatorios, reportes. Todo lo que hoy hacés a mano empieza a hacerse solo.',
  },
  {
    number: '05',
    title: 'Tus clientes reciben atención constante',
    description:
      'Cada consulta respondida, cada lead capturado, cada cliente seguido — automáticamente, 24 horas, 7 días.',
  },
  {
    number: '06',
    title: 'Tu negocio gana tiempo y clientes',
    description:
      'Con los sistemas funcionando, vos podés enfocarte en lo que realmente importa: crecer.',
  },
]

const results = [
  'Más clientes captados automáticamente',
  'Más organización interna',
  'Más seguimiento a cada oportunidad',
  'Más tiempo libre para el dueño',
  'Menos tareas manuales repetitivas',
  'Menos dependencia de estar siempre presente',
  'Más oportunidades de venta detectadas',
]

function StepItem({ step, i }: { step: typeof steps[0]; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex gap-5 group"
    >
      {/* Step number + connector */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300">
          <span className="font-display font-bold text-xs text-zinc-400 group-hover:text-blue-400 transition-colors">{step.number}</span>
        </div>
        {i < steps.length - 1 && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-white/[0.08] to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 flex-1">
        <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-blue-100 transition-colors duration-200">
          {step.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorksResults() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4">
            El proceso
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight max-w-2xl mx-auto leading-tight">
            Cómo funciona ELARA
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <div>
            {steps.map((step, i) => (
              <StepItem key={i} step={step} i={i} />
            ))}
          </div>

          {/* Results panel */}
          <FadeIn direction="right" className="lg:sticky lg:top-24">
            <div className="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
              <p className="text-xs font-semibold text-blue-400 tracking-widest uppercase mb-6">
                Resultados habituales
              </p>
              <h3 className="font-display font-bold text-white text-2xl mb-8 leading-tight">
                Lo que suelen conseguir nuestros clientes
              </h3>

              <div className="space-y-3 mb-8">
                {results.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-sm text-zinc-300">{r}</span>
                  </motion.div>
                ))}
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/[0.06]">
                {[
                  { value: '7 días', label: 'Primera entrega' },
                  { value: '10h+', label: 'Ahorradas/semana' },
                  { value: '24/7', label: 'Sin pausas' },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-display font-bold text-white text-lg">{m.value}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
