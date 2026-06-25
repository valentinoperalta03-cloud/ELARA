'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import { PhoneOff, UserX, FolderX, Clock3, BarChart2, AlertTriangle } from 'lucide-react'

const problems = [
  {
    icon: PhoneOff,
    title: 'Pierden consultas fuera de horario',
    description:
      'Cada mensaje sin responder es una venta que se fue a la competencia. No mañana — ahora mismo, mientras dormís.',
    stat: '63% de las consultas llegan fuera del horario comercial.',
  },
  {
    icon: UserX,
    title: 'Todo depende del dueño',
    description:
      'Si no estás presente, el negocio se frena. No podés crecer un negocio que no funciona sin vos.',
    stat: 'El dueño promedio trabaja 14h más de lo que debería.',
  },
  {
    icon: Clock3,
    title: 'Horas en tareas que una máquina haría sola',
    description:
      'Responder lo mismo, recordar turnos, copiar datos entre planillas, hacer seguimiento uno por uno. Tiempo que no vuelve.',
    stat: 'Más de 10h semanales en tareas que se pueden automatizar.',
  },
  {
    icon: FolderX,
    title: 'Datos desorganizados',
    description:
      'Clientes en WhatsApp, ventas en Excel, conversaciones en papel. Nada centralizado, nada útil para decidir.',
    stat: '80% de los negocios no tienen sus datos organizados.',
  },
  {
    icon: BarChart2,
    title: 'Sin seguimiento de clientes',
    description:
      'Los clientes se olvidan, no vuelven, y nadie los contacta para recuperarlos. Plata en la mesa, todos los días.',
    stat: 'Recuperar un cliente cuesta 5x menos que conseguir uno nuevo.',
  },
  {
    icon: AlertTriangle,
    title: 'Crecen pero no escalan',
    description:
      'Más clientes significa más trabajo manual. Sin sistemas, cada cliente nuevo agrega carga en lugar de rentabilidad.',
    stat: 'Sin sistemas, el crecimiento tiene un techo bajo.',
  },
]

export default function Problem() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-red-500 tracking-widest uppercase mb-4">
            El problema
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-5 max-w-3xl mx-auto leading-tight">
            Si tu negocio depende de vos para funcionar,<br className="hidden lg:block" />
            tenés un problema.
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed">
            No es falta de esfuerzo. Es falta de sistemas. Y cada día sin sistemas es un día
            dejando dinero y tiempo sobre la mesa.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
          {problems.map((problem, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ backgroundColor: '#fafafa' }}
                transition={{ duration: 0.15 }}
                className={`bg-white p-8 group h-full ${i >= 3 ? 'border-t border-zinc-100' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 group-hover:bg-red-50 group-hover:border-red-100 flex items-center justify-center mb-5 transition-all duration-200">
                  <problem.icon className="text-zinc-400 group-hover:text-red-400 transition-colors duration-200" style={{ width: 18, height: 18 }} />
                </div>
                <h3 className="font-display font-semibold text-zinc-900 mb-2 leading-snug text-[15px]">
                  {problem.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{problem.description}</p>
                <p className="text-xs font-medium text-red-400 leading-snug">{problem.stat}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
