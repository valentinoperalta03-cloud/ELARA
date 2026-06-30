// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = 'presencia_digital' | 'automatizacion' | 'captacion' | 'organizacion' | 'marketing' | 'escalabilidad'
export type Level = 'low' | 'medium' | 'high'

export interface AnswerOption {
  label: string
  value: string
  scores?: Partial<Record<Category, number>>
  flags?: string[]
}

export interface Question {
  id: string
  question: string
  hint?: string
  options: AnswerOption[]
}

export interface CategoryResult {
  score: number
  level: Level
}

export type Scores = Record<Category, CategoryResult>

export interface RecommendedService {
  priority: number
  name: string
  slug: string
  badge: string
  description: string
  reason: string
}

export interface DiagnosticoResult {
  scores: Scores
  fortalezas: string[]
  oportunidades: string[]
  servicios: RecommendedService[]
  conclusion: string
}

// ─── Questions ────────────────────────────────────────────────────────────────

export const QUESTIONS: Question[] = [
  {
    id: 'pagina_web',
    question: '¿Tenés página web actualmente?',
    hint: 'Tu presencia online es la primera impresión que recibe un cliente.',
    options: [
      { label: '✅ Sí, tengo y está actualizada', value: 'si_actualizada', scores: { presencia_digital: 3 } },
      { label: '⚠️ Tengo algo, pero está desactualizada', value: 'desactualizada', scores: { presencia_digital: 1 } },
      { label: '📱 No, solo tengo redes sociales', value: 'solo_redes', scores: { presencia_digital: 0 }, flags: ['solo_redes'] },
      { label: '❌ No tengo presencia online', value: 'sin_presencia', scores: { presencia_digital: -2 }, flags: ['sin_presencia_digital'] },
    ],
  },
  {
    id: 'mensajes_diarios',
    question: '¿Cuántos mensajes de WhatsApp respondés por día?',
    hint: 'Contá consultas, pedidos, preguntas recurrentes... todo lo que entra.',
    options: [
      { label: '💬 Menos de 10, muy manejable', value: 'pocos', scores: { automatizacion: 2 } },
      { label: '📱 Entre 10 y 30', value: 'moderado', scores: { automatizacion: 0 } },
      { label: '🔥 Entre 30 y 60, ya es bastante', value: 'muchos', scores: { automatizacion: -1 }, flags: ['muchos_mensajes'] },
      { label: '😰 Más de 60, es muy demandante', value: 'demasiados', scores: { automatizacion: -3 }, flags: ['muchos_mensajes', 'sobrecarga'] },
    ],
  },
  {
    id: 'tiempo_respuesta',
    question: '¿Tardás en responder o a veces se te acumula?',
    options: [
      { label: '⚡ Respondo en minutos, siempre al día', value: 'rapido', scores: { automatizacion: 2 } },
      { label: '🕐 En pocas horas, llego a todo', value: 'normal', scores: { automatizacion: 1 } },
      { label: '😅 A veces tardo más de lo que quisiera', value: 'lento', scores: { automatizacion: -1 } },
      { label: '📮 Sí, siempre hay consultas sin responder', value: 'acumulado', scores: { automatizacion: -3 }, flags: ['consultas_sin_responder'] },
    ],
  },
  {
    id: 'consultas_fuera_horario',
    question: '¿Recibís consultas fuera del horario laboral?',
    options: [
      { label: '🌙 Sí, muchas, y no puedo atenderlas', value: 'muchas_sin_atencion', scores: { automatizacion: -2 }, flags: ['fuera_horario'] },
      { label: '📲 Sí, algunas, igual las atiendo', value: 'algunas', scores: { automatizacion: -1 } },
      { label: '🌅 Rara vez', value: 'rara_vez', scores: { automatizacion: 1 } },
      { label: '☀️ No, mis clientes consultan en horario normal', value: 'horario_normal', scores: { automatizacion: 2 } },
    ],
  },
  {
    id: 'info_accesible',
    question: '¿Tus clientes encuentran fácilmente la información de tu negocio?',
    hint: 'Precios, horarios, ubicación, servicios...',
    options: [
      { label: '✅ Sí, todo está centralizado y claro', value: 'centralizada', scores: { presencia_digital: 2 } },
      { label: '📲 Más o menos, está repartida en varias redes', value: 'dispersa', scores: { presencia_digital: 0 } },
      { label: '❓ No mucho, me preguntan todo el tiempo', value: 'no_accesible', scores: { presencia_digital: -2, automatizacion: -1 }, flags: ['info_dispersa'] },
    ],
  },
  {
    id: 'captacion_clientes',
    question: '¿Cómo conseguís la mayoría de tus clientes nuevos?',
    options: [
      { label: '🤝 Boca en boca / recomendaciones', value: 'recomendaciones', scores: { captacion: 0 }, flags: ['boca_boca'] },
      { label: '📸 Redes sociales', value: 'redes', scores: { captacion: 1, marketing: 1 } },
      { label: '📣 Publicidad pagada', value: 'publicidad', scores: { captacion: 2 } },
      { label: '🔍 Búsquedas en Google', value: 'google', scores: { captacion: 2, presencia_digital: 1 } },
      { label: '😕 Me cuesta conseguir clientes nuevos', value: 'dificultad', scores: { captacion: -3 }, flags: ['poca_captacion'] },
    ],
  },
  {
    id: 'redes_sociales',
    question: '¿Publicás contenido en redes sociales?',
    options: [
      { label: '🚀 Sí, varias veces por semana', value: 'activo', scores: { marketing: 3 } },
      { label: '📅 Sí, pero sin mucha frecuencia', value: 'irregular', scores: { marketing: 1 } },
      { label: '🦗 Casi no publico', value: 'poco', scores: { marketing: -2 }, flags: ['redes_inactivas'] },
      { label: '❌ No tengo redes activas', value: 'sin_redes', scores: { marketing: -3 }, flags: ['redes_inactivas', 'sin_redes'] },
    ],
  },
  {
    id: 'agenda',
    question: '¿Manejás turnos, reservas o agenda de clientes?',
    options: [
      { label: '💻 Sí, con un sistema digital', value: 'sistema_digital', scores: { organizacion: 3 } },
      { label: '📱 Sí, por WhatsApp o en papel', value: 'manual', scores: { organizacion: -1 }, flags: ['agenda_manual'] },
      { label: '📊 Sí, con Excel o planilla', value: 'excel', scores: { organizacion: 0 }, flags: ['agenda_excel'] },
      { label: '🚫 No manejo agenda', value: 'sin_agenda', scores: { organizacion: 1 } },
    ],
  },
  {
    id: 'metricas',
    question: '¿Medís los resultados de tu negocio?',
    hint: 'Ventas, clientes nuevos, qué funciona y qué no...',
    options: [
      { label: '📊 Sí, tengo métricas y las reviso seguido', value: 'metricas_activas', scores: { escalabilidad: 3 } },
      { label: '📈 Algo básico, como ventas totales', value: 'basico', scores: { escalabilidad: 1 } },
      { label: '🤔 No mucho, voy más por intuición', value: 'intuicion', scores: { escalabilidad: -2 }, flags: ['sin_metricas'] },
      { label: '❓ No, no sé bien por dónde empezar', value: 'sin_datos', scores: { escalabilidad: -3 }, flags: ['sin_metricas', 'sin_datos'] },
    ],
  },
  {
    id: 'mayor_dificultad',
    question: '¿Qué es lo que más te cuesta hoy?',
    options: [
      { label: '🎯 Conseguir más clientes nuevos', value: 'mas_clientes', scores: { captacion: -1 }, flags: ['objetivo_clientes'] },
      { label: '⏰ Responder todo a tiempo', value: 'tiempo', scores: { automatizacion: -1 }, flags: ['objetivo_tiempo'] },
      { label: '🌐 Que la gente me encuentre y confíe en mí', value: 'presencia', scores: { presencia_digital: -1 }, flags: ['objetivo_presencia'] },
      { label: '📋 Organizar mis procesos internos', value: 'organizacion', scores: { organizacion: -1 }, flags: ['objetivo_organizacion'] },
      { label: '📉 Saber qué está funcionando y qué no', value: 'metricas', scores: { escalabilidad: -1 }, flags: ['objetivo_metricas'] },
    ],
  },
  {
    id: 'objetivo_6_meses',
    question: '¿Qué objetivo querés lograr en los próximos 6 meses?',
    options: [
      { label: '💰 Conseguir más clientes y aumentar ventas', value: 'mas_ventas', flags: ['meta_clientes'] },
      { label: '⚙️ Ahorrar tiempo y automatizar mi trabajo', value: 'automatizar', flags: ['meta_automatizar'] },
      { label: '✨ Mejorar mi imagen y presencia digital', value: 'imagen', flags: ['meta_presencia'] },
      { label: '📐 Organizar mejor mis procesos', value: 'organizar', flags: ['meta_organizacion'] },
      { label: '🚀 Crecer y escalar mi negocio', value: 'escalar', flags: ['meta_escalar'] },
    ],
  },
]

// ─── Scoring engine ───────────────────────────────────────────────────────────

const THRESHOLDS: Record<Category, { medium: number; high: number }> = {
  presencia_digital: { medium: 1, high: 4 },
  automatizacion:    { medium: 0, high: 3 },
  captacion:         { medium: 1, high: 2 },
  organizacion:      { medium: 1, high: 3 },
  marketing:         { medium: 1, high: 3 },
  escalabilidad:     { medium: 1, high: 3 },
}

function getLevel(category: Category, score: number): Level {
  const t = THRESHOLDS[category]
  if (score >= t.high) return 'high'
  if (score >= t.medium) return 'medium'
  return 'low'
}

function computeScores(answers: Record<string, string>): { scores: Scores; flags: string[] } {
  const raw: Record<Category, number> = {
    presencia_digital: 0, automatizacion: 0, captacion: 0,
    organizacion: 0, marketing: 0, escalabilidad: 0,
  }
  const flags: string[] = []

  for (const question of QUESTIONS) {
    const selectedValue = answers[question.id]
    if (!selectedValue) continue
    const option = question.options.find(o => o.value === selectedValue)
    if (!option) continue

    if (option.scores) {
      for (const [cat, pts] of Object.entries(option.scores)) {
        raw[cat as Category] += pts
      }
    }
    if (option.flags) flags.push(...option.flags)
  }

  const scores = {} as Scores
  for (const cat of Object.keys(raw) as Category[]) {
    scores[cat] = { score: raw[cat], level: getLevel(cat, raw[cat]) }
  }

  return { scores, flags }
}

// ─── Service recommendations ──────────────────────────────────────────────────

interface ServiceDef {
  name: string
  slug: string
  badge: string
  description: string
  relevance: (scores: Scores, flags: string[]) => number
  reason: (scores: Scores, flags: string[]) => string
}

const SERVICES: ServiceDef[] = [
  {
    name: 'Inbox AI™',
    slug: 'inbox-ai',
    badge: 'Mensual',
    description: 'Atención automática por WhatsApp 24/7',
    relevance: (s, f) => {
      let r = 0
      if (s.automatizacion.level === 'low') r += 4
      if (s.automatizacion.level === 'medium') r += 1
      if (f.includes('muchos_mensajes')) r += 2
      if (f.includes('fuera_horario')) r += 2
      if (f.includes('consultas_sin_responder')) r += 2
      if (f.includes('objetivo_tiempo') || f.includes('meta_automatizar')) r += 2
      if (f.includes('info_dispersa')) r += 1
      return r
    },
    reason: (s, f) => {
      if (f.includes('fuera_horario') && f.includes('muchos_mensajes')) return 'Recibís muchas consultas y también fuera del horario laboral. Inbox AI™ responde automáticamente las 24 horas, para que ningún cliente quede sin respuesta.'
      if (f.includes('muchos_mensajes')) return 'Con el volumen de mensajes que manejás, automatizar las respuestas frecuentes puede ahorrarte horas de trabajo por semana sin perder la calidez en la atención.'
      if (f.includes('fuera_horario')) return 'Las consultas fuera de horario son oportunidades que hoy se pierden. Con Inbox AI™, tu negocio atiende solo mientras vos descansás.'
      return 'Automatizar la atención por WhatsApp te libera tiempo para enfocarte en lo que realmente hace crecer tu negocio.'
    },
  },
  {
    name: 'Smart System™',
    slug: 'smart-system',
    badge: 'Mensual',
    description: 'Sistema de turnos, reservas o ventas',
    relevance: (s, f) => {
      let r = 0
      if (s.organizacion.level === 'low') r += 3
      if (s.organizacion.level === 'medium') r += 1
      if (f.includes('agenda_manual')) r += 3
      if (f.includes('agenda_excel')) r += 2
      if (f.includes('objetivo_organizacion') || f.includes('meta_organizacion')) r += 2
      return r
    },
    reason: (s, f) => {
      if (f.includes('agenda_manual')) return 'Manejar turnos por WhatsApp o en papel consume tiempo y genera errores. Smart System™ automatiza toda la gestión de agenda, recordatorios y confirmaciones.'
      if (f.includes('agenda_excel')) return 'Las planillas de Excel son un primer paso, pero limitan el crecimiento. Smart System™ digitaliza tu operación y escala con tu negocio.'
      return 'Organizar mejor tus procesos internos te permite crecer sin que el caos crezca con vos.'
    },
  },
  {
    name: 'Social AI™',
    slug: 'social-ai',
    badge: 'Mensual',
    description: 'Calendario de contenido + carruseles generados con IA',
    relevance: (s, f) => {
      let r = 0
      if (s.marketing.level === 'low') r += 4
      if (s.marketing.level === 'medium') r += 2
      if (f.includes('redes_inactivas')) r += 3
      if (f.includes('sin_redes')) r += 1
      if (f.includes('poca_captacion')) r += 1
      if (f.includes('objetivo_clientes') || f.includes('meta_clientes')) r += 1
      return r
    },
    reason: (s, f) => {
      if (f.includes('sin_redes')) return 'No tener redes activas hoy significa dejarle el espacio a la competencia. Social AI™ te crea un calendario de contenido y genera las publicaciones por vos.'
      if (f.includes('redes_inactivas')) return 'Las redes sin constancia no generan resultados. Social AI™ mantiene tu presencia activa de forma automática, sin que tengas que pensar qué publicar cada semana.'
      return 'El contenido consistente en redes es uno de los canales más efectivos para atraer clientes nuevos sin invertir en publicidad.'
    },
  },
  {
    name: 'Leads AI™',
    slug: 'leads-ai',
    badge: 'Mensual',
    description: 'Prospección automática de clientes nuevos',
    relevance: (s, f) => {
      let r = 0
      if (s.captacion.level === 'low') r += 4
      if (s.captacion.level === 'medium') r += 1
      if (f.includes('poca_captacion')) r += 3
      if (f.includes('boca_boca')) r += 2
      if (f.includes('objetivo_clientes') || f.includes('meta_clientes')) r += 2
      return r
    },
    reason: (s, f) => {
      if (f.includes('poca_captacion')) return 'Conseguir clientes nuevos es tu principal desafío ahora mismo. Leads AI™ automatiza la prospección para que tengas un flujo constante de oportunidades de venta.'
      if (f.includes('boca_boca')) return 'Las recomendaciones son fantásticas, pero depender solo de ellas limita el crecimiento. Leads AI™ agrega un canal sistemático para conseguir clientes nuevos todos los meses.'
      return 'Tener un sistema activo de captación de clientes es lo que separa a los negocios que crecen de los que se estancan.'
    },
  },
  {
    name: 'Insights™',
    slug: 'insights',
    badge: 'Mensual',
    description: 'Reportes, métricas y automatizaciones estratégicas',
    relevance: (s, f) => {
      let r = 0
      if (s.escalabilidad.level === 'low') r += 4
      if (s.escalabilidad.level === 'medium') r += 2
      if (f.includes('sin_metricas')) r += 3
      if (f.includes('sin_datos')) r += 1
      if (f.includes('objetivo_metricas') || f.includes('meta_escalar')) r += 2
      // También relevante para negocios consolidados
      const allHigh = Object.values(s).filter(c => c.level === 'high').length >= 4
      if (allHigh) r += 3
      return r
    },
    reason: (s, f) => {
      if (f.includes('sin_metricas')) return 'Tomar decisiones sin datos concretos es como manejar con los ojos cerrados. Insights™ te da visibilidad real sobre qué está funcionando y dónde están las oportunidades.'
      const allHigh = Object.values(s).filter(c => c.level === 'high').length >= 4
      if (allHigh) return 'Tu negocio ya tiene una base digital sólida. En esta etapa, medir y optimizar cada proceso es lo que lleva un buen negocio a uno excelente.'
      return 'A medida que tu negocio crezca, tener datos claros te permite tomar mejores decisiones y crecer de forma sostenida.'
    },
  },
]

// ─── Result builder ───────────────────────────────────────────────────────────

function buildFortalezas(scores: Scores, flags: string[]): string[] {
  const list: Array<{ condition: boolean; text: string }> = [
    { condition: scores.presencia_digital.level !== 'low', text: 'Tenés presencia digital establecida.' },
    { condition: scores.automatizacion.level !== 'low', text: 'Respondés activamente a las consultas de tus clientes.' },
    { condition: scores.captacion.level !== 'low', text: 'Tu negocio ya genera clientes y consultas de forma regular.' },
    { condition: scores.organizacion.level === 'high', text: 'Tus operaciones están bien organizadas y digitalizadas.' },
    { condition: scores.marketing.level !== 'low', text: 'Tenés presencia activa en redes sociales.' },
    { condition: scores.escalabilidad.level !== 'low', text: 'Medís resultados y tomás decisiones con información concreta.' },
    { condition: flags.includes('boca_boca'), text: 'Tus clientes te recomiendan — eso habla muy bien de tu trabajo.' },
    { condition: scores.presencia_digital.level === 'high', text: 'Tu imagen online transmite confianza y profesionalismo.' },
    { condition: scores.marketing.level === 'high', text: 'Publicás contenido de forma constante, eso construye comunidad.' },
  ]

  const fortalezas = list.filter(i => i.condition).map(i => i.text)

  // Always at least 2 fortalezas - add generic ones if needed
  if (fortalezas.length === 0) {
    fortalezas.push('Ya estás tomando decisiones activas para mejorar tu negocio.')
    fortalezas.push('Tu negocio genera consultas, lo que indica que hay demanda real.')
  } else if (fortalezas.length === 1) {
    fortalezas.push('Ya estás tomando decisiones activas para mejorar tu negocio.')
  }

  return fortalezas.slice(0, 4)
}

function buildOportunidades(scores: Scores, flags: string[]): string[] {
  const list: Array<{ condition: boolean; text: string }> = [
    { condition: scores.presencia_digital.level === 'low' && flags.includes('sin_presencia_digital'), text: 'Crear una presencia digital profesional que transmita confianza.' },
    { condition: scores.presencia_digital.level === 'low' && !flags.includes('sin_presencia_digital'), text: 'Centralizar la información de tu negocio para que sea fácil de encontrar.' },
    { condition: scores.automatizacion.level === 'low' && flags.includes('muchos_mensajes'), text: 'Automatizar las consultas frecuentes para recuperar horas de trabajo por semana.' },
    { condition: scores.automatizacion.level === 'low' && flags.includes('fuera_horario'), text: 'Atender clientes fuera del horario laboral sin trabajar más horas.' },
    { condition: scores.automatizacion.level === 'low' && !flags.includes('muchos_mensajes'), text: 'Reducir el tiempo dedicado a respuestas manuales y repetitivas.' },
    { condition: scores.captacion.level === 'low', text: 'Implementar un sistema que genere clientes nuevos de forma constante.' },
    { condition: flags.includes('boca_boca') && scores.captacion.level !== 'high', text: 'Agregar un canal de captación activo además de las recomendaciones.' },
    { condition: scores.organizacion.level === 'low' && flags.includes('agenda_manual'), text: 'Digitalizar la gestión de turnos y reservas para eliminar errores y ahorrar tiempo.' },
    { condition: scores.marketing.level === 'low', text: 'Construir presencia en redes con contenido constante y estratégico.' },
    { condition: scores.escalabilidad.level === 'low', text: 'Medir resultados concretos para tomar decisiones basadas en datos.' },
  ]

  return list.filter(i => i.condition).map(i => i.text).slice(0, 4)
}

function buildConclusion(scores: Scores, flags: string[]): string {
  const highCount = Object.values(scores).filter(c => c.level === 'high').length
  const lowCount = Object.values(scores).filter(c => c.level === 'low').length

  if (highCount >= 4) {
    return 'Tu negocio ya cuenta con una base digital muy sólida — eso te pone por delante de la mayoría en tu rubro. En esta etapa, las mayores oportunidades están en optimizar procesos, automatizar tareas repetitivas y usar datos para seguir creciendo de manera más eficiente. En Elara trabajamos con negocios exactamente en esta etapa: los que ya funcionan bien y quieren funcionar excelente.'
  }
  if (lowCount >= 4) {
    return 'Estás en el momento ideal para empezar a construir sistemas que trabajen por vos. Muchos negocios exitosos empezaron exactamente donde estás hoy. En Elara identificamos las oportunidades más concretas para que en pocos meses sientas una diferencia real: más clientes, menos tiempo manual y una imagen profesional que genere confianza.'
  }
  if (flags.includes('poca_captacion') || flags.includes('objetivo_clientes')) {
    return 'Tu negocio tiene potencial claro, y los datos del diagnóstico muestran que la mayor oportunidad está en el flujo de clientes nuevos. Resolver eso, combinado con algunas mejoras en presencia digital y automatización, puede cambiar los resultados de tu negocio en cuestión de semanas.'
  }
  if (flags.includes('meta_automatizar') || flags.includes('objetivo_tiempo')) {
    return 'Tu negocio ya tiene movimiento, y eso es una gran base. El paso que más impacto puede generar ahora es recuperar el tiempo que perdés en tareas manuales. Automatizar lo repetitivo no solo te libera energía, también te permite atender mejor a cada cliente.'
  }
  return 'Detectamos varias oportunidades concretas para que tu negocio crezca de forma más eficiente. El diagnóstico nos muestra un camino claro: mejorar presencia digital, automatizar procesos clave y construir sistemas que trabajen por vos. En Elara acompañamos exactamente ese proceso.'
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function buildResult(answers: Record<string, string>): DiagnosticoResult {
  const { scores, flags } = computeScores(answers)

  // Rank services by relevance
  const ranked = SERVICES
    .map(s => ({ ...s, rel: s.relevance(scores, flags) }))
    .filter(s => s.rel > 0)
    .sort((a, b) => b.rel - a.rel)
    .slice(0, 3)

  const servicios: RecommendedService[] = ranked.map((s, i) => ({
    priority: i + 1,
    name: s.name,
    slug: s.slug,
    badge: s.badge,
    description: s.description,
    reason: s.reason(scores, flags),
  }))

  // If no services recommended (very positive profile), recommend Insights
  if (servicios.length === 0) {
    const insights = SERVICES.find(s => s.slug === 'insights')!
    servicios.push({
      priority: 1,
      name: insights.name,
      slug: insights.slug,
      badge: insights.badge,
      description: insights.description,
      reason: 'Tu negocio tiene una base excelente. El siguiente nivel es optimizar y medir cada proceso para escalar con datos reales.',
    })
  }

  return {
    scores,
    fortalezas: buildFortalezas(scores, flags),
    oportunidades: buildOportunidades(scores, flags),
    servicios,
    conclusion: buildConclusion(scores, flags),
  }
}

export const CATEGORY_LABELS: Record<Category, string> = {
  presencia_digital: 'Presencia digital',
  automatizacion: 'Automatización',
  captacion: 'Captación de clientes',
  organizacion: 'Organización',
  marketing: 'Marketing',
  escalabilidad: 'Escalabilidad',
}

export const CATEGORY_MAX: Record<Category, number> = {
  presencia_digital: 6,
  automatizacion: 6,
  captacion: 4,
  organizacion: 4,
  marketing: 4,
  escalabilidad: 4,
}
