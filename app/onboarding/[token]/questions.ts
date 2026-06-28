export interface QuestionOption {
  value: string
  label: string
  description?: string
}

export interface Question {
  id: string
  type: 'text' | 'textarea' | 'upload' | 'location' | 'select' | 'multiselect' | 'photos' | 'yesno' | 'products'
  question: string
  hint?: string
  placeholder?: string
  options?: QuestionOption[]
  required: boolean
  condition?: (answers: Record<string, unknown>) => boolean
}

const BASE_QUESTIONS: Question[] = [
  {
    id: 'logo',
    type: 'upload',
    question: '¿Tenés el logo de tu negocio?',
    hint: 'Si no tenés, no pasa nada — podés saltearlo.',
    required: false,
  },
  {
    id: 'nombre_negocio',
    type: 'text',
    question: '¿Cómo se llama tu negocio?',
    placeholder: 'Ej: Peluquería Valentina, Estudio Jurídico García...',
    required: true,
  },
  {
    id: 'ubicacion',
    type: 'location',
    question: '¿Dónde está tu negocio?',
    hint: 'Completá lo que tengas. El link de Google Maps es opcional pero nos ayuda mucho.',
    required: true,
  },
  {
    id: 'rubro',
    type: 'text',
    question: '¿A qué se dedica tu negocio?',
    placeholder: 'Ej: Peluquería y estética, Estudio contable, Venta de ropa...',
    required: true,
  },
  {
    id: 'descripcion',
    type: 'textarea',
    question: '¿Cómo describirías tu negocio en pocas palabras?',
    hint: 'Contanos qué hacés, cómo lo hacés y qué te hace diferente. Sin filtros.',
    placeholder: 'Ej: Somos un gimnasio boutique en Palermo, trabajamos con grupos chicos y nos enfocamos en resultados reales...',
    required: true,
  },
  {
    id: 'cliente_ideal',
    type: 'textarea',
    question: '¿Quién es tu cliente ideal?',
    hint: 'Edad, perfil, qué le preocupa, cómo llega a vos.',
    placeholder: 'Ej: Mujeres de 30 a 50 años que quieren verse bien pero no tienen tiempo...',
    required: true,
  },
  {
    id: 'problema_que_resuelve',
    type: 'textarea',
    question: '¿Qué problema le resolvés a tu cliente?',
    hint: 'El dolor real que tiene antes de encontrarte a vos.',
    placeholder: 'Ej: Muchos de nuestros clientes llegaban frustrados porque hacían dieta sin ver resultados...',
    required: true,
  },
  {
    id: 'diferencial',
    type: 'textarea',
    question: '¿Por qué te eligen a vos y no a la competencia?',
    placeholder: 'Ej: Atención personalizada, precios accesibles, 10 años de experiencia...',
    required: true,
  },
  {
    id: 'fotos_negocio',
    type: 'photos',
    question: '¿Tenés fotos de tu negocio?',
    hint: 'Subí fotos del local, del equipo, de tus productos o de lo que hacés. Cuanto más, mejor.',
    required: false,
  },
  {
    id: 'redes',
    type: 'text',
    question: '¿Tenés Instagram u otras redes? Pegá los links.',
    placeholder: 'Ej: instagram.com/minegocio, facebook.com/minegocio',
    required: false,
  },
  {
    id: 'objetivo_web',
    type: 'select',
    question: '¿Cuál es el objetivo principal de tu página web?',
    hint: 'Elegí el que más se ajusta a lo que querés lograr.',
    options: [
      { value: 'clientes', label: '🎯 Conseguir más clientes', description: 'Que nuevas personas te contacten' },
      { value: 'mostrar', label: '🏪 Mostrar mi negocio', description: 'Tener presencia profesional online' },
      { value: 'vender', label: '🛒 Vender productos', description: 'Catálogo con precios y compra directa' },
      { value: 'reservas', label: '📅 Recibir reservas o turnos', description: 'Los clientes agenden solos' },
      { value: 'catalogo', label: '📋 Mostrar un catálogo', description: 'Exhibir productos o servicios sin venta online' },
      { value: 'consultas', label: '💬 Generar consultas', description: 'Que te escriban por WhatsApp o email' },
    ],
    required: true,
  },
  {
    id: 'vende_productos',
    type: 'yesno',
    question: '¿Vendés productos físicos o digitales?',
    hint: 'Esto nos ayuda a saber si necesitás una sección de catálogo o tienda.',
    required: true,
  },
  {
    id: 'productos_lista',
    type: 'products',
    question: 'Cargá tus productos principales',
    hint: 'Agregá los que quieras mostrar en tu sitio. Nombre, precio y foto son suficientes.',
    required: false,
    condition: (answers) => answers['vende_productos'] === 'si',
  },
  {
    id: 'estilo_web',
    type: 'select',
    question: '¿Qué estilo visual te representa más?',
    hint: 'Elegí el que más se parezca a la personalidad de tu marca.',
    options: [
      { value: 'moderno', label: '✦ Moderno y limpio', description: 'Minimalista, mucho espacio, tipografía fuerte' },
      { value: 'futurista', label: '⚡ Futurista y tecnológico', description: 'Dark, luces de neón, sensación de innovación' },
      { value: 'calido', label: '🌿 Cálido y natural', description: 'Colores tierra, orgánico, cercano y humano' },
      { value: 'elegante', label: '◆ Elegante y premium', description: 'Sofisticado, exclusivo, transmite lujo' },
      { value: 'energico', label: '🔥 Enérgico y atrevido', description: 'Colores vibrantes, dinámico, llama la atención' },
      { value: 'profesional', label: '📐 Profesional y clásico', description: 'Serio, confiable, corporativo pero accesible' },
    ],
    required: true,
  },
  {
    id: 'colores',
    type: 'text',
    question: '¿Tenés colores de marca definidos?',
    hint: 'Si tenés, ponelos. Si no, no importa — nosotros te ayudamos.',
    placeholder: 'Ej: Azul marino y dorado, Verde y blanco, No tengo colores definidos...',
    required: false,
  },
  {
    id: 'info_extra',
    type: 'textarea',
    question: '¿Hay algo más que debamos saber de tu negocio?',
    hint: 'Cualquier detalle importante que no te hayamos preguntado.',
    placeholder: 'Ej: Tenemos segunda sucursal, trabajamos solo con turno previo...',
    required: false,
  },
]

const PRODUCT_QUESTIONS: Record<string, Question[]> = {
  'elara-launch': [],

  'inbox-ai': [
    {
      id: 'whatsapp_numero',
      type: 'text',
      question: '¿Cuál es tu número de WhatsApp Business?',
      hint: 'Con código de país.',
      placeholder: '+54 9 11 1234-5678',
      required: true,
    },
    {
      id: 'preguntas_frecuentes',
      type: 'textarea',
      question: '¿Cuáles son las consultas que más te hacen por WhatsApp?',
      hint: 'Listá las 5 o 6 preguntas que siempre te repiten.',
      placeholder: 'Ej: ¿Cuánto sale un turno? ¿Trabajan los domingos? ¿Dónde están?...',
      required: true,
    },
    {
      id: 'horario_humano',
      type: 'text',
      question: '¿En qué horario puede atender una persona real?',
      placeholder: 'Ej: Lunes a viernes de 9 a 18hs',
      required: true,
    },
    {
      id: 'accion_bot',
      type: 'select',
      question: 'Cuando el bot no puede resolver algo, ¿qué preferís que haga?',
      options: [
        { value: 'derivar', label: '📲 Que avise que va a contactar una persona', description: '' },
        { value: 'datos', label: '📋 Que pida los datos del cliente y te avise a vos', description: '' },
        { value: 'horario', label: '🕐 Que informe el horario de atención humana', description: '' },
      ],
      required: true,
    },
  ],

  'smart-system': [
    {
      id: 'tipo_gestion',
      type: 'select',
      question: '¿Qué necesitás gestionar con el sistema?',
      options: [
        { value: 'turnos', label: '📅 Turnos', description: 'Agenda de clientes con horario asignado' },
        { value: 'reservas', label: '🏨 Reservas', description: 'Espacios, canchas, habitaciones, etc.' },
        { value: 'pedidos', label: '🛒 Pedidos', description: 'Órdenes de compra o encargos' },
        { value: 'clases', label: '🎓 Clases y cupos', description: 'Inscripciones con límite de participantes' },
        { value: 'otro', label: '⚙️ Otro', description: 'Lo describís en la siguiente pregunta' },
      ],
      required: true,
    },
    {
      id: 'gestion_actual',
      type: 'textarea',
      question: '¿Cómo lo manejás hoy?',
      hint: 'Describí tu proceso actual, aunque sea un caos.',
      placeholder: 'Ej: Lo anoto en papel, coordino todo por WhatsApp, uso una planilla de Excel...',
      required: true,
    },
    {
      id: 'volumen',
      type: 'text',
      question: '¿Cuántos turnos/reservas manejás por día aproximadamente?',
      placeholder: 'Ej: Entre 10 y 20 por día',
      required: true,
    },
    {
      id: 'equipo_sistema',
      type: 'text',
      question: '¿Cuántas personas del equipo van a usar el sistema?',
      placeholder: 'Ej: Solo yo, 3 personas, todo el equipo (8 personas)...',
      required: true,
    },
  ],

  'social-ai': [
    {
      id: 'instagram',
      type: 'text',
      question: '¿Cuál es tu usuario de Instagram?',
      placeholder: '@minegocio',
      required: true,
    },
    {
      id: 'tono_marca',
      type: 'select',
      question: '¿Cómo es el tono de tu marca?',
      hint: 'Elegí el que más te representa.',
      options: [
        { value: 'profesional', label: '📐 Profesional y serio', description: '' },
        { value: 'cercano', label: '🤝 Cercano y amigable', description: '' },
        { value: 'inspirador', label: '✨ Inspirador y motivador', description: '' },
        { value: 'divertido', label: '😄 Divertido y descontracturado', description: '' },
        { value: 'aspiracional', label: '🌟 Aspiracional y premium', description: '' },
      ],
      required: true,
    },
    {
      id: 'objetivo_contenido',
      type: 'select',
      question: '¿Qué querés lograr con el contenido?',
      options: [
        { value: 'consultas', label: '💬 Generar más consultas y ventas', description: '' },
        { value: 'referente', label: '🏆 Posicionarme como referente del rubro', description: '' },
        { value: 'comunidad', label: '👥 Construir comunidad y fidelizar', description: '' },
        { value: 'visibilidad', label: '📢 Ganar visibilidad y seguidores', description: '' },
      ],
      required: true,
    },
    {
      id: 'temas_destacar',
      type: 'textarea',
      question: '¿Hay productos o temas que quieras destacar este mes?',
      placeholder: 'Ej: Estamos lanzando un nuevo servicio, tenemos una promo de temporada...',
      required: false,
    },
    {
      id: 'restricciones',
      type: 'textarea',
      question: '¿Hay algo que NO querés que aparezca en tu contenido?',
      hint: 'Temas, estilos, palabras, etc.',
      placeholder: 'Ej: No mencionamos precios, no usamos imágenes de personas...',
      required: false,
    },
  ],

  'leads-ai': [
    {
      id: 'cliente_b2b',
      type: 'textarea',
      question: '¿A qué tipo de empresas o personas le vendés?',
      hint: 'Industria, tamaño, perfil, zona geográfica.',
      placeholder: 'Ej: Pymes de entre 5 y 50 empleados en Rosario que necesitan servicios contables...',
      required: true,
    },
    {
      id: 'ticket_promedio',
      type: 'text',
      question: '¿Cuál es el valor promedio de una venta?',
      placeholder: 'Ej: $50.000, $200 USD, varía mucho...',
      required: true,
    },
    {
      id: 'proceso_venta',
      type: 'textarea',
      question: '¿Cómo cerrás una venta hoy? Describí el proceso.',
      placeholder: 'Ej: Primero hago una llamada de 15 minutos, después mando propuesta...',
      required: true,
    },
    {
      id: 'canales_actuales',
      type: 'multiselect',
      question: '¿En qué canales buscás clientes hoy?',
      options: [
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'email', label: 'Email frío' },
        { value: 'referidos', label: 'Referidos' },
        { value: 'eventos', label: 'Eventos / networking' },
        { value: 'ninguno', label: 'Ninguno todavía' },
      ],
      required: true,
    },
  ],

  'insights': [
    {
      id: 'herramientas_actuales',
      type: 'multiselect',
      question: '¿Qué herramientas usás hoy para gestionar tu negocio?',
      options: [
        { value: 'excel', label: 'Excel / Google Sheets' },
        { value: 'tiendanube', label: 'Tiendanube' },
        { value: 'mercadolibre', label: 'MercadoLibre' },
        { value: 'crm', label: 'Algún CRM' },
        { value: 'facturacion', label: 'Sistema de facturación' },
        { value: 'ninguna', label: 'Ninguna' },
      ],
      required: true,
    },
    {
      id: 'metricas_importantes',
      type: 'multiselect',
      question: '¿Qué métricas te importan más?',
      options: [
        { value: 'ventas', label: 'Ventas totales' },
        { value: 'clientes_nuevos', label: 'Clientes nuevos' },
        { value: 'retencion', label: 'Retención de clientes' },
        { value: 'ticket', label: 'Ticket promedio' },
        { value: 'margenes', label: 'Márgenes y rentabilidad' },
        { value: 'stock', label: 'Stock e inventario' },
      ],
      required: true,
    },
    {
      id: 'tarea_manual_pesada',
      type: 'textarea',
      question: '¿Cuál es la tarea manual que más tiempo te consume por semana?',
      placeholder: 'Ej: Armar el reporte de ventas me lleva 3 horas, actualizo el stock a mano...',
      required: true,
    },
    {
      id: 'decision_sin_datos',
      type: 'textarea',
      question: '¿Qué decisiones tomás hoy sin datos claros?',
      placeholder: 'Ej: No sé qué producto me deja más margen, no tengo claro cuántos clientes se van...',
      required: true,
    },
  ],
}

export function getQuestions(productSlug: string): Question[] {
  const extra = PRODUCT_QUESTIONS[productSlug] ?? []
  return [...BASE_QUESTIONS, ...extra]
}

const QUESTION_LABELS: Record<string, string> = {
  logo: 'Logo del negocio',
  nombre_negocio: 'Nombre del negocio',
  ubicacion: 'Ubicación',
  rubro: 'Rubro',
  descripcion: 'Descripción del negocio',
  cliente_ideal: 'Cliente ideal',
  problema_que_resuelve: 'Problema que resuelve',
  diferencial: 'Diferencial',
  fotos_negocio: 'Fotos del negocio',
  redes: 'Redes sociales',
  objetivo_web: 'Objetivo de la página web',
  vende_productos: '¿Vende productos?',
  productos_lista: 'Productos',
  estilo_web: 'Estilo visual',
  colores: 'Colores de marca',
  info_extra: 'Información adicional',
  whatsapp_numero: 'Número de WhatsApp',
  preguntas_frecuentes: 'Preguntas frecuentes',
  horario_humano: 'Horario de atención humana',
  accion_bot: 'Acción del bot',
  tipo_gestion: 'Tipo de gestión',
  gestion_actual: 'Gestión actual',
  volumen: 'Volumen diario',
  equipo_sistema: 'Personas en el equipo',
  instagram: 'Instagram',
  tono_marca: 'Tono de marca',
  objetivo_contenido: 'Objetivo del contenido',
  temas_destacar: 'Temas a destacar',
  restricciones: 'Restricciones de contenido',
  cliente_b2b: 'Tipo de cliente',
  ticket_promedio: 'Ticket promedio',
  proceso_venta: 'Proceso de venta',
  canales_actuales: 'Canales actuales',
  herramientas_actuales: 'Herramientas actuales',
  metricas_importantes: 'Métricas importantes',
  tarea_manual_pesada: 'Tarea manual más pesada',
  decision_sin_datos: 'Decisiones sin datos',
}

export function getQuestionLabel(id: string): string {
  return QUESTION_LABELS[id] ?? id
}
