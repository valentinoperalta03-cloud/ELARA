'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: '¿Necesito saber de tecnología para usar los sistemas de ELARA?',
    a: 'No. Nosotros nos encargamos de toda la implementación y configuración. Vos solo vas a usar lo que ya usás (WhatsApp, tu celular) pero con todo automatizado por detrás.',
  },
  {
    q: '¿Cuánto tiempo tarda la implementación?',
    a: 'Depende de los sistemas elegidos, pero la mayoría de los negocios tienen sus primeros sistemas funcionando entre 7 y 14 días de empezar.',
  },
  {
    q: '¿Funciona para cualquier tipo de negocio?',
    a: 'Trabajamos con negocios físicos y comercios: peluquerías, restaurantes, consultorios, gimnasios, tiendas, estudios y más. Si tenés clientes y procesos repetitivos, ELARA puede ayudarte.',
  },
  {
    q: '¿Qué pasa si el sistema falla o necesito ayuda?',
    a: 'Tenemos soporte activo para todos nuestros clientes. Si algo falla, lo resolvemos nosotros. No te quedás solo frente a un problema técnico.',
  },
  {
    q: '¿Los sistemas se pueden personalizar para mi negocio?',
    a: 'Sí. Antes de implementar nada, analizamos tu negocio en detalle. Los sistemas se configuran según cómo trabajás vos, no al revés.',
  },
  {
    q: '¿Puedo empezar con un solo sistema y agregar más después?',
    a: 'Exactamente. Muchos clientes empiezan con el sistema de atención automática y suman más sistemas a medida que ven resultados.',
  },
  {
    q: '¿Los precios son mensuales o pagos únicos?',
    a: 'Tenemos opciones de pago único por implementación y opciones de suscripción mensual. En la consultoría inicial te explicamos todo sin compromiso.',
  },
  {
    q: '¿Cómo sé si ELARA es para mi negocio?',
    a: 'Si respondés mensajes manualmente, perdés consultas fuera de horario, todo depende de que vos estés presente, o querés más clientes sin trabajar el doble — ELARA es para vos.',
  },
]

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <FadeIn delay={index * 0.04}>
      <div className="border-b border-zinc-100 last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-start justify-between py-5 text-left gap-4 group"
          aria-expanded={open}
        >
          <span className="font-medium text-zinc-900 group-hover:text-blue-600 transition-colors duration-150 text-sm leading-snug pr-2">
            {faq.q}
          </span>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 w-5 h-5 rounded-full border border-zinc-200 group-hover:border-blue-200 flex items-center justify-center mt-0.5 transition-colors duration-150"
          >
            <Plus className="w-3 h-3 text-zinc-400" aria-hidden />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-zinc-500 leading-relaxed pb-5 pr-8">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

export default function FAQ() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            Preguntas frecuentes.
          </h2>
          <p className="text-zinc-500 text-lg">¿Tenés dudas? Acá respondemos las más comunes.</p>
        </FadeIn>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
