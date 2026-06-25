export type ProductType = 'one_time' | 'subscription'

export interface ProductFAQ {
  q: string
  a: string
}

export interface ProductStep {
  number: string
  title: string
  description: string
}

export interface ProductUseCase {
  icon: string
  title: string
  description: string
}

export interface ProductInclude {
  title: string
  description: string
}

export interface Product {
  slug: string
  name: string
  badge: string
  tagline: string
  description: string
  type: ProductType
  price: string
  priceSub: string
  color: string
  accentColor: string
  icon: string
  hero: {
    headline: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    stat1: { value: string; label: string }
    stat2: { value: string; label: string }
    stat3: { value: string; label: string }
  }
  problem: {
    headline: string
    body: string
    items: string[]
  }
  solution: {
    headline: string
    body: string
  }
  includes: ProductInclude[]
  howItWorks: ProductStep[]
  useCases: ProductUseCase[]
  benefits: string[]
  faq: ProductFAQ[]
}

export const products: Product[] = [
  {
    slug: 'elara-launch',
    name: 'ELARA Launch™',
    badge: 'Pago único',
    tagline: 'Tu sistema comercial completo, listo en 7 días.',
    description:
      'No es una página web. Es el sistema comercial de tu negocio. Sitio profesional, chatbot, WhatsApp, reseñas, captura de leads y presencia digital optimizada.',
    type: 'one_time',
    price: 'ARS 39.990',
    priceSub: 'Pago único · Sin mensualidades',
    color: 'from-blue-600 to-indigo-600',
    accentColor: 'blue',
    icon: '⚡',
    hero: {
      headline: 'Instalamos el sistema comercial de tu negocio.',
      sub: 'No estás comprando una página web. Estás instalando la infraestructura comercial que convierte visitantes en clientes — automáticamente, 24/7.',
      ctaPrimary: 'Quiero mi sistema',
      ctaSecondary: 'Ver qué incluye',
      stat1: { value: '7', label: 'días de implementación' },
      stat2: { value: '24/7', label: 'captura de leads' },
      stat3: { value: '1', label: 'pago único' },
    },
    problem: {
      headline: 'Tu negocio pierde clientes mientras cerrás los ojos.',
      body: 'Cada hora sin respuesta es un cliente que se fue a la competencia. Cada perfil de Google sin optimizar es visibilidad que perdés. Cada formulario de contacto sin respuesta automática es dinero que dejás sobre la mesa.',
      items: [
        'Clientes que te buscan y no te encuentran online',
        'Mensajes sin respuesta por horas o días',
        'Sin sistema para capturar datos de interesados',
        'Perfil de Google sin reseñas ni información correcta',
        'Presencia digital que no genera confianza ni acción',
      ],
    },
    solution: {
      headline: 'Un sistema que trabaja mientras vos hacés lo que sabés hacer.',
      body: 'ELARA Launch™ instala en tu negocio todo lo que necesitás para atraer, capturar y convertir clientes — sin que tengas que entender de tecnología ni dedicarle tiempo.',
    },
    includes: [
      {
        title: 'Sitio web profesional',
        description:
          'Diseño moderno, rápido y optimizado para conversión. Con secciones de servicios, testimonios, galería y formulario de contacto.',
      },
      {
        title: 'Chatbot comercial',
        description:
          'Responde consultas frecuentes, captura datos de contacto y guía a los clientes hacia la compra — sin que vos tengas que estar.',
      },
      {
        title: 'Botón WhatsApp directo',
        description:
          'Integración con WhatsApp Business para que los clientes te contacten con un clic, desde cualquier dispositivo.',
      },
      {
        title: 'Sistema de captura de leads',
        description:
          'Formularios inteligentes que guardan automáticamente los datos de cada interesado. Nunca más pierdas un contacto.',
      },
      {
        title: 'Perfil de Google optimizado',
        description:
          'Configuración y optimización de tu Google Business Profile para aparecer en búsquedas locales y en Google Maps.',
      },
      {
        title: 'Estrategia de reseñas',
        description:
          'Sistema para conseguir más reseñas de forma natural y consistente, aumentando tu reputación digital.',
      },
      {
        title: 'Growth Playbook',
        description:
          'Manual personalizado con las acciones exactas para seguir creciendo después de la implementación.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Relevamiento',
        description:
          'Te hacemos las preguntas clave sobre tu negocio, tu cliente ideal y tus objetivos comerciales.',
      },
      {
        number: '02',
        title: 'Diseño y armado',
        description:
          'Nuestro equipo diseña y construye tu sistema comercial completo en menos de 7 días hábiles.',
      },
      {
        number: '03',
        title: 'Revisión y ajustes',
        description:
          'Revisás todo, pedís los cambios que necesitás y lo aprobamos juntos antes de publicar.',
      },
      {
        number: '04',
        title: 'Lanzamiento',
        description:
          'Publicamos tu sistema y te capacitamos para manejarlo. Soporte incluido los primeros 30 días.',
      },
    ],
    useCases: [
      {
        icon: '🏋️',
        title: 'Gimnasios y estudios',
        description:
          'Sistema que muestra clases, horarios y captura inscripciones automáticamente.',
      },
      {
        icon: '✂️',
        title: 'Peluquerías y barberías',
        description:
          'Presencia digital que atrae nuevos clientes y gestiona la agenda.',
      },
      {
        icon: '🏥',
        title: 'Profesionales de la salud',
        description:
          'Perfil profesional que genera confianza y recibe consultas 24/7.',
      },
      {
        icon: '🍕',
        title: 'Restaurantes y cafeterías',
        description:
          'Menú digital, reseñas y presencia en Google Maps optimizada.',
      },
      {
        icon: '🏠',
        title: 'Inmobiliarias',
        description:
          'Sistema para mostrar propiedades y capturar datos de compradores interesados.',
      },
      {
        icon: '⚙️',
        title: 'Talleres y servicios técnicos',
        description:
          'Profesionalizar la imagen y capturar solicitudes de presupuesto automáticamente.',
      },
    ],
    benefits: [
      'Más visibilidad en Google y redes',
      'Más leads capturados automáticamente',
      'Primera impresión profesional y de confianza',
      'Sin mensualidades ni contratos',
      'Listo en 7 días hábiles',
      'Soporte incluido los primeros 30 días',
      'Sin necesidad de conocimientos técnicos',
    ],
    faq: [
      {
        q: '¿Es solo una página web?',
        a: 'No. ELARA Launch™ es un sistema comercial completo. El sitio web es solo uno de los componentes. Lo acompañan un chatbot, integración con WhatsApp, sistema de captura de leads, perfil de Google optimizado y una estrategia de reseñas.',
      },
      {
        q: '¿Cuánto tarda la implementación?',
        a: 'El proceso completo lleva entre 5 y 7 días hábiles desde que nos pasás la información de tu negocio.',
      },
      {
        q: '¿Qué pasa después de los 30 días de soporte?',
        a: 'El sistema es tuyo y sigue funcionando sin ningún costo adicional. Si querés soporte continuo o agregar sistemas mensuales, tenés acceso a toda la suite de productos ELARA.',
      },
      {
        q: '¿Necesito saber de tecnología para manejarlo?',
        a: 'Para nada. Te entregamos el sistema funcionando y te explicamos las únicas cosas que vas a necesitar tocar. Está diseñado para que cualquier persona pueda administrarlo.',
      },
      {
        q: '¿Incluye hosting y dominio?',
        a: 'Los costos de hosting y dominio son aparte pero mínimos (menos de $15/mes). Te ayudamos a configurarlos y te explicamos todo.',
      },
    ],
  },

  {
    slug: 'inbox-ai',
    name: 'Inbox AI™',
    badge: 'Servicio mensual',
    tagline: 'Nunca más perdés un cliente por no responder a tiempo.',
    description:
      'Atención por WhatsApp las 24 horas, los 7 días. Responde consultas, captura datos y deriva hacia la venta — mientras vos hacés lo que importa.',
    type: 'subscription',
    price: 'ARS 69.990',
    priceSub: 'por mes · o ARS 671.904/año (20% off)',
    color: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    icon: '💬',
    hero: {
      headline: 'Tu negocio responde en segundos. Aunque sean las 3 de la mañana.',
      sub: 'Inbox AI™ atiende a tus clientes por WhatsApp de forma automática, captura sus datos y los guía hacia la compra sin que vos tengas que estar presente.',
      ctaPrimary: 'Quiero Inbox AI™',
      ctaSecondary: 'Ver cómo funciona',
      stat1: { value: '<30s', label: 'tiempo de respuesta' },
      stat2: { value: '24/7', label: 'atención continua' },
      stat3: { value: '+40%', label: 'más conversiones' },
    },
    problem: {
      headline: 'Cada mensaje sin responder es plata que se va.',
      body: 'Un cliente que pregunta y no recibe respuesta en los próximos minutos, se va. Así de simple. Y en la mayoría de los negocios, responder rápido es humanamente imposible.',
      items: [
        'Mensajes de clientes que llegan fuera del horario comercial',
        'Consultas que se quedan sin respuesta por horas',
        'Tiempo valioso del equipo respondiendo siempre las mismas preguntas',
        'Clientes perdidos antes de que puedas hablar con ellos',
        'Sin registro de quién preguntó ni qué quería',
      ],
    },
    solution: {
      headline: 'Un asistente inteligente que nunca duerme y nunca olvida.',
      body: 'Inbox AI™ instala en tu WhatsApp Business un sistema de atención automatizada que responde al instante, captura los datos del interesado y lo guía hacia la compra o el turno — sin intervención humana.',
    },
    includes: [
      {
        title: 'Atención 24/7 por WhatsApp',
        description: 'Respuestas automáticas configuradas con la información de tu negocio, servicios y precios.',
      },
      {
        title: 'Flujo de preguntas frecuentes',
        description: 'Armamos el árbol de conversación con las consultas más comunes de tus clientes.',
      },
      {
        title: 'Captura automática de leads',
        description: 'Cada interesado que escribe queda registrado con nombre, teléfono y lo que está buscando.',
      },
      {
        title: 'Derivación a humano',
        description: 'Cuando la conversación lo requiere, transfiere automáticamente al encargado correcto.',
      },
      {
        title: 'Panel de conversaciones',
        description: 'Ves todos los chats, los leads capturados y el historial desde un solo lugar.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Relevamiento',
        description: 'Nos pasás la información de tu negocio: servicios, precios, horarios y preguntas frecuentes.',
      },
      {
        number: '02',
        title: 'Configuración',
        description: 'Armamos el flujo de conversación y lo conectamos a tu WhatsApp Business.',
      },
      {
        number: '03',
        title: 'Pruebas',
        description: 'Testeamos todos los escenarios y ajustamos hasta que esté perfecto.',
      },
      {
        number: '04',
        title: 'Activo',
        description: 'Tu WhatsApp empieza a responder solo. Cada mes ajustamos y mejoramos el flujo.',
      },
    ],
    useCases: [
      { icon: '🏋️', title: 'Gimnasios', description: 'Responde horarios, precios e inscripciones automáticamente.' },
      { icon: '🍽️', title: 'Restaurantes', description: 'Gestiona reservas y consultas sobre el menú al instante.' },
      { icon: '💆', title: 'Centros de estética', description: 'Agenda turnos y responde consultas sin levantar el teléfono.' },
      { icon: '🏥', title: 'Consultorios', description: 'Turnos y derivaciones sin que el profesional intervenga.' },
      { icon: '🛍️', title: 'Comercios', description: 'Stock, precios y pedidos gestionados automáticamente.' },
      { icon: '🏠', title: 'Inmobiliarias', description: 'Primer contacto e información de propiedades disponible 24/7.' },
    ],
    benefits: [
      'Tiempo de respuesta menor a 30 segundos',
      'Cero clientes perdidos por falta de respuesta',
      'Tu equipo libre de responder lo mismo de siempre',
      'Leads capturados y organizados automáticamente',
      'Ajustes y mejoras incluidas cada mes',
    ],
    faq: [
      {
        q: '¿Necesito tener WhatsApp Business?',
        a: 'Sí. Si no lo tenés, te ayudamos a configurarlo sin costo adicional.',
      },
      {
        q: '¿Qué pasa con las consultas complejas?',
        a: 'El sistema detecta cuando una consulta necesita atención humana y deriva automáticamente al encargado.',
      },
      {
        q: '¿Puedo modificar las respuestas?',
        a: 'Sí. Cada mes revisamos juntos el flujo y hacemos los ajustes que necesitás.',
      },
      {
        q: '¿Se puede conectar con mi CRM?',
        a: 'Dependiendo del CRM, sí. Consultanos tu caso específico.',
      },
    ],
  },

  {
    slug: 'smart-system',
    name: 'Smart System™',
    badge: 'Servicio mensual',
    tagline: 'Tu negocio funciona solo. Vos hacés lo que importa.',
    description:
      'Sistema de turnos, reservas o ventas implementado y mantenido. Tu operación en piloto automático.',
    type: 'subscription',
    price: 'ARS 69.990',
    priceSub: 'por mes · o ARS 671.904/año (20% off)',
    color: 'from-violet-500 to-purple-600',
    accentColor: 'violet',
    icon: '⚙️',
    hero: {
      headline: 'Instalamos el sistema que hace funcionar tu operación sola.',
      sub: 'Smart System™ implementa y mantiene el sistema de gestión que tu negocio necesita — turnos, reservas, ventas o lo que sea — para que puedas escalar sin contratar más gente.',
      ctaPrimary: 'Quiero Smart System™',
      ctaSecondary: 'Ver cómo funciona',
      stat1: { value: '-80%', label: 'tiempo en gestión' },
      stat2: { value: '0', label: 'doble agenda' },
      stat3: { value: '24/7', label: 'disponibilidad' },
    },
    problem: {
      headline: 'Cada hora que pasás gestionando es una hora que no estás vendiendo.',
      body: 'La gestión manual de turnos, reservas y operaciones consume tiempo, genera errores y te mantiene atado al negocio. El resultado: no podés crecer porque estás ocupado administrando.',
      items: [
        'Agenda manual con riesgo de solapamientos',
        'Horas perdidas coordinando por WhatsApp y teléfono',
        'Sin visibilidad de disponibilidad en tiempo real',
        'Clientes que no pueden reservar fuera del horario de atención',
        'Operaciones que dependen de que vos estés presente',
      ],
    },
    solution: {
      headline: 'Un sistema que gestiona solo, sin errores y sin que vos tengas que estar.',
      body: 'Smart System™ implementa el sistema de gestión correcto para tu tipo de negocio — ya sea turnos, reservas, pedidos o servicios — y lo mantiene funcionando y actualizado cada mes.',
    },
    includes: [
      { title: 'Implementación del sistema', description: 'Configuramos la herramienta correcta para tu tipo de negocio y la adaptamos a tu operación.' },
      { title: 'Integración con tu sitio web', description: 'Los clientes pueden reservar o agendar directamente desde tu web, sin intermediarios.' },
      { title: 'Notificaciones automáticas', description: 'Recordatorios a clientes y al equipo. Menos ausencias, más orden.' },
      { title: 'Panel de control', description: 'Vista completa de tu agenda, disponibilidad y estado de cada reserva en tiempo real.' },
      { title: 'Mantenimiento mensual', description: 'Ajustamos, actualizamos y mejoramos el sistema cada mes según tu operación.' },
    ],
    howItWorks: [
      { number: '01', title: 'Diagnóstico', description: 'Entendemos tu operación actual, los cuellos de botella y qué sistema se adapta mejor.' },
      { number: '02', title: 'Implementación', description: 'Configuramos el sistema completo y lo integramos con tu web y comunicaciones.' },
      { number: '03', title: 'Capacitación', description: 'Vos y tu equipo aprenden a usarlo en menos de una hora.' },
      { number: '04', title: 'Operación continua', description: 'El sistema trabaja solo. Cada mes revisamos y mejoramos.' },
    ],
    useCases: [
      { icon: '💆', title: 'Centros de estética', description: 'Agenda de turnos online sin llamadas ni mensajes.' },
      { icon: '🏋️', title: 'Gimnasios', description: 'Reservas de clases y gestión de capacidad automática.' },
      { icon: '🏥', title: 'Consultorios', description: 'Agenda de pacientes sin sobrecarga administrativa.' },
      { icon: '🏠', title: 'Alojamientos', description: 'Reservas y disponibilidad en tiempo real.' },
      { icon: '📸', title: 'Fotógrafos/creativos', description: 'Agenda de sesiones y presupuestos gestionados solos.' },
      { icon: '🎓', title: 'Academias', description: 'Inscripciones y seguimiento de alumnos automatizados.' },
    ],
    benefits: [
      '80% menos tiempo en gestión administrativa',
      'Cero solapamientos ni errores de agenda',
      'Clientes que reservan solos, en cualquier horario',
      'Visibilidad total de tu operación en tiempo real',
      'Sistema adaptado exactamente a tu negocio',
    ],
    faq: [
      { q: '¿Qué herramienta usan?', a: 'Depende de tu tipo de negocio. Evaluamos las mejores opciones (Calendly, Acuity, SimplyBook, o herramientas específicas del rubro) y elegimos la más adecuada.' },
      { q: '¿Mis clientes necesitan descargarse algo?', a: 'No. El sistema funciona desde el navegador, sin apps adicionales.' },
      { q: '¿Puedo seguir tomando turnos por WhatsApp?', a: 'Sí. El sistema puede coexistir con tus canales actuales mientras hacés la transición.' },
    ],
  },

  {
    slug: 'social-ai',
    name: 'Social AI™',
    badge: 'Servicio mensual',
    tagline: 'Contenido de marca todos los meses. Sin que te dediques a diseñar.',
    description:
      'Calendario mensual de contenidos + carruseles profesionales. Tu presencia en Instagram sin que tengas que pensar en qué publicar.',
    type: 'subscription',
    price: 'ARS 69.990',
    priceSub: 'por mes · o ARS 671.904/año (20% off)',
    color: 'from-pink-500 to-rose-500',
    accentColor: 'pink',
    icon: '📱',
    hero: {
      headline: 'Tu marca presente en Instagram. Sin que vos pierdas tiempo en eso.',
      sub: 'Social AI™ produce tu contenido mensual de redes sociales — estratégico, visual y orientado a conversión — para que nunca más tengas que preguntarte qué publicar.',
      ctaPrimary: 'Quiero Social AI™',
      ctaSecondary: 'Ver ejemplos',
      stat1: { value: '4', label: 'carruseles mensuales' },
      stat2: { value: '0h', label: 'de tu tiempo' },
      stat3: { value: '100%', label: 'alineado a tu marca' },
    },
    problem: {
      headline: 'Publicar en Instagram es importante. Pero nadie tiene tiempo para hacerlo bien.',
      body: 'Crear contenido de calidad requiere tiempo, creatividad, estrategia y diseño. La mayoría de los negocios publica poco, mal o directamente no publica. El resultado: invisibilidad.',
      items: [
        'Sin tiempo para crear contenido consistente',
        'Publicaciones sin estrategia ni hilo conductor',
        'Diseños que no representan bien la marca',
        'Meses sin publicar nada',
        'Contenido genérico que no genera engagement ni ventas',
      ],
    },
    solution: {
      headline: 'Tu contenido listo cada mes. Estratégico, visual, y con tu voz.',
      body: 'Social AI™ produce mensualmente tu calendario de contenidos con carruseles diseñados profesionalmente, alineados a tu marca y orientados a convertir seguidores en clientes.',
    },
    includes: [
      { title: '4 carruseles mensuales', description: 'Carruseles de Instagram diseñados profesionalmente con copy estratégico y diseño de marca.' },
      { title: 'Calendario de contenidos', description: 'Planificación de qué publicar, cuándo y con qué objetivo cada semana del mes.' },
      { title: 'Copywriting incluido', description: 'Textos, captions y hashtags redactados por nosotros con tu voz y tus objetivos.' },
      { title: 'Diseño alineado a tu marca', description: 'Paleta de colores, tipografía y estética que representan exactamente tu negocio.' },
      { title: 'Revisiones incluidas', description: 'Ajustamos cada pieza hasta que estés conforme antes de publicar.' },
    ],
    howItWorks: [
      { number: '01', title: 'Briefing inicial', description: 'Conocemos tu marca, tu audiencia, tu voz y tus objetivos de comunicación.' },
      { number: '02', title: 'Planificación', description: 'Definimos el calendario mensual con los temas, formatos y objetivos de cada publicación.' },
      { number: '03', title: 'Producción', description: 'Creamos todos los carruseles y los entregamos para revisión.' },
      { number: '04', title: 'Publicación', description: 'Aplicás los ajustes finales y publicás según el calendario.' },
    ],
    useCases: [
      { icon: '🏋️', title: 'Gimnasios y entrenadores', description: 'Contenido de motivación, técnicas y resultados.' },
      { icon: '🍽️', title: 'Gastronomía', description: 'Fotos, recetas y promociones que generan visitas.' },
      { icon: '💆', title: 'Estética y bienestar', description: 'Antes/después, tips y promociones visuales.' },
      { icon: '🏥', title: 'Salud y profesionales', description: 'Educación, confianza y generación de consultas.' },
      { icon: '🛍️', title: 'Retail y productos', description: 'Showcases, lanzamientos y contenido de producto.' },
      { icon: '🏠', title: 'Real estate', description: 'Propiedades destacadas y contenido de valor.' },
    ],
    benefits: [
      '4 carruseles profesionales por mes',
      'Cero tiempo tuyo dedicado a diseño',
      'Presencia consistente en Instagram',
      'Contenido estratégico orientado a ventas',
      'Identidad visual coherente y profesional',
    ],
    faq: [
      { q: '¿Ustedes publican por mí?', a: 'Te entregamos el contenido listo para publicar. Si querés que lo programemos nosotros, consultanos.' },
      { q: '¿Puedo pedir temas específicos?', a: 'Sí. Cada mes definimos juntos los temas según tus objetivos.' },
      { q: '¿Cuántas revisiones incluye?', a: 'Dos rondas de revisión por pieza, incluidas en el precio.' },
    ],
  },

  {
    slug: 'leads-ai',
    name: 'Leads AI™',
    badge: 'Servicio mensual',
    tagline: 'Encontrá y contactá clientes ideales. Automáticamente.',
    description:
      'Sistema de prospección automatizada que identifica y contacta a tu cliente ideal mientras vos te dedicás a cerrar ventas.',
    type: 'subscription',
    price: 'ARS 69.990',
    priceSub: 'por mes · o ARS 671.904/año (20% off)',
    color: 'from-cyan-500 to-blue-500',
    accentColor: 'cyan',
    icon: '🎯',
    hero: {
      headline: 'Tu pipeline de clientes creciendo en piloto automático.',
      sub: 'Leads AI™ instala un sistema de prospección que encuentra, califica y contacta a tus clientes ideales automáticamente — llenando tu agenda sin que vos tengas que salir a buscarlos.',
      ctaPrimary: 'Quiero Leads AI™',
      ctaSecondary: 'Ver cómo funciona',
      stat1: { value: '+50', label: 'leads calificados por mes' },
      stat2: { value: '0h', label: 'de prospección manual' },
      stat3: { value: '100%', label: 'dentro de tu perfil ideal' },
    },
    problem: {
      headline: 'Conseguir clientes nuevos es lento, costoso y frustrante.',
      body: 'La prospección manual consume horas, los resultados son impredecibles y escalar depende de que haya alguien dedicándose a eso. La mayoría de los negocios crece por referidos y casualidad. Eso no es un sistema.',
      items: [
        'Horas por semana buscando posibles clientes manualmente',
        'Sin proceso repetible para generar oportunidades',
        'Dependencia de referidos para conseguir nuevos clientes',
        'Sin visibilidad de cuántos prospectos entran por mes',
        'Dificultad para escalar las ventas sin contratar más vendedores',
      ],
    },
    solution: {
      headline: 'Un sistema que pone prospectos calificados en tu agenda, todos los meses.',
      body: 'Leads AI™ configura y mantiene un sistema de prospección automatizada que identifica a tu cliente ideal, lo contacta con el mensaje correcto y lo prepara para que vos cierres la venta.',
    },
    includes: [
      { title: 'Definición del perfil ideal', description: 'Identificamos exactamente quién es tu cliente ideal y dónde encontrarlo.' },
      { title: 'Sistema de prospección automatizada', description: 'Herramientas configuradas para encontrar y contactar prospectos de forma escalable.' },
      { title: 'Secuencia de mensajes', description: 'Mensajes de primer contacto y seguimiento redactados para generar respuesta.' },
      { title: '+50 leads calificados por mes', description: 'Mínimo garantizado de prospectos dentro de tu perfil de cliente ideal.' },
      { title: 'Reporte mensual', description: 'Métricas claras: contactados, respuestas, reuniones generadas, conversiones.' },
    ],
    howItWorks: [
      { number: '01', title: 'Definición', description: 'Definimos juntos el perfil de cliente ideal: industria, tamaño, dolor, ubicación.' },
      { number: '02', title: 'Configuración', description: 'Configuramos el sistema de búsqueda y los mensajes de contacto inicial.' },
      { number: '03', title: 'Prospección activa', description: 'El sistema corre solo, contactando nuevos prospectos cada semana.' },
      { number: '04', title: 'Seguimiento', description: 'Vos recibís los interesados. Nosotros optimizamos el sistema cada mes.' },
    ],
    useCases: [
      { icon: '🏢', title: 'B2B y servicios', description: 'Empresas que venden a otras empresas y necesitan pipeline constante.' },
      { icon: '🏠', title: 'Inmobiliarias', description: 'Vendedores y compradores potenciales encontrados automáticamente.' },
      { icon: '💼', title: 'Consultores', description: 'Clientes ideales identificados y contactados sin esfuerzo manual.' },
      { icon: '🖥️', title: 'Agencias digitales', description: 'Pipeline de nuevos clientes sin depender de referidos.' },
      { icon: '⚖️', title: 'Estudios jurídicos', description: 'Contacto proactivo con empresas que necesitan asesoramiento.' },
      { icon: '🏗️', title: 'Construcción y diseño', description: 'Proyectos nuevos identificados antes de que salgan a licitación.' },
    ],
    benefits: [
      '+50 leads calificados mensuales garantizados',
      'Cero tiempo en prospección manual',
      'Pipeline predecible y escalable',
      'Mensajes personalizados que generan respuesta',
      'Reporte mensual de rendimiento',
    ],
    faq: [
      { q: '¿Cuántos leads puedo esperar por mes?', a: 'El mínimo garantizado es 50 leads calificados dentro de tu perfil ideal. En muchos casos superamos eso.' },
      { q: '¿Qué canales usan para prospectar?', a: 'Depende de dónde está tu cliente ideal. LinkedIn, email, Instagram u otras plataformas según el caso.' },
      { q: '¿Los leads son exclusivos para mi negocio?', a: 'Sí. Los leads son generados específicamente para vos y no se comparten con nadie.' },
    ],
  },

  {
    slug: 'insights',
    name: 'Insights™',
    badge: 'Servicio mensual',
    tagline: 'Datos, automatización y decisiones en un solo sistema.',
    description:
      'Reportes inteligentes, automatizaciones estratégicas y métricas que importan. Todo integrado para que tu negocio funcione mejor cada semana.',
    type: 'subscription',
    price: 'ARS 69.990',
    priceSub: 'por mes · o ARS 671.904/año (20% off)',
    color: 'from-indigo-500 to-violet-500',
    accentColor: 'indigo',
    icon: '📊',
    hero: {
      headline: 'Datos, automatización y decisiones. En un solo sistema.',
      sub: 'Insights™ conecta tu negocio, automatiza lo repetitivo y te entrega los reportes que necesitás para crecer — sin que armes una sola planilla ni pierdas tiempo en tareas manuales.',
      ctaPrimary: 'Quiero Insights™',
      ctaSecondary: 'Ver cómo funciona',
      stat1: { value: '1', label: 'sistema unificado' },
      stat2: { value: '-10h', label: 'ahorro semanal promedio' },
      stat3: { value: '100%', label: 'a medida de tu negocio' },
    },
    problem: {
      headline: 'Tomás decisiones sin datos y perdés horas en lo que una máquina haría sola.',
      body: 'Sin visibilidad real de tu negocio y con procesos manuales que se acumulan, es imposible crecer de forma ordenada. El resultado: decisiones por intuición, tiempo perdido y oportunidades que se escapan.',
      items: [
        'Sin visibilidad clara de ventas, clientes y márgenes',
        'Horas semanales en tareas administrativas repetitivas',
        'Decisiones tomadas por intuición sin datos reales',
        'Procesos que se rompen cuando vos no estás',
        'Métricas dispersas sin conexión entre sí',
      ],
    },
    solution: {
      headline: 'Tu negocio, automatizado y con visibilidad total. Cada semana.',
      body: 'Insights™ unifica en un solo sistema lo que antes eran dos servicios: automatizaciones estratégicas que eliminan trabajo manual, y reportes automáticos que te muestran exactamente cómo va tu negocio.',
    },
    includes: [
      { title: 'Reportes inteligentes semanales', description: 'Cada semana recibís un resumen con las métricas clave: ventas, clientes, retención, tendencias.' },
      { title: 'Automatizaciones estratégicas', description: 'Identificamos y automatizamos los procesos que más tiempo te consumen. Dos por mes, medibles y concretos.' },
      { title: 'Métricas del negocio en tiempo real', description: 'Dashboard con todos tus indicadores actualizados. Sin planillas.' },
      { title: 'Alertas automáticas', description: 'Notificaciones inmediatas cuando una métrica sale del rango esperado.' },
      { title: 'Seguimiento de objetivos', description: 'Definimos metas y las monitoreamos automáticamente mes a mes.' },
      { title: 'Análisis de clientes', description: 'Quiénes compraron, qué compraron, cuándo vuelven y por qué se van.' },
      { title: 'Recomendaciones accionables', description: 'Cada reporte incluye oportunidades de mejora concretas para implementar.' },
    ],
    howItWorks: [
      { number: '01', title: 'Diagnóstico', description: 'Identificamos qué métricas importan para tu negocio y qué procesos consumen más tiempo.' },
      { number: '02', title: 'Conexión', description: 'Conectamos tus fuentes de datos y herramientas actuales al sistema.' },
      { number: '03', title: 'Automatización', description: 'Implementamos las primeras automatizaciones y configuramos reportes.' },
      { number: '04', title: 'Visibilidad total', description: 'Tu negocio funciona más solo. Cada mes automatizamos más y mejoramos los reportes.' },
    ],
    useCases: [
      { icon: '🛍️', title: 'Retail', description: 'Ventas, stock y ticket promedio automatizados y reportados.' },
      { icon: '🏋️', title: 'Servicios', description: 'Retención, agenda y revenue recurrente bajo control.' },
      { icon: '🍽️', title: 'Gastronomía', description: 'Productos más rentables, mesas y delivery sin trabajo manual.' },
      { icon: '🏠', title: 'Inmobiliarias', description: 'Pipeline, seguimientos y comisiones sin esfuerzo.' },
      { icon: '💼', title: 'Agencias', description: 'Rentabilidad por cliente y crecimiento monitoreado solo.' },
      { icon: '🏗️', title: 'Construcción', description: 'Avance de proyectos y costos reales vs presupuestados.' },
    ],
    benefits: [
      'Visibilidad total de tu negocio en tiempo real',
      'Mínimo 10 horas recuperadas por semana',
      'Decisiones más rápidas y más acertadas',
      'Automatizaciones que eliminan el trabajo manual',
      'Alertas antes de que los problemas escalen',
      'Un sistema en lugar de dos servicios separados',
    ],
    faq: [
      { q: '¿Qué incluye exactamente?', a: 'Reportes inteligentes semanales, automatizaciones estratégicas mensuales, dashboard en tiempo real, alertas, análisis de clientes y recomendaciones accionables.' },
      { q: '¿Reemplaza a los servicios de automatización y reportes?', a: 'Sí. Insights™ unifica ambos en uno solo, con mejor integración entre los datos y las automatizaciones.' },
      { q: '¿Qué herramientas puedo conectar?', a: 'La mayoría: planillas de Google, Tiendanube, MercadoLibre, sistemas de facturación, CRMs, y más. Consultanos tu caso.' },
      { q: '¿Los reportes llegan por email?', a: 'Sí. Por email y con acceso a un dashboard visual si lo preferís.' },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
