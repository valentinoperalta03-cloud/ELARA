'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'

const categories = [
  {
    label: 'General',
    items: [
      { q: '¿Qué es ELARA?', a: 'ELARA es una empresa que implementa sistemas para que tu negocio consiga más clientes, automatice tareas repetitivas y funcione sin depender 100% de vos. No somos una agencia de marketing, no somos una software factory. Somos implementadores de sistemas.' },
      { q: '¿Cómo sé cuál es el sistema que necesito?', a: 'Si querés empezar desde cero con presencia digital y captación de leads, empezá por ELARA Launch™. Si ya tenés presencia y querés automatizar, hablanos y te recomendamos el sistema más adecuado para tu situación.' },
      { q: '¿En qué se diferencia ELARA de una agencia web o de marketing?', a: 'Las agencias crean. ELARA implementa sistemas. La diferencia es que nuestros productos están diseñados para funcionar solos, capturar leads, responder clientes y generar resultados — sin que tengas que supervisarlos todo el tiempo.' },
      { q: '¿Puedo contratar más de un sistema?', a: 'Sí. De hecho, la mayoría de los clientes empiezan con ELARA Launch™ y luego suman servicios mensuales a medida que crecen.' },
    ],
  },
  {
    label: 'Implementación',
    items: [
      { q: '¿Cuánto tarda la implementación de ELARA Launch™?', a: 'Entre 5 y 7 días hábiles desde que nos pasás la información de tu negocio.' },
      { q: '¿Qué información necesito darles para empezar?', a: 'Los datos básicos de tu negocio (nombre, rubro, servicios, precios, horarios), fotos si tenés, y tus objetivos. Te pasamos una lista completa al inicio.' },
      { q: '¿Necesito saber de tecnología?', a: 'Para nada. Los sistemas están diseñados para que cualquier persona pueda administrarlos. Te capacitamos y acompañamos en el proceso.' },
      { q: '¿Puedo pedir cambios después de la entrega?', a: 'Sí. Todos los productos incluyen rondas de revisión. Los servicios mensuales incluyen ajustes mensuales ilimitados.' },
    ],
  },
  {
    label: 'Pagos y contratos',
    items: [
      { q: '¿Cuánto cuesta ELARA Launch™?', a: 'El precio varía según el tipo y tamaño del negocio. Escribinos y te pasamos un presupuesto en menos de 24 horas.' },
      { q: '¿Los servicios mensuales tienen permanencia mínima?', a: 'No. Podés cancelar cuando quieras, sin penalidades. Eso sí, algunos sistemas necesitan al menos un mes para mostrar resultados concretos.' },
      { q: '¿Cómo se paga?', a: 'Transferencia bancaria, tarjeta de crédito o débito. Te emitimos factura por cada pago.' },
      { q: '¿Qué pasa si no estoy conforme?', a: 'Antes de cerrar cualquier proyecto, revisamos juntos y hacemos los ajustes necesarios. Nuestro objetivo es que el resultado supere tu expectativa.' },
    ],
  },
  {
    label: 'Soporte',
    items: [
      { q: '¿Qué incluye el soporte post-entrega?', a: 'ELARA Launch™ incluye 30 días de soporte gratuito. Los servicios mensuales incluyen soporte continuo durante toda la vigencia del servicio.' },
      { q: '¿Puedo comunicarme directamente con el equipo?', a: 'Sí. Tenés acceso a comunicación directa por WhatsApp o email con el equipo responsable de tu proyecto.' },
      { q: '¿Qué pasa si algo deja de funcionar?', a: 'Lo resolvemos. Si es algo dentro del servicio contratado, sin costo adicional. Si es algo externo (como cambios de plataformas de terceros), te avisamos y lo solucionamos lo antes posible.' },
    ],
  },
]

export default function FAQFullPage() {
  const [openCategory, setOpenCategory] = useState(0)
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <section className="bg-zinc-950 min-h-screen pt-32 pb-24 px-5 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Preguntas frecuentes
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Todo lo que necesitás saber antes de empezar. Si no encontrás tu respuesta,{' '}
            <Link href="/contacto" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
              escribinos
            </Link>.
          </p>
        </FadeIn>

        {/* Category tabs */}
        <FadeIn direction="up" delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setOpenCategory(i)}
                className={`text-sm px-4 py-2 rounded-xl border transition-all ${
                  openCategory === i
                    ? 'bg-white/[0.08] border-white/20 text-white'
                    : 'border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* FAQ items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={openCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            {categories[openCategory].items.map((item, i) => {
              const key = `${openCategory}-${i}`
              const isOpen = openItem === key
              return (
                <div key={i} className="border border-white/[0.06] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenItem(isOpen ? null : key)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium text-white pr-4">{item.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <Plus className="w-4 h-4 text-zinc-500 shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-5">
                          <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.3} className="text-center mt-16">
          <p className="text-zinc-500 text-sm mb-4">¿Tenés otra pregunta?</p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Escribinos directamente
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
