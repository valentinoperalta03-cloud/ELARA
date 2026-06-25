import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { Client, Order, Subscription } from '@/types/database'

// ============================================================
// Verificación de firma del webhook
// ============================================================
export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(rawBody)
  const digest = hmac.digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

// ============================================================
// Tipos del payload de Lemon Squeezy
// ============================================================
interface LSCustomer {
  name: string
  email: string
}

interface LSOrderPayload {
  data: {
    id: string
    attributes: {
      order_number: number
      total: number
      currency: string
      status: string
      first_order_item: {
        variant_id: number
        product_id: number
      }
      user_name: string
      user_email: string
      customer_id: number
    }
  }
}

interface LSSubscriptionPayload {
  data: {
    id: string
    attributes: {
      subscription_id?: number
      order_id?: number
      customer_id: number
      product_id: number
      variant_id: number
      status: string
      billing_anchor: number
      renews_at: string
      ends_at: string | null
      trial_ends_at: string | null
      cancelled: boolean
      pause: null | { mode: string }
      user_name: string
      user_email: string
    }
  }
}

// ============================================================
// Handler principal: despacha por tipo de evento
// ============================================================
export async function handleWebhookEvent(
  eventName: string,
  payload: Record<string, unknown>
): Promise<void> {
  switch (eventName) {
    case 'order_created':
      await handleOrderCreated(payload as unknown as LSOrderPayload)
      break
    case 'order_refunded':
      await handleOrderRefunded(payload as unknown as LSOrderPayload)
      break
    case 'subscription_created':
      await handleSubscriptionCreated(payload as unknown as LSSubscriptionPayload)
      break
    case 'subscription_updated':
    case 'subscription_resumed':
      await handleSubscriptionUpdated(payload as unknown as LSSubscriptionPayload)
      break
    case 'subscription_cancelled':
      await handleSubscriptionCancelled(payload as unknown as LSSubscriptionPayload)
      break
    case 'subscription_expired':
      await handleSubscriptionExpired(payload as unknown as LSSubscriptionPayload)
      break
    case 'subscription_payment_failed':
      await handlePaymentFailed(payload as unknown as LSSubscriptionPayload)
      break
    case 'subscription_payment_success':
      await handleSubscriptionUpdated(payload as unknown as LSSubscriptionPayload)
      break
    default:
      console.log(`[LS Webhook] Evento no manejado: ${eventName}`)
  }
}

// ============================================================
// order_created → nuevo pago único (ELARA Launch™)
// ============================================================
async function handleOrderCreated(payload: LSOrderPayload): Promise<void> {
  const attr = payload.data.attributes
  const lsOrderId = String(payload.data.id)

  // Idempotencia: verificar si ya procesamos este order
  const { data: existing } = await supabaseAdmin
    .from('orders')
    .select('id')
    .eq('ls_order_id', lsOrderId)
    .single()

  if (existing) {
    console.log(`[LS] Order ${lsOrderId} ya procesado, skipping`)
    return
  }

  const lsVariantId = String(attr.first_order_item.variant_id)

  // Buscar el producto por variant_id
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, slug')
    .eq('ls_variant_id', lsVariantId)
    .single()

  // Upsert del cliente
  const client = await upsertClient({
    name: attr.user_name,
    email: attr.user_email,
    lsCustomerId: String(attr.customer_id),
  })

  // Crear la orden
  const { data: order } = await supabaseAdmin
    .from('orders')
    .insert({
      client_id: client?.id ?? null,
      product_id: product?.id ?? null,
      ls_order_id: lsOrderId,
      ls_order_number: String(attr.order_number),
      amount_cents: attr.total,
      currency: attr.currency.toUpperCase(),
      status: 'paid',
      customer_name: attr.user_name,
      customer_email: attr.user_email,
      paid_at: new Date().toISOString(),
    })
    .select()
    .single()

  // Crear implementación pendiente
  if (client && product && order) {
    await supabaseAdmin.from('implementations').insert({
      client_id: client.id,
      product_id: product.id,
      order_id: order.id,
      status: 'pending',
      priority: 'normal',
      checklist: getDefaultChecklist(product.slug),
    })

    // Actualizar estado del cliente a 'onboarding'
    await supabaseAdmin
      .from('clients')
      .update({ status: 'onboarding' })
      .eq('id', client.id)
      .eq('status', 'lead') // Solo si estaba en 'lead'
  }

  console.log(`[LS] Order created: ${lsOrderId} → client ${client?.id}`)
}

// ============================================================
// order_refunded
// ============================================================
async function handleOrderRefunded(payload: LSOrderPayload): Promise<void> {
  const lsOrderId = String(payload.data.id)

  await supabaseAdmin
    .from('orders')
    .update({ status: 'refunded', refunded_at: new Date().toISOString() })
    .eq('ls_order_id', lsOrderId)
}

// ============================================================
// subscription_created → nuevo servicio mensual
// ============================================================
async function handleSubscriptionCreated(payload: LSSubscriptionPayload): Promise<void> {
  const attr = payload.data.attributes
  const lsSubId = String(payload.data.id)

  // Idempotencia
  const { data: existing } = await supabaseAdmin
    .from('subscriptions')
    .select('id')
    .eq('ls_subscription_id', lsSubId)
    .single()

  if (existing) return

  const lsVariantId = String(attr.variant_id)

  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, slug')
    .eq('ls_variant_id', lsVariantId)
    .single()

  const client = await upsertClient({
    name: attr.user_name,
    email: attr.user_email,
    lsCustomerId: String(attr.customer_id),
  })

  const { data: sub } = await supabaseAdmin
    .from('subscriptions')
    .insert({
      client_id: client?.id ?? null,
      product_id: product?.id ?? null,
      ls_subscription_id: lsSubId,
      status: attr.status as Subscription['status'],
      billing_anchor: attr.billing_anchor
        ? new Date(attr.billing_anchor * 1000).toISOString()
        : null,
      next_billing_date: attr.renews_at,
      customer_name: attr.user_name,
      customer_email: attr.user_email,
    })
    .select()
    .single()

  if (client && product && sub) {
    await supabaseAdmin.from('implementations').insert({
      client_id: client.id,
      product_id: product.id,
      subscription_id: sub.id,
      status: 'pending',
      priority: 'normal',
      checklist: getDefaultChecklist(product.slug),
    })

    await supabaseAdmin
      .from('clients')
      .update({ status: 'onboarding' })
      .eq('id', client.id)
      .eq('status', 'lead')
  }
}

// ============================================================
// subscription_updated / subscription_resumed
// ============================================================
async function handleSubscriptionUpdated(payload: LSSubscriptionPayload): Promise<void> {
  const attr = payload.data.attributes
  const lsSubId = String(payload.data.id)

  await supabaseAdmin
    .from('subscriptions')
    .update({
      status: attr.status as Subscription['status'],
      next_billing_date: attr.renews_at,
      cancelled_at: attr.cancelled ? new Date().toISOString() : null,
    })
    .eq('ls_subscription_id', lsSubId)
}

// ============================================================
// subscription_cancelled
// ============================================================
async function handleSubscriptionCancelled(payload: LSSubscriptionPayload): Promise<void> {
  const lsSubId = String(payload.data.id)

  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('ls_subscription_id', lsSubId)
}

// ============================================================
// subscription_expired
// ============================================================
async function handleSubscriptionExpired(payload: LSSubscriptionPayload): Promise<void> {
  const lsSubId = String(payload.data.id)

  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'expired' })
    .eq('ls_subscription_id', lsSubId)
}

// ============================================================
// subscription_payment_failed
// ============================================================
async function handlePaymentFailed(payload: LSSubscriptionPayload): Promise<void> {
  const lsSubId = String(payload.data.id)

  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('ls_subscription_id', lsSubId)

  // TODO: enviar email al cliente + alerta al admin
  console.warn(`[LS] Pago fallido para suscripción ${lsSubId}`)
}

// ============================================================
// Helper: upsert cliente por email
// ============================================================
async function upsertClient({
  name,
  email,
  lsCustomerId,
}: {
  name: string
  email: string
  lsCustomerId: string
}): Promise<Client | null> {
  // Buscar por email primero
  const { data: existing } = await supabaseAdmin
    .from('clients')
    .select()
    .eq('contact_email', email)
    .single()

  if (existing) {
    // Actualizar ls_customer_id si no lo tenía
    if (!existing.ls_customer_id) {
      await supabaseAdmin
        .from('clients')
        .update({ ls_customer_id: lsCustomerId })
        .eq('id', existing.id)
    }
    return existing
  }

  // Crear nuevo cliente
  const { data: newClient } = await supabaseAdmin
    .from('clients')
    .insert({
      contact_name: name,
      contact_email: email,
      ls_customer_id: lsCustomerId,
      status: 'lead',
      source: 'web',
    })
    .select()
    .single()

  return newClient
}

// ============================================================
// Checklists por defecto según producto
// ============================================================
function getDefaultChecklist(slug: string | undefined) {
  const checklists: Record<string, { id: string; task: string; done: boolean }[]> = {
    'elara-launch': [
      { id: '1', task: 'Relevamiento de información del negocio', done: false },
      { id: '2', task: 'Diseño y maqueta del sitio web', done: false },
      { id: '3', task: 'Desarrollo del sitio web', done: false },
      { id: '4', task: 'Configuración del chatbot', done: false },
      { id: '5', task: 'Botón WhatsApp configurado', done: false },
      { id: '6', task: 'Integración de reseñas', done: false },
      { id: '7', task: 'Perfil de Google optimizado', done: false },
      { id: '8', task: 'Captura de leads activa', done: false },
      { id: '9', task: 'Growth Playbook enviado', done: false },
      { id: '10', task: 'Revisión final con el cliente', done: false },
    ],
    'inbox-ai': [
      { id: '1', task: 'Configurar cuenta de WhatsApp Business API', done: false },
      { id: '2', task: 'Entrenamiento del bot con info del negocio', done: false },
      { id: '3', task: 'Configurar flujo de transferencia a humano', done: false },
      { id: '4', task: 'Activar captura de leads', done: false },
      { id: '5', task: 'Pruebas y ajustes', done: false },
    ],
    'smart-system': [
      { id: '1', task: 'Definir tipo de sistema (turnos/reservas/etc.)', done: false },
      { id: '2', task: 'Configurar herramienta seleccionada', done: false },
      { id: '3', task: 'Integrar con el sitio del cliente', done: false },
      { id: '4', task: 'Capacitación al cliente', done: false },
    ],
    'automations': [
      { id: '1', task: 'Definir las 2 automatizaciones a implementar', done: false },
      { id: '2', task: 'Configurar automatización 1', done: false },
      { id: '3', task: 'Configurar automatización 2', done: false },
      { id: '4', task: 'Pruebas de funcionamiento', done: false },
    ],
    'social-ai': [
      { id: '1', task: 'Relevamiento de identidad visual del negocio', done: false },
      { id: '2', task: 'Primer calendario mensual de contenidos', done: false },
      { id: '3', task: 'Configurar plantillas de Canva', done: false },
      { id: '4', task: 'Entrega de carruseles semana 1', done: false },
    ],
    'leads-ai': [
      { id: '1', task: 'Definir perfil de cliente ideal', done: false },
      { id: '2', task: 'Configurar búsqueda automática', done: false },
      { id: '3', task: 'Configurar primer mensaje automático', done: false },
      { id: '4', task: 'Revisión de primera semana', done: false },
    ],
    'insights': [
      { id: '1', task: 'Conectar fuentes de datos activas', done: false },
      { id: '2', task: 'Configurar primer reporte semanal', done: false },
      { id: '3', task: 'Configurar reporte mensual', done: false },
    ],
  }

  return checklists[slug ?? ''] ?? []
}
