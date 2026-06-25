'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, RefreshCw } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import Link from 'next/link'

type MessageRole = 'bot' | 'user'

interface Message {
  id: string
  role: MessageRole
  text: string
}

interface Option {
  label: string
  value: string
}

interface Step {
  botMessage: string
  options?: Option[]
  freeInput?: boolean
  nextStep?: string
  mapOptions?: Record<string, string>
}

const flow: Record<string, Step> = {
  start: {
    botMessage: '¡Hola! Soy el asistente de ELARA. ¿En qué te puedo ayudar hoy?',
    options: [
      { label: '🚀 Quiero hacer crecer mi negocio', value: 'grow' },
      { label: '🤖 Quiero automatizar tareas', value: 'automate' },
      { label: '💬 Tengo una consulta específica', value: 'specific' },
      { label: '💰 Quiero saber los precios', value: 'pricing' },
    ],
    mapOptions: {
      grow: 'grow',
      automate: 'automate',
      specific: 'specific',
      pricing: 'pricing',
    },
  },
  grow: {
    botMessage: '¡Perfecto! ¿Cuál es el mayor desafío que enfrenta tu negocio hoy?',
    options: [
      { label: '📉 Pocos clientes nuevos', value: 'few_clients' },
      { label: '🔍 Poca visibilidad online', value: 'visibility' },
      { label: '🕐 No tengo tiempo para nada', value: 'time' },
      { label: '📱 Mala presencia en redes', value: 'social' },
    ],
    mapOptions: {
      few_clients: 'recommend_leads',
      visibility: 'recommend_launch',
      time: 'recommend_automations',
      social: 'recommend_social',
    },
  },
  automate: {
    botMessage: '¿Qué tipo de tarea querés automatizar?',
    options: [
      { label: '💬 Atención al cliente por WhatsApp', value: 'whatsapp' },
      { label: '📅 Turnos y reservas', value: 'appointments' },
      { label: '📊 Reportes y seguimiento', value: 'reports' },
      { label: '🔄 Procesos administrativos', value: 'admin' },
    ],
    mapOptions: {
      whatsapp: 'recommend_inbox',
      appointments: 'recommend_smart',
      reports: 'recommend_insights',
      admin: 'recommend_automations',
    },
  },
  specific: {
    botMessage: '¿Sobre qué querés consultar?',
    options: [
      { label: '⏱️ Tiempos de implementación', value: 'timing' },
      { label: '🔧 Cómo funciona el servicio', value: 'how' },
      { label: '🤝 Si es para mi tipo de negocio', value: 'fit' },
      { label: '📞 Hablar con alguien del equipo', value: 'contact' },
    ],
    mapOptions: {
      timing: 'answer_timing',
      how: 'answer_how',
      fit: 'answer_fit',
      contact: 'answer_contact',
    },
  },
  pricing: {
    botMessage: 'Todos nuestros productos tienen precios a consultar porque se adaptan al tipo y tamaño del negocio. Pero puedo orientarte: ¿qué sistema te interesa?',
    options: [
      { label: '⚡ ELARA Launch™ (pago único)', value: 'price_launch' },
      { label: '💬 Inbox AI™ (mensual)', value: 'price_inbox' },
      { label: '⚙️ Smart System™ (mensual)', value: 'price_smart' },
      { label: '📊 Ver todos los sistemas', value: 'all_products' },
    ],
    mapOptions: {
      price_launch: 'price_launch_info',
      price_inbox: 'price_inbox_info',
      price_smart: 'price_smart_info',
      all_products: 'recommend_products',
    },
  },

  recommend_leads: {
    botMessage: 'Para conseguir más clientes de forma sistemática, te recomiendo Leads AI™. Instala un sistema de prospección que encuentra y contacta a tus clientes ideales automáticamente, generando +50 leads calificados por mes sin que vos tengas que salir a buscarlos. ¿Querés saber más?',
    options: [
      { label: '✅ Sí, quiero conocer Leads AI™', value: 'to_leads' },
      { label: '📞 Prefiero hablar con alguien', value: 'contact' },
    ],
    mapOptions: { to_leads: 'recommend_products', contact: 'answer_contact' },
  },
  recommend_launch: {
    botMessage: 'Para mejorar tu visibilidad online, empezá por ELARA Launch™. Es un sistema comercial completo: sitio web, chatbot, WhatsApp, captura de leads y perfil de Google optimizado — listo en 7 días. ¿Querés verlo?',
    options: [
      { label: '✅ Sí, quiero ver ELARA Launch™', value: 'to_launch' },
      { label: '📞 Prefiero hablar con alguien', value: 'contact' },
    ],
    mapOptions: { to_launch: 'recommend_products', contact: 'answer_contact' },
  },
  recommend_automations: {
    botMessage: 'Si no tenés tiempo para nada, Automations™ es lo tuyo. Identificamos las 2 tareas que más tiempo te roban y las automatizamos cada mes. En promedio, recuperás 10+ horas semanales. ¿Querés saber más?',
    options: [
      { label: '✅ Sí, quiero conocer Automations™', value: 'to_automations' },
      { label: '📞 Prefiero hablar con alguien', value: 'contact' },
    ],
    mapOptions: { to_automations: 'recommend_products', contact: 'answer_contact' },
  },
  recommend_social: {
    botMessage: 'Para mejorar tu presencia en redes, Social AI™ produce tu contenido mensual: 4 carruseles de Instagram diseñados profesionalmente, con copywriting y estrategia incluida — sin que vos le dediques tiempo. ¿Querés saber más?',
    options: [
      { label: '✅ Sí, quiero conocer Social AI™', value: 'to_social' },
      { label: '📞 Prefiero hablar con alguien', value: 'contact' },
    ],
    mapOptions: { to_social: 'recommend_products', contact: 'answer_contact' },
  },
  recommend_inbox: {
    botMessage: 'Para automatizar la atención por WhatsApp, Inbox AI™ instala un sistema que responde consultas en menos de 30 segundos, captura leads y deriva a humano cuando es necesario — 24/7, sin que vos tengas que estar. ¿Querés saber más?',
    options: [
      { label: '✅ Ver Inbox AI™', value: 'to_inbox' },
      { label: '📞 Hablar con alguien', value: 'contact' },
    ],
    mapOptions: { to_inbox: 'recommend_products', contact: 'answer_contact' },
  },
  recommend_smart: {
    botMessage: 'Para automatizar turnos y reservas, Smart System™ instala el sistema de gestión correcto para tu negocio: los clientes reservan solos, reciben recordatorios automáticos y vos tenés visibilidad total sin hacer nada. ¿Querés saber más?',
    options: [
      { label: '✅ Ver Smart System™', value: 'to_smart' },
      { label: '📞 Hablar con alguien', value: 'contact' },
    ],
    mapOptions: { to_smart: 'recommend_products', contact: 'answer_contact' },
  },
  recommend_insights: {
    botMessage: 'Para tener visibilidad clara de tu negocio, Insights™ conecta tus fuentes de datos y genera reportes automáticos: un resumen semanal y un análisis mensual profundo — sin que armes una sola planilla. ¿Querés saber más?',
    options: [
      { label: '✅ Ver Insights™', value: 'to_insights' },
      { label: '📞 Hablar con alguien', value: 'contact' },
    ],
    mapOptions: { to_insights: 'recommend_products', contact: 'answer_contact' },
  },

  answer_timing: {
    botMessage: 'Los tiempos varían según el sistema:\n• ELARA Launch™: 5-7 días hábiles\n• Servicios mensuales: activos en 3-5 días hábiles\n\nUna vez entregado, lo revisamos juntos y ajustamos hasta que estés conforme. ¿Querés empezar?',
    options: [
      { label: '✅ Sí, quiero empezar', value: 'contact' },
      { label: '🔍 Tengo otra pregunta', value: 'start' },
    ],
    mapOptions: { contact: 'answer_contact', start: 'start' },
  },
  answer_how: {
    botMessage: 'ELARA implementa sistemas para que tu negocio funcione solo. El proceso es siempre el mismo: (1) Relevamiento de tu negocio y objetivos, (2) Implementación en 5-7 días, (3) Revisión y ajustes, (4) Lanzamiento con soporte. Sin que vos tengas que saber de tecnología. ¿Querés arrancar?',
    options: [
      { label: '✅ Quiero empezar', value: 'contact' },
      { label: '💰 ¿Cuánto cuesta?', value: 'pricing' },
    ],
    mapOptions: { contact: 'answer_contact', pricing: 'pricing' },
  },
  answer_fit: {
    botMessage: 'ELARA trabaja con negocios de servicios, comercios, profesionales independientes y empresas. Si tenés clientes, tareas repetitivas o querés escalar sin contratar más gente — ELARA tiene un sistema para vos. ¿Querés que analicemos tu caso?',
    options: [
      { label: '✅ Sí, analicemos mi caso', value: 'contact' },
      { label: '🔍 Ver todos los sistemas', value: 'recommend_products' },
    ],
    mapOptions: { contact: 'answer_contact', recommend_products: 'recommend_products' },
  },
  answer_contact: {
    botMessage: '¡Genial! Hacé clic abajo para contactarnos directamente. Te respondemos en menos de 24 horas hábiles. 👇',
    options: [
      { label: '📩 Ir a contacto', value: '__contact_page' },
      { label: '🔄 Empezar de nuevo', value: '__restart' },
    ],
    mapOptions: { __contact_page: '__contact_page', __restart: '__restart' },
  },
  price_launch_info: {
    botMessage: 'ELARA Launch™ tiene precio de pago único que varía según el tipo de negocio. Incluye: sitio web + chatbot + WhatsApp + leads + Google Profile + Growth Playbook. Para obtener un presupuesto exacto en menos de 24 horas, contáctanos. ¿Seguimos?',
    options: [
      { label: '📩 Quiero el presupuesto', value: 'contact' },
      { label: '🔄 Empezar de nuevo', value: 'start' },
    ],
    mapOptions: { contact: 'answer_contact', start: 'start' },
  },
  price_inbox_info: {
    botMessage: 'Inbox AI™ tiene un valor mensual que depende del volumen de mensajes y configuración. Sin permanencia mínima. Para obtener el precio exacto para tu negocio, contáctanos.',
    options: [
      { label: '📩 Quiero el precio exacto', value: 'contact' },
      { label: '🔄 Empezar de nuevo', value: 'start' },
    ],
    mapOptions: { contact: 'answer_contact', start: 'start' },
  },
  price_smart_info: {
    botMessage: 'Smart System™ tiene precio mensual según el tipo de sistema y la complejidad de tu operación. Sin permanencia. Escribinos y te pasamos el presupuesto.',
    options: [
      { label: '📩 Quiero el precio exacto', value: 'contact' },
      { label: '🔄 Empezar de nuevo', value: 'start' },
    ],
    mapOptions: { contact: 'answer_contact', start: 'start' },
  },
  recommend_products: {
    botMessage: 'Podés ver todos nuestros sistemas en detalle en la página de productos. Cada uno incluye descripción completa, qué incluye, cómo funciona y casos de uso. ¿Querés ir ahí?',
    options: [
      { label: '📦 Ver todos los sistemas', value: '__products_page' },
      { label: '📩 Prefiero escribirles', value: 'contact' },
    ],
    mapOptions: { __products_page: '__products_page', contact: 'answer_contact' },
  },
}

export default function ChatbotDemoSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState('start')
  const [isTyping, setIsTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function addMessage(role: MessageRole, text: string) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role, text }])
  }

  function showBotMessage(stepKey: string) {
    const step = flow[stepKey]
    if (!step) return
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      addMessage('bot', step.botMessage)
      setCurrentStep(stepKey)
    }, 900)
  }

  function handleStart() {
    setStarted(true)
    showBotMessage('start')
  }

  function handleOption(option: Option) {
    addMessage('user', option.label)
    const step = flow[currentStep]
    const nextKey = step?.mapOptions?.[option.value]

    if (option.value === '__restart') {
      setTimeout(() => {
        setMessages([])
        setCurrentStep('start')
        setStarted(false)
        setStarted(true)
        showBotMessage('start')
      }, 400)
      return
    }

    if (option.value === '__contact_page' || option.value === '__products_page') {
      return
    }

    if (nextKey) {
      setTimeout(() => showBotMessage(nextKey), 400)
    }
  }

  function handleRestart() {
    setMessages([])
    setCurrentStep('start')
    setStarted(false)
    setTimeout(() => {
      setStarted(true)
      showBotMessage('start')
    }, 200)
  }

  const currentStepData = flow[currentStep]
  const lastMessageIsBot = messages.length > 0 && messages[messages.length - 1].role === 'bot'
  const showOptions = lastMessageIsBot && !isTyping && currentStepData?.options

  return (
    <section className="bg-zinc-950 min-h-screen pt-28 pb-24 px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full px-3 py-1 mb-6">
            Demo en vivo — 100% funcional
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Probá el chatbot
            <br />
            <span className="text-gradient">de ELARA.</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-lg mx-auto">
            Así funciona el chatbot comercial que instalamos en tu WhatsApp o sitio web. Sin IA, sin promesas vacías — solo un sistema que funciona.
          </p>
        </FadeIn>

        {/* Chat window */}
        <FadeIn direction="up" delay={0.1}>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Asistente ELARA</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-zinc-500">En línea</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleRestart}
                className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors"
                title="Reiniciar"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[420px] overflow-y-auto px-5 py-5 space-y-4">
              {!started && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <Bot className="w-7 h-7 text-blue-400" />
                  </div>
                  <p className="text-zinc-400 text-sm text-center max-w-xs">
                    Iniciá la conversación para ver cómo funciona el asistente comercial de ELARA.
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Iniciar demo
                  </button>
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'bot' ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                      {msg.role === 'bot' ? <Bot className="w-3 h-3 text-white" /> : <User className="w-3 h-3 text-white" />}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'bot'
                          ? 'bg-white/[0.06] text-zinc-200 rounded-bl-sm'
                          : 'bg-blue-600 text-white rounded-br-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
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

            {/* Options panel */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-white/[0.06] px-5 py-4 bg-white/[0.01]"
                >
                  <div className="flex flex-wrap gap-2">
                    {currentStepData.options!.map((option) => {
                      if (option.value === '__contact_page') {
                        return (
                          <Link
                            key={option.value}
                            href="/contacto"
                            className="flex-shrink-0 text-xs px-3.5 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors"
                          >
                            {option.label}
                          </Link>
                        )
                      }
                      if (option.value === '__products_page') {
                        return (
                          <Link
                            key={option.value}
                            href="/productos"
                            className="flex-shrink-0 text-xs px-3.5 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors"
                          >
                            {option.label}
                          </Link>
                        )
                      }
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleOption(option)}
                          className="flex-shrink-0 text-xs px-3.5 py-2 rounded-xl border border-white/[0.1] text-zinc-300 hover:bg-white/[0.06] hover:border-white/20 transition-all"
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* Info below */}
        <FadeIn direction="up" delay={0.2} className="mt-8 text-center">
          <p className="text-zinc-500 text-sm mb-2">
            Este es solo un demo. El chatbot real se configura con la información de tu negocio.
          </p>
          <Link
            href="/contacto"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
          >
            Quiero este chatbot en mi negocio →
          </Link>
        </FadeIn>

        {/* Feature highlights */}
        <FadeIn direction="up" delay={0.3}>
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { icon: '⚡', title: 'Respuesta en <30s', sub: 'Sin esperas' },
              { icon: '🎯', title: 'Deriva a ventas', sub: 'Guía al cliente' },
              { icon: '🔒', title: 'Sin IA externa', sub: 'Datos seguros' },
            ].map((f, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center">
                <span className="text-xl block mb-2">{f.icon}</span>
                <div className="text-xs font-medium text-white">{f.title}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{f.sub}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
