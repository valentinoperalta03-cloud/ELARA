'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import { CheckCircle, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Esencial',
    tagline: 'Para empezar a automatizar lo básico.',
    features: [
      'Sistema de atención automática',
      'Gestión de reservas y turnos',
      'CRM básico de clientes',
      'Reportes mensuales',
      'Soporte por email',
    ],
    cta: 'Consultar precio',
    featured: false,
  },
  {
    name: 'Profesional',
    tagline: 'El sistema completo para crecer en serio.',
    features: [
      'Todo el plan Esencial',
      'Sistema de captación de clientes',
      'Automatización de comunicaciones',
      'Sistema de reactivación',
      'Dashboard en tiempo real',
      'Soporte prioritario',
    ],
    cta: 'Empezar ahora',
    featured: true,
  },
  {
    name: 'Premium',
    tagline: 'Para negocios que necesitan soluciones a medida.',
    features: [
      'Todo el plan Profesional',
      'Sistemas personalizados',
      'Integraciones específicas',
      'Reportes avanzados',
      'Gestor de cuenta dedicado',
      'Soporte 24/7',
    ],
    cta: 'Consultar precio',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="precios" className="py-24 lg:py-32 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4">
            Planes
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-5">
            Elegí el sistema que necesita tu negocio.
          </h2>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto leading-relaxed">
            Sin contratos largos. Sin costos ocultos. Precios a consultar según tu negocio.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: plan.featured ? 0 : -4 }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  plan.featured
                    ? 'bg-zinc-950 border-2 border-blue-600 shadow-[0_0_48px_rgba(37,99,235,0.18)]'
                    : 'bg-white border border-zinc-200'
                }`}
              >
                {plan.featured && (
                  <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-semibold mb-5 tracking-wide">
                    Más popular
                  </span>
                )}

                <h3
                  className={`font-display font-bold text-2xl mb-1 ${
                    plan.featured ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {plan.name}
                </h3>

                <div
                  className={`text-2xl font-display font-semibold mb-3 ${
                    plan.featured ? 'text-zinc-500' : 'text-zinc-300'
                  }`}
                >
                  A consultar
                </div>

                <p
                  className={`text-sm mb-8 leading-relaxed ${
                    plan.featured ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  {plan.tagline}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.featured ? 'text-blue-400' : 'text-emerald-500'
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`text-sm ${
                          plan.featured ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contacto"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-medium transition-colors ${
                    plan.featured
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-center text-sm text-zinc-400 mt-8">
            ¿No sabés qué plan necesitás?{' '}
            <a href="#contacto" className="text-blue-600 hover:underline font-medium">
              Hablemos sin compromiso.
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
