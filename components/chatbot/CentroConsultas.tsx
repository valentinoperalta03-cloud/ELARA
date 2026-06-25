'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'

type Role = 'bot' | 'user'
interface Msg { id: string; role: Role; text: string }
interface Option { label: string; value: string }
interface Step { bot: string; options?: Option[]; map?: Record<string, string> }

const quickButtons = [
  { label: '¿Qué incluye ELARA Launch?', value: 'q_launch' },
  { label: '¿Cuál es el mejor producto para mí?', value: 'q_best' },
  { label: '¿Cómo funciona Inbox AI?', value: 'q_inbox' },
  { label: '¿Cuánto tarda la implementación?', value: 'q_time' },
  { label: '¿Necesito una página web?', value: 'q_web' },
  { label: '¿Qué negocios pueden usar ELARA?', value: 'q_who' },
  { label: '¿Cómo funciona Leads AI?', value: 'q_leads' },
  { label: '¿Qué incluye Social AI?', value: 'q_social' },
  { label: '¿Qué incluye Insights?', value: 'q_insights' },
]

const flow: Record<string, Step> = {
  start: {
    bot: '¡Hola! Soy el asistente de ELARA. Puedo ayudarte a entender nuestros sistemas, encontrar el producto ideal para tu negocio o responder cualquier consulta. ¿Por dónde empezamos?',
    options: [
      { label: '🔍 Quiero conocer los sistemas', value: 'explore' },
      { label: '🎯 Encontrá el sistema ideal para mí', value: 'q_best' },
      { label: '💬 Tengo una consulta específica', value: 'specific' },
      { label: '📞 Quiero hablar con alguien', value: 'contact' },
    ],
    map: { explore: 'explore', q_best: 'q_best', specific: 'specific', contact: 'contact' },
  },

  explore: {
    bot: '¿Sobre cuál de nuestros sistemas querés saber más?',
    options: [
      { label: '⚡ ELARA Launch™', value: 'q_launch' },
      { label: '💬 Inbox AI™', value: 'q_inbox' },
      { label: '⚙️ Smart System™', value: 'q_smart' },
      { label: '📱 Social AI™', value: 'q_social' },
      { label: '🎯 Leads AI™', value: 'q_leads' },
      { label: '📊 Insights™', value: 'q_insights' },
    ],
    map: { q_launch: 'q_launch', q_inbox: 'q_inbox', q_smart: 'q_smart', q_social: 'q_social', q_leads: 'q_leads', q_insights: 'q_insights' },
  },

  specific: {
    bot: '¿Sobre qué querés consultar?',
    options: [
      { label: '⏱️ Tiempos de implementación', value: 'q_time' },
      { label: '🏢 Si es para mi tipo de negocio', value: 'q_who' },
      { label: '🌐 Si necesito una página web', value: 'q_web' },
      { label: '💰 Precios y modalidades', value: 'q_price' },
    ],
    map: { q_time: 'q_time', q_who: 'q_who', q_web: 'q_web', q_price: 'q_price' },
  },

  q_launch: {
    bot: 'ELARA Launch™ es el sistema comercial completo para tu negocio.\n\n✅ Incluye:\n• Página web comercial profesional\n• Chatbot comercial integrado\n• Captura automática de leads\n• Botón WhatsApp directo\n• Perfil de Google optimizado\n• Sistema de reseñas\n• ELARA Growth Playbook™\n\nEs de pago único — sin mensualidades. Y está listo en 7 días hábiles.\n\n¿Querés más info o hablamos directamente?',
    options: [
      { label: '📩 Contactar ahora', value: 'contact' },
      { label: '🔍 Ver otros sistemas', value: 'explore' },
    ],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_inbox: {
    bot: 'Inbox AI™ es el sistema de atención automática para WhatsApp e Instagram.\n\n✅ Incluye:\n• Atención automática por WhatsApp (API Oficial de Meta)\n• Atención automática en Instagram\n• Dashboard de conversaciones unificado\n• Transferencia a humano cuando es necesario\n• Captura de leads desde cada conversación\n\nEl objetivo es claro: nunca más perdés un cliente por no responder a tiempo.\n\n¿Qué más querés saber?',
    options: [
      { label: '📩 Quiero este sistema', value: 'contact' },
      { label: '🔍 Ver otros sistemas', value: 'explore' },
    ],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_smart: {
    bot: 'Smart System™ es el sistema de gestión operativa para tu negocio.\n\n✅ Se adapta al tipo de negocio:\n• Turnos y reservas (gimnasios, peluquerías, clínicas)\n• Pedidos y presupuestos (talleres, delivery)\n• Gestión de canchas (deportes)\n• Inscripciones (academias, cursos)\n• Y más según el rubro\n\nEl sistema gestiona la operación solo. Tus clientes reservan, reciben recordatorios y se organizan sin que intervengas.\n\n¿Aplicá para tu negocio?',
    options: [
      { label: '✅ Sí, quiero consultarlo', value: 'contact' },
      { label: '🔍 Ver otros sistemas', value: 'explore' },
    ],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_social: {
    bot: 'Social AI™ es el sistema de contenido para tus redes sociales.\n\n✅ Incluye:\n• Calendario de contenido mensual\n• Ideas de Reels y publicaciones\n• Guiones para videos\n• 3 a 4 carruseles semanales diseñados\n• Plantillas editables\n• Investigación de competencia y tendencias\n• Imágenes generadas con IA\n• Plan de contenido estratégico\n\nTodo listo para publicar, con tu voz y tu identidad. Sin que vos dediques horas a diseñar.\n\n¿Querés saber más?',
    options: [
      { label: '📩 Me interesa', value: 'contact' },
      { label: '🔍 Ver otros sistemas', value: 'explore' },
    ],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_leads: {
    bot: 'Leads AI™ es el sistema de prospección automática de clientes.\n\n✅ Incluye:\n• Búsqueda automática de prospectos ideales\n• Clasificación y priorización de oportunidades\n• Base de datos organizada y actualizada\n• Primer contacto automático\n• Prospección mediante Meta API\n\nIdeal para negocios que necesitan conseguir clientes nuevos de forma constante sin que el dueño salga a buscarlos.\n\n¿Aplica para tu negocio?',
    options: [
      { label: '✅ Quiero más info', value: 'contact' },
      { label: '🔍 Ver otros sistemas', value: 'explore' },
    ],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_insights: {
    bot: 'Insights™ unifica datos, automatización y análisis en un solo sistema.\n\n✅ Incluye:\n• Reportes inteligentes semanales\n• Automatizaciones estratégicas (2 por mes)\n• Métricas del negocio en tiempo real\n• Alertas automáticas\n• Seguimiento de objetivos\n• Análisis de clientes\n• Recomendaciones accionables\n• Oportunidades de mejora detectadas\n\nEs el sistema para negocios que quieren tomar decisiones con datos y eliminar trabajo manual al mismo tiempo.\n\n¿Hablamos?',
    options: [
      { label: '📩 Me interesa', value: 'contact' },
      { label: '🔍 Ver otros sistemas', value: 'explore' },
    ],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_best: {
    bot: '¿Cuál es la mayor prioridad de tu negocio hoy?',
    options: [
      { label: '📣 Conseguir más clientes', value: 'best_clients' },
      { label: '💬 Responder consultas más rápido', value: 'best_inbox' },
      { label: '⚙️ Organizar mi operación', value: 'best_smart' },
      { label: '📱 Mejorar mis redes sociales', value: 'best_social' },
      { label: '📊 Tener visibilidad del negocio', value: 'best_insights' },
      { label: '🌐 Tener presencia digital', value: 'best_launch' },
    ],
    map: { best_clients: 'best_clients', best_inbox: 'best_inbox', best_smart: 'best_smart', best_social: 'best_social', best_insights: 'best_insights', best_launch: 'best_launch' },
  },

  best_clients: {
    bot: 'Para conseguir más clientes te recomiendo Leads AI™.\n\nInstala un sistema que encuentra, califica y contacta a tu cliente ideal automáticamente. Más de 50 prospectos calificados por mes sin que salgas a buscarlos.\n\n¿Querés conocer los detalles?',
    options: [{ label: '✅ Ver Leads AI™', value: 'q_leads' }, { label: '📩 Hablar con alguien', value: 'contact' }],
    map: { q_leads: 'q_leads', contact: 'contact' },
  },
  best_inbox: {
    bot: 'Para responder más rápido y no perder clientes, Inbox AI™ es lo ideal.\n\nAtención automática por WhatsApp e Instagram en menos de 30 segundos, 24/7, capturando leads de cada conversación.\n\n¿Querés conocer los detalles?',
    options: [{ label: '✅ Ver Inbox AI™', value: 'q_inbox' }, { label: '📩 Hablar con alguien', value: 'contact' }],
    map: { q_inbox: 'q_inbox', contact: 'contact' },
  },
  best_smart: {
    bot: 'Para organizar tu operación y gestionar turnos, reservas o pedidos, Smart System™ es lo que buscás.\n\nEl sistema gestiona todo solo. Tus clientes reservan, reciben recordatorios y vos tenés visibilidad total.\n\n¿Querés conocer los detalles?',
    options: [{ label: '✅ Ver Smart System™', value: 'q_smart' }, { label: '📩 Hablar con alguien', value: 'contact' }],
    map: { q_smart: 'q_smart', contact: 'contact' },
  },
  best_social: {
    bot: 'Para mejorar tus redes sin dedicarle horas, Social AI™ produce todo el contenido mensual.\n\n4+ carruseles semanales, guiones de Reels, calendario de contenido y publicaciones diseñadas con tu identidad.\n\n¿Querés conocer los detalles?',
    options: [{ label: '✅ Ver Social AI™', value: 'q_social' }, { label: '📩 Hablar con alguien', value: 'contact' }],
    map: { q_social: 'q_social', contact: 'contact' },
  },
  best_insights: {
    bot: 'Para tener visibilidad y automatizar a la vez, Insights™ es el sistema más completo.\n\nReportes inteligentes + automatizaciones estratégicas + alertas + análisis de clientes. Todo en uno.\n\n¿Querés conocer los detalles?',
    options: [{ label: '✅ Ver Insights™', value: 'q_insights' }, { label: '📩 Hablar con alguien', value: 'contact' }],
    map: { q_insights: 'q_insights', contact: 'contact' },
  },
  best_launch: {
    bot: 'Para tener presencia digital completa y funcional desde cero, ELARA Launch™ es el punto de partida.\n\nSitio web + chatbot + WhatsApp + leads + Google. Todo listo en 7 días, pago único.\n\n¿Querés conocer los detalles?',
    options: [{ label: '✅ Ver ELARA Launch™', value: 'q_launch' }, { label: '📩 Hablar con alguien', value: 'contact' }],
    map: { q_launch: 'q_launch', contact: 'contact' },
  },

  q_time: {
    bot: 'Los tiempos según el sistema:\n\n• ELARA Launch™: 5 a 7 días hábiles\n• Inbox AI™: 3 a 5 días\n• Smart System™: 5 a 7 días (según complejidad)\n• Social AI™: primeras entregas en 48 horas\n• Leads AI™: activo en 3 días\n• Insights™: primeros reportes en 5 días\n\nUna vez entregado, revisamos juntos y ajustamos hasta que esté perfecto.',
    options: [{ label: '📩 Quiero empezar', value: 'contact' }, { label: '🔍 Ver sistemas', value: 'explore' }],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_who: {
    bot: 'ELARA trabaja con cualquier negocio que tenga clientes y quiera crecer mejor.\n\nNegocios que usan ELARA:\n• Gimnasios y estudios deportivos\n• Peluquerías y barberías\n• Centros de estética y spa\n• Clínicas y consultorios\n• Restaurantes y cafeterías\n• Inmobiliarias\n• Academias y cursos\n• Agencias y consultoras\n• Talleres y servicios técnicos\n• Comercios y retail\n• Y más...\n\nSi tenés clientes y querés crecer, ELARA tiene un sistema para vos.',
    options: [{ label: '📩 Quiero saber más', value: 'contact' }, { label: '🔍 Ver sistemas', value: 'explore' }],
    map: { contact: 'contact', explore: 'explore' },
  },

  q_web: {
    bot: 'Depende de tu situación.\n\nSi no tenés presencia digital: ELARA Launch™ te da sitio web + chatbot + Google + todo lo necesario en un solo pago.\n\nSi ya tenés página web: podés ir directo a cualquier otro sistema (Inbox AI, Leads AI, Smart System, etc.) sin necesidad de nueva web.\n\nELARA no vende páginas web. Vende sistemas. La web es solo una parte de ELARA Launch™.\n\n¿Cuál es tu situación?',
    options: [
      { label: '🌐 No tengo presencia digital', value: 'q_launch' },
      { label: '✅ Ya tengo web, quiero otro sistema', value: 'explore' },
    ],
    map: { q_launch: 'q_launch', explore: 'explore' },
  },

  q_price: {
    bot: 'Los precios dependen del tipo y tamaño del negocio.\n\nELARA Launch™ tiene precio de pago único.\nLos demás sistemas tienen precio mensual, sin permanencia mínima.\n\nPara darte un presupuesto exacto en menos de 24 horas, necesito conocer tu negocio. ¿Hablamos?',
    options: [{ label: '📩 Quiero el presupuesto', value: 'contact' }, { label: '🔍 Ver sistemas', value: 'explore' }],
    map: { contact: 'contact', explore: 'explore' },
  },

  contact: {
    bot: '¡Perfecto! El equipo de ELARA te responde en menos de 24 horas hábiles.\n\nPodés contactarnos directamente o dejar tus datos en el formulario 👇',
    options: [
      { label: '📩 Ir al formulario de contacto', value: '__contact' },
      { label: '🔄 Seguir consultando', value: 'start' },
    ],
    map: { __contact: '__contact', start: 'start' },
  },
}

export default function CentroConsultas() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [step, setStep] = useState('start')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function addMsg(role: Role, text: string) {
    setMessages((p) => [...p, { id: crypto.randomUUID(), role, text }])
  }

  function showBot(stepKey: string) {
    const s = flow[stepKey]
    if (!s) return
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      addMsg('bot', s.bot)
      setStep(stepKey)
    }, 800)
  }

  function handleStart() {
    setStarted(true)
    showBot('start')
  }

  function handleOption(opt: Option) {
    addMsg('user', opt.label)
    const s = flow[step]
    const next = s?.map?.[opt.value]
    if (opt.value === '__contact') return
    if (opt.value === 'start') {
      setTimeout(() => showBot('start'), 400)
      return
    }
    if (next) setTimeout(() => showBot(next), 400)
  }

  function handleQuick(q: { label: string; value: string }) {
    if (!started) {
      setStarted(true)
      setTimeout(() => {
        addMsg('user', q.label)
        setTimeout(() => showBot(q.value), 400)
      }, 100)
    } else {
      addMsg('user', q.label)
      setTimeout(() => showBot(q.value), 400)
    }
  }

  function handleRestart() {
    setMessages([])
    setStep('start')
    setStarted(false)
    setTimeout(() => {
      setStarted(true)
      showBot('start')
    }, 150)
  }

  const currentStep = flow[step]
  const lastIsBot = messages.length > 0 && messages[messages.length - 1].role === 'bot'
  const showOptions = lastIsBot && !typing && currentStep?.options

  return (
    <section className="bg-zinc-950 min-h-screen pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-80px)]">

        {/* LEFT SIDEBAR */}
        <FadeIn direction="left" className="lg:w-72 shrink-0 pt-8">
          <div className="lg:sticky lg:top-24 space-y-5">
            <div>
              <span className="text-xs font-medium text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full px-3 py-1">
                Respuestas en tiempo real
              </span>
              <h1 className="font-display font-bold text-2xl text-white mt-4 mb-2">
                Centro de Consultas
              </h1>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Preguntá lo que necesites. El asistente conoce todos los sistemas de ELARA y puede recomendarte el ideal para tu negocio.
              </p>
            </div>

            {/* Quick buttons */}
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
                Preguntas rápidas
              </p>
              <div className="space-y-1.5">
                {quickButtons.map((q) => (
                  <button
                    key={q.value}
                    onClick={() => handleQuick(q)}
                    className="w-full text-left text-xs text-zinc-400 hover:text-white flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all group"
                  >
                    <ChevronRight className="w-3 h-3 shrink-0 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <p className="text-xs text-zinc-500 mb-3">¿Preferís hablar directo?</p>
              <Link
                href="/contacto"
                className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ir al formulario de contacto <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* CHAT */}
        <FadeIn direction="right" className="flex-1 pt-8 flex flex-col">
          <div className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col" style={{ minHeight: 540 }}>

            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Asistente ELARA</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-zinc-500">Disponible ahora</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleRestart}
                className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors px-2 py-1 rounded border border-white/[0.05] hover:border-white/10"
              >
                Reiniciar
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {!started && (
                <div className="h-full flex flex-col items-center justify-center gap-5 py-12">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 flex items-center justify-center">
                    <Bot className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold mb-1">Asistente ELARA</p>
                    <p className="text-zinc-500 text-sm max-w-xs">
                      Conoce todos los sistemas de ELARA y puede recomendarte el ideal para tu negocio.
                    </p>
                  </div>
                  <button
                    onClick={handleStart}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Iniciar consulta
                  </button>
                </div>
              )}

              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-end gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${m.role === 'bot' ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-zinc-700'}`}>
                      {m.role === 'bot' ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === 'bot'
                        ? 'bg-white/[0.06] text-zinc-200 rounded-bl-sm'
                        : 'bg-blue-600 text-white rounded-br-sm'
                    }`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-zinc-400"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Options */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-white/[0.06] px-5 py-4 bg-white/[0.01]"
                >
                  <div className="flex flex-wrap gap-2">
                    {currentStep.options!.map((opt) => {
                      if (opt.value === '__contact') {
                        return (
                          <Link
                            key={opt.value}
                            href="/contacto"
                            className="text-xs px-4 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors"
                          >
                            {opt.label}
                          </Link>
                        )
                      }
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleOption(opt)}
                          className="text-xs px-4 py-2 rounded-xl border border-white/[0.1] text-zinc-300 hover:bg-white/[0.06] hover:border-white/20 transition-all"
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
