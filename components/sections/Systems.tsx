'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import {
  MessageSquareText,
  CalendarCheck,
  Magnet,
  Users2,
  RefreshCcw,
  PieChart,
  Globe,
  Megaphone,
} from 'lucide-react'

const systems = [
  {
    icon: MessageSquareText,
    title: 'Sistema de Atención Automática',
    description:
      'Responde consultas por WhatsApp, email e Instagram sin intervención humana, a cualquier hora.',
    benefit: 'Respuestas instantáneas 24/7',
    tag: 'Automatización',
    tagStyle: 'bg-blue-50 text-blue-600',
  },
  {
    icon: CalendarCheck,
    title: 'Sistema de Reservas y Turnos',
    description:
      'Gestión automática de reservas, confirmaciones y recordatorios. Cero coordinación manual.',
    benefit: 'Sin cancelaciones sin aviso',
    tag: 'Gestión',
    tagStyle: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Magnet,
    title: 'Sistema de Captación de Clientes',
    description:
      'Captura prospectos desde redes sociales y los convierte en clientes reales con flujos automatizados.',
    benefit: 'Pipeline activo sin esfuerzo',
    tag: 'Captación',
    tagStyle: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Users2,
    title: 'Sistema CRM de Clientes',
    description:
      'Todos tus clientes, historial y conversaciones centralizadas. Información disponible cuando la necesitás.',
    benefit: 'Sin datos perdidos',
    tag: 'Organización',
    tagStyle: 'bg-violet-50 text-violet-600',
  },
  {
    icon: RefreshCcw,
    title: 'Sistema de Reactivación',
    description:
      'Recupera clientes inactivos con mensajes automáticos personalizados en el momento justo.',
    benefit: 'Más ventas sin nuevo tráfico',
    tag: 'Retención',
    tagStyle: 'bg-orange-50 text-orange-600',
  },
  {
    icon: PieChart,
    title: 'Sistema de Control y Reportes',
    description:
      'Métricas claras y actualizadas de tu negocio en tiempo real. Tomás decisiones basadas en datos.',
    benefit: 'Control total siempre',
    tag: 'Control',
    tagStyle: 'bg-zinc-100 text-zinc-600',
  },
  {
    icon: Globe,
    title: 'Sistema de Presencia Online',
    description:
      'Mejora tu visibilidad en Google Maps, redes sociales y directorios locales para que más gente te encuentre.',
    benefit: 'Más gente que te encuentra',
    tag: 'Visibilidad',
    tagStyle: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Megaphone,
    title: 'Sistema de Comunicaciones',
    description:
      'Campañas automáticas de WhatsApp y email para tus clientes: promociones, novedades y seguimientos.',
    benefit: 'Relación continua con clientes',
    tag: 'Comunicación',
    tagStyle: 'bg-pink-50 text-pink-600',
  },
]

export default function Systems() {
  return (
    <section id="sistemas" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4">
            Sistemas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-5">
            8 sistemas. Un negocio que funciona solo.
          </h2>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto leading-relaxed">
            Cada sistema resuelve un problema específico. Juntos, transforman cómo operás.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systems.map((s, i) => (
            <FadeIn key={i} delay={i * 0.045}>
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.07)',
                }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-zinc-100 bg-white p-6 h-full flex flex-col cursor-default"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-4 shrink-0">
                  <s.icon className="w-4.5 h-4.5 text-zinc-600" style={{ width: 18, height: 18 }} />
                </div>
                <span
                  className={`self-start text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 ${s.tagStyle}`}
                >
                  {s.tag}
                </span>
                <h3 className="font-display font-semibold text-zinc-900 mb-2 text-sm leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed flex-1 mb-4">
                  {s.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                  {s.benefit}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
