// ─── Monthly services catalog ─────────────────────────────────────────────────

export interface ServiceConfig {
  id: string
  name: string
  badge: string
  price: number          // ARS/mes
  description: string
  benefits: string[]
}

export const MONTHLY_SERVICES: Record<string, ServiceConfig> = {
  inbox_ai: {
    id: 'inbox_ai',
    name: 'Inbox AI™',
    badge: 'Mensual',
    price: 69990,
    description: 'Atención automática por WhatsApp 24/7',
    benefits: ['Responde consultas frecuentes sola', 'Atiende fuera de horario', 'Sin perder el toque humano'],
  },
  smart_system: {
    id: 'smart_system',
    name: 'Smart System™',
    badge: 'Mensual',
    price: 69990,
    description: 'Sistema de turnos, reservas o ventas',
    benefits: ['Gestión de agenda digitalizada', 'Recordatorios automáticos', 'Sin errores ni solapamientos'],
  },
  social_ai: {
    id: 'social_ai',
    name: 'Social AI™',
    badge: 'Mensual',
    price: 69990,
    description: 'Calendario de contenido + carruseles con IA',
    benefits: ['Publicaciones sin pensar qué postear', 'Constancia garantizada en redes', 'Diseño alineado a tu marca'],
  },
  leads_ai: {
    id: 'leads_ai',
    name: 'Leads AI™',
    badge: 'Mensual',
    price: 69990,
    description: 'Prospección automática de clientes nuevos',
    benefits: ['Clientes nuevos todos los meses', 'Sistema que trabaja sin vos', 'Seguimiento automatizado'],
  },
  insights: {
    id: 'insights',
    name: 'Insights™',
    badge: 'Mensual',
    price: 69990,
    description: 'Reportes, métricas y automatizaciones estratégicas',
    benefits: ['Decisiones basadas en datos reales', 'Detecta qué funciona y qué no', 'Reportes automáticos semanales'],
  },
}

// Maps engine slugs (kebab) to config IDs (snake_case)
export const SLUG_TO_ID: Record<string, string> = {
  'inbox-ai': 'inbox_ai',
  'smart-system': 'smart_system',
  'social-ai': 'social_ai',
  'leads-ai': 'leads_ai',
  'insights': 'insights',
}

// ─── ELARA Launch promo config ─────────────────────────────────────────────────

export const ELARA_LAUNCH = {
  name: 'ELARA Launch™',
  normalPrice: 39990,
  promoPrice: 19990,   // 2 servicios
  // 3 servicios → GRATIS
}

// ─── Checkout URLs ─────────────────────────────────────────────────────────────
// Key: sorted service IDs joined by '+' (e.g. 'inbox_ai', 'inbox_ai+leads_ai')
// Para bundles de 2 o 3 servicios: crear los checkouts en Lemon Squeezy
// y reemplazar las URLs '/contacto' con los links reales.

export const CHECKOUT_URLS: Record<string, string> = {
  // ── 1 servicio ──────────────────────────────────────────────────────────────
  inbox_ai:    'https://pagoselara.lemonsqueezy.com/checkout/buy/980d1c82-fbf3-4d65-9108-753e31d7c218',
  smart_system:'https://pagoselara.lemonsqueezy.com/checkout/buy/1afd746f-b166-4299-8425-93ee05417773',
  social_ai:   'https://pagoselara.lemonsqueezy.com/checkout/buy/57e16cf2-f4a9-43cf-a89d-59b5d120697f',
  leads_ai:    'https://pagoselara.lemonsqueezy.com/checkout/buy/33c379a3-7ac8-4d1a-9f24-584838f4ca4d',
  insights:    'https://pagoselara.lemonsqueezy.com/checkout/buy/d8cdf212-83f3-4a0d-b1dc-8bc3ef0b993b',

  // ── 2 servicios — 10% OFF ────────────────────────────────────────────────────
  'inbox_ai+insights':     'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'inbox_ai+leads_ai':     'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'inbox_ai+smart_system': 'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'inbox_ai+social_ai':    'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'insights+leads_ai':     'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'insights+smart_system': 'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'insights+social_ai':    'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'leads_ai+smart_system': 'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'leads_ai+social_ai':    'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',
  'smart_system+social_ai':'https://pagoselara.lemonsqueezy.com/checkout/buy/898f2fc5-3488-4a53-af93-849a4a2c6a2e',

  // ── 3 servicios — 20% OFF ────────────────────────────────────────────────────
  'inbox_ai+insights+leads_ai':      'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'inbox_ai+insights+smart_system':  'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'inbox_ai+insights+social_ai':     'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'inbox_ai+leads_ai+smart_system':  'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'inbox_ai+leads_ai+social_ai':     'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'inbox_ai+smart_system+social_ai': 'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'insights+leads_ai+smart_system':  'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'insights+leads_ai+social_ai':     'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'insights+smart_system+social_ai': 'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
  'leads_ai+smart_system+social_ai': 'https://pagoselara.lemonsqueezy.com/checkout/buy/730e8658-9085-4e46-af9e-bf4ff0eeec78',
}

export function getCheckoutUrl(selectedIds: string[]): string {
  const key = [...selectedIds].sort().join('+')
  return CHECKOUT_URLS[key] ?? '/contacto'
}

export function formatPrice(n: number): string {
  return `ARS ${n.toLocaleString('es-AR')}`
}

// ─── Promo rules ────────────────────────────────────────────────────────────────

export type LaunchPromoLevel = 'hidden' | 'normal' | 'promo' | 'free' | 'expired'

export function getLaunchPromo(selectedCount: number): LaunchPromoLevel {
  if (selectedCount === 0) return 'hidden'
  if (selectedCount === 1) return 'normal'
  if (selectedCount === 2) return 'promo'
  return 'free'
}

// ─── Countdown ────────────────────────────────────────────────────────────────

export const PROMO_DURATION_SECONDS = 30 * 60  // 30 minutos
export const PROMO_STORAGE_KEY = 'elara_diag_expiry_v1'
