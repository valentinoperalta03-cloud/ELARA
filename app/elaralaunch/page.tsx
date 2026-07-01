'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle, Globe, MessageCircle, Star, Zap, ArrowRight,
  ChevronDown, Shield, Clock, Users, MapPin, TrendingUp, BookOpen,
} from 'lucide-react'

const CHECKOUT_URL = 'https://pagoselara.lemonsqueezy.com/checkout/buy/8619640b-a722-44c7-830b-e72c1799ef2a'
const PRICE = 'ARS $39.990'

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'María R.',
    business: 'Sección Áurea — Peluquería',
    city: 'Buenos Aires',
    avatar: 'MR',
    color: 'from-pink-500 to-rose-600',
    text: 'Antes nadie me encontraba en Google. A la semana de lanzar el sistema ya empecé a recibir consultas por WhatsApp de personas que me buscaron en el mapa. Increíble.',
  },
  {
    name: 'Javier M.',
    business: 'AutoPrecision — Taller mecánico',
    city: 'Córdoba',
    avatar: 'JM',
    color: 'from-blue-500 to-indigo-600',
    text: 'Pensé que era solo una página más. El chatbot solo responde consultas que yo antes contestaba a las 11 de la noche. Ahora duermo y mi negocio igual trabaja.',
  },
  {
    name: 'Valentina S.',
    business: 'Nutricionista independiente',
    city: 'Rosario',
    avatar: 'VS',
    color: 'from-emerald-500 to-teal-600',
    text: 'El sistema de captura de leads me cambió la vida. Antes perdía contactos en Instagram que nunca más respondían. Ahora los tengo guardados y les hago seguimiento.',
  },
  {
    name: 'Tomás L.',
    business: 'Fuerza & Movimiento — Gimnasio',
    city: 'Mendoza',
    avatar: 'TL',
    color: 'from-amber-500 to-orange-600',
    text: 'En los primeros 30 días conseguí 18 leads nuevos. Nunca había tenido un número tan concreto de personas interesadas en mis clases.',
  },
  {
    name: 'Carolina P.',
    business: 'Raíz — Estudio de yoga',
    city: 'CABA',
    avatar: 'CP',
    color: 'from-violet-500 to-purple-600',
    text: 'La gente ahora me dice "te busqué en Google y te encontré". Eso antes no pasaba. ELARA armó todo en tiempo récord y quedó exactamente como lo imaginé.',
  },
]

const FEATURES = [
  { icon: Globe, label: 'Sitio web profesional', desc: 'Diseño moderno, rápido y optimizado para conversión. Servicios, testimonios, galería y formulario.' },
  { icon: MessageCircle, label: 'Chatbot comercial', desc: 'Responde consultas, captura datos y guía hacia la compra — sin que vos tengas que estar.' },
  { icon: Zap, label: 'Botón WhatsApp directo', desc: 'Los clientes te contactan con un clic desde cualquier dispositivo.' },
  { icon: Users, label: 'Captura de leads', desc: 'Formularios que guardan automáticamente cada interesado. Nunca más pierdas un contacto.' },
  { icon: MapPin, label: 'Perfil de Google optimizado', desc: 'Aparecés en búsquedas locales y en Maps cuando te busquen.' },
  { icon: TrendingUp, label: 'Estrategia de reseñas', desc: 'Sistema para conseguir más reseñas de forma natural y consistente.' },
  { icon: BookOpen, label: 'Growth Playbook', desc: 'Manual personalizado con las acciones exactas para seguir creciendo.' },
]

const STEPS = [
  { num: '01', label: 'Relevamiento', desc: 'Te hacemos las preguntas clave sobre tu negocio, tu cliente ideal y tus objetivos comerciales.' },
  { num: '02', label: 'Diseño y armado', desc: 'Nuestro equipo diseña y construye tu sistema comercial completo en menos de 24 horas.' },
  { num: '03', label: 'Revisión y ajustes', desc: 'Revisás todo, pedís los cambios que necesitás y lo aprobamos juntos.' },
  { num: '04', label: 'Lanzamiento', desc: 'Publicamos tu sistema y te capacitamos para manejarlo. Soporte incluido los primeros 30 días.' },
]

const FAQS = [
  {
    q: '¿Es solo una página web?',
    a: 'No. ELARA Launch™ es un sistema comercial completo. El sitio web es solo uno de los componentes. Lo acompañan un chatbot, integración con WhatsApp, sistema de captura de leads, perfil de Google optimizado y una estrategia de reseñas.',
  },
  {
    q: '¿Cuánto tarda la implementación?',
    a: 'Tu primera versión está lista en 24 horas desde que completás el formulario de relevamiento. El proceso completo de revisión, ajustes y lanzamiento toma menos de 7 días hábiles.',
  },
  {
    q: '¿Necesito saber de tecnología para manejarlo?',
    a: 'No. El sistema está pensado para dueños de negocios, no para técnicos. Te capacitamos, te damos un manual personalizado y tenés soporte los primeros 30 días.',
  },
  {
    q: '¿Incluye hosting y dominio?',
    a: 'Te asesoramos en la contratación del hosting y dominio (si no lo tenés). Son costos externos a precio de mercado, muy accesibles. El armado, diseño e implementación de todo el sistema está incluido en el precio único.',
  },
]

const PROBLEMS = [
  'Clientes que te buscan y no te encuentran online',
  'Mensajes sin respuesta por horas o días',
  'Sin sistema para capturar datos de interesados',
  'Perfil de Google sin reseñas ni información correcta',
  'Presencia digital que no genera confianza ni acción',
]

// ─── Browser mockup ───────────────────────────────────────────────────────────

function BrowserMockup() {
  return (
    <div className="w-full rounded-2xl border border-white/[0.1] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] bg-zinc-900">
      {/* Chrome bar */}
      <div className="bg-zinc-800 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex-1 bg-zinc-700/60 rounded-md px-3 py-1 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
          <span className="text-[10px] text-zinc-400 font-mono">tunegocio.com.ar</span>
        </div>
      </div>
      {/* Page preview */}
      <div className="p-4 space-y-3 bg-zinc-950/80">
        {/* Hero block */}
        <div className="bg-gradient-to-br from-blue-600/25 to-blue-600/5 border border-blue-500/15 rounded-xl p-4">
          <div className="h-2.5 bg-white/40 rounded-full w-2/3 mb-2" />
          <div className="h-1.5 bg-white/20 rounded-full w-1/2 mb-1" />
          <div className="h-1.5 bg-white/15 rounded-full w-5/12 mb-4" />
          <div className="flex gap-2">
            <div className="h-7 bg-blue-500/80 rounded-lg w-24 flex items-center justify-center">
              <div className="h-1.5 bg-white/70 rounded w-12" />
            </div>
            <div className="h-7 bg-white/[0.05] border border-white/[0.1] rounded-lg w-20" />
          </div>
        </div>
        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-2">
          {['Sitio web', 'Chatbot', 'Leads'].map((label, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-2.5">
              <div className="w-5 h-5 rounded-lg bg-blue-500/20 mb-2" />
              <div className="h-1.5 bg-white/25 rounded-full mb-1 w-3/4" />
              <div className="h-1 bg-white/10 rounded-full w-full" />
              <div className="h-1 bg-white/10 rounded-full w-2/3 mt-0.5" />
            </div>
          ))}
        </div>
        {/* Chatbot bubble */}
        <div className="flex justify-end">
          <div className="bg-emerald-600/20 border border-emerald-500/20 rounded-xl rounded-br-sm px-3 py-2 max-w-[60%]">
            <div className="text-[9px] text-emerald-400/80 mb-1">ELARA Bot</div>
            <div className="h-1.5 bg-emerald-400/30 rounded-full mb-1" />
            <div className="h-1.5 bg-emerald-400/20 rounded-full w-2/3" />
          </div>
        </div>
        {/* Google maps strip */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2.5 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 shrink-0" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 bg-white/20 rounded-full w-1/2" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-sm bg-amber-400/60" />)}
            </div>
          </div>
          <div className="text-[8px] text-emerald-400/70 font-medium">Google</div>
        </div>
      </div>
    </div>
  )
}

// ─── Testimonials carousel ────────────────────────────────────────────────────

function TestimonialsCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(i => (i + 1) % TESTIMONIALS.length), 4000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-7"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-zinc-200 text-base leading-relaxed mb-6">
              &ldquo;{TESTIMONIALS[active].text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${TESTIMONIALS[active].color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {TESTIMONIALS[active].avatar}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{TESTIMONIALS[active].name}</div>
                <div className="text-zinc-500 text-[12px]">{TESTIMONIALS[active].business} · {TESTIMONIALS[active].city}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'bg-blue-500 w-6' : 'bg-white/[0.15] w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/[0.08] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-white text-sm pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/[0.05] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / 40
    const id = setInterval(() => {
      start += step
      if (start >= to) { setVal(to); clearInterval(id) }
      else setVal(Math.floor(start))
    }, 30)
    return () => clearInterval(id)
  }, [inView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

// ─── CTA Button ───────────────────────────────────────────────────────────────

function CTAButton({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-2.5 font-bold text-white rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors shadow-[0_0_40px_rgba(37,99,235,0.5)] ${
        size === 'lg' ? 'px-10 py-5 text-lg w-full max-w-sm' : 'px-8 py-4 text-base'
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
      />
      <span className="relative">Quiero mi sistema ahora</span>
      <ArrowRight className="w-5 h-5 relative group-hover:translate-x-0.5 transition-transform" />
    </a>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ElaraLaunchPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-600/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* ── Minimal header ── */}
      <header className="relative z-10 px-6 pt-6 pb-2 flex items-center">
        <span className="font-display font-bold text-xl tracking-tight">ELARA</span>
        <span className="ml-2 text-[10px] font-semibold text-blue-400 border border-blue-500/30 rounded-full px-2 py-0.5">Launch™</span>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-16 pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.06] text-amber-400 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              Listo en 24 horas desde que completás el formulario
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl xl:text-[3.5rem] leading-[1.06] tracking-tight mb-6">
              No estás comprando una web.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Estás instalando la infraestructura comercial de tu negocio.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
              Sistema completo que convierte visitantes en clientes — automáticamente, 24/7. Sin que tengas que entender de tecnología ni dedicarle tiempo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <CTAButton size="md" />
              <a
                href="#que-incluye"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-white/[0.12] text-zinc-300 rounded-2xl hover:border-white/25 hover:bg-white/[0.03] transition-all"
              >
                Ver qué incluye
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/[0.07]">
              {[
                { val: 257, suffix: '+', label: 'negocios lanzados' },
                { val: 24, suffix: 'h', label: 'para estar online' },
                { val: 30, suffix: ' días', label: 'de soporte incluido' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display font-bold text-2xl text-white">
                    <Counter to={s.val} suffix={s.suffix} />
                  </div>
                  <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — browser mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:block"
          >
            <BrowserMockup />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROBLEMA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent via-red-950/[0.08] to-transparent">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/[0.05] text-red-400 text-xs font-medium mb-5">
              El problema
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
              Tu negocio pierde clientes <br className="hidden sm:block" />mientras cerrás los ojos.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Cada hora sin respuesta es un cliente que se fue a la competencia. Cada formulario sin atención automática es dinero que dejás sobre la mesa.
            </p>
          </motion.div>
        </div>

        <div className="max-w-lg mx-auto space-y-3">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-3 bg-red-500/[0.04] border border-red-500/[0.12] rounded-2xl px-5 py-3.5"
            >
              <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <span className="text-red-400 text-[10px] font-bold">✕</span>
              </div>
              <span className="text-zinc-300 text-sm">{p}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SOLUCIÓN
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400 text-xs font-medium mb-5">
              La solución
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
              Un sistema que trabaja <br className="hidden sm:block" />mientras vos hacés lo que sabés hacer.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
              ELARA Launch™ instala en tu negocio todo lo que necesitás para atraer, capturar y convertir clientes — en menos de 24 horas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          QUÉ INCLUYE
      ══════════════════════════════════════════════════════════════ */}
      <section id="que-incluye" className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-display font-bold text-2xl text-white">Todo incluido. Sin extras.</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/[0.02] border border-white/[0.07] hover:border-blue-500/30 hover:bg-blue-500/[0.03] rounded-2xl p-5 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                  <f.icon className="w-4 h-4 text-blue-400" />
                </div>
                <div className="font-semibold text-white text-sm mb-1.5">{f.label}</div>
                <div className="text-zinc-500 text-[12px] leading-relaxed">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SOCIAL PROOF
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent via-blue-950/[0.08] to-transparent">
        <div className="max-w-3xl mx-auto">

          {/* Social proof header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-amber-400 font-bold text-lg ml-1">4.9</span>
            </div>
            <p className="text-zinc-300 text-base font-medium mb-1">
              <span className="text-white font-bold">257 negocios</span> ya mejoraron su imagen online con ELARA Launch™
            </p>
            <p className="text-zinc-500 text-sm">
              Peluquerías, talleres, profesionales, restaurantes, gimnasios y más.
            </p>
          </motion.div>

          {/* Transformation callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-blue-500/20 rounded-3xl p-6 mb-8 text-center"
          >
            <Zap className="w-6 h-6 text-blue-400 mx-auto mb-3" />
            <p className="text-white font-medium text-base leading-relaxed max-w-xl mx-auto">
              &ldquo;Pasé de no tener visibilidad en internet a tener presencia real — y ahora mi negocio genera dinero con eso.&rdquo;
            </p>
            <p className="text-zinc-500 text-sm mt-2">Cliente ELARA Launch™ · Buenos Aires</p>
          </motion.div>

          {/* Testimonials carousel */}
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CÓMO FUNCIONA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-xs font-medium mb-5">
              Cómo funciona
            </div>
            <h2 className="font-display font-bold text-3xl text-white">Simple. Claro. Sin vueltas.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%_-_8px)] w-full h-px bg-gradient-to-r from-blue-500/30 to-transparent z-10" />
                )}
                <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
                  <div className="font-mono font-bold text-blue-500/60 text-xs mb-3">{step.num}</div>
                  <div className="font-semibold text-white text-sm mb-2">{step.label}</div>
                  <div className="text-zinc-500 text-[12px] leading-relaxed">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRECIO + CTA PRINCIPAL
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-white/[0.02] border border-blue-500/20 rounded-3xl p-8 text-center relative overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.06] to-transparent pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.08] text-blue-400 text-xs font-medium mb-6">
                <Zap className="w-3 h-3" />
                ELARA Launch™
              </div>

              <div className="mb-2">
                <span className="font-display font-bold text-5xl text-white">$39.990</span>
              </div>
              <div className="text-zinc-500 text-sm mb-8">Pago único · Sin mensualidades · Sin contratos</div>

              {/* What you get */}
              <div className="space-y-2.5 mb-8 text-left">
                {[
                  'Sitio web profesional listo en 24h',
                  'Chatbot comercial configurado',
                  'Sistema de captura de leads',
                  'Perfil de Google optimizado',
                  'Botón WhatsApp directo',
                  'Estrategia de reseñas',
                  'Growth Playbook personalizado',
                  'Soporte 30 días incluido',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-3">
                <CTAButton size="lg" />
                <a href="/contacto" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  Tengo preguntas →
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-zinc-600 text-xs">
                <Shield className="w-3.5 h-3.5" />
                Procesado de forma segura por Lemon Squeezy
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl text-white">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4 leading-tight">
            Tu sistema comercial, <br className="hidden sm:block" />listo en 24 horas.
          </h2>
          <p className="text-zinc-400 text-base mb-8">
            Sin contratos largos. Sin letra chica. Sin necesidad de saber de tecnología.
          </p>
          <div className="flex flex-col items-center gap-4">
            <CTAButton size="lg" />
            <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-600 text-xs">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500/60" />Pago único</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500/60" />Sin mensualidades</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500/60" />Soporte 30 días</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500/60" />Listo en 24 horas</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer minimal */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-6 text-center">
        <span className="text-zinc-600 text-xs">© 2025 ELARA · Todos los derechos reservados</span>
      </footer>

      {/* ── Sticky bottom CTA (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-gradient-to-t from-zinc-950 to-transparent h-8 pointer-events-none" />
        <div className="bg-zinc-950 px-4 pb-6 pt-1">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-colors shadow-[0_0_32px_rgba(37,99,235,0.5)]"
          >
            <div>
              <div className="font-bold text-white text-sm">Quiero mi sistema</div>
              <div className="text-blue-200/70 text-[11px]">{PRICE} · Pago único</div>
            </div>
            <ArrowRight className="w-5 h-5 text-white shrink-0" />
          </a>
        </div>
      </div>

    </div>
  )
}
