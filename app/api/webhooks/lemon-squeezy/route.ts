import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { verifyWebhookSignature, handleWebhookEvent } from '@/lib/lemon-squeezy/webhooks'

export const runtime = 'nodejs'

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Leer el body como texto (necesario para verificar la firma)
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature') ?? ''

  // 2. Verificar firma
  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    console.error('[LS Webhook] Firma inválida')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 3. Parsear payload
  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventName = req.headers.get('x-event-name') ?? ''

  // 4. Guardar el evento SIEMPRE (antes de procesar — para auditoría y retry)
  const { data: savedEvent, error: saveError } = await supabaseAdmin
    .from('webhook_events')
    .insert({
      source: 'lemon_squeezy',
      event_name: eventName,
      payload,
    })
    .select('id')
    .single()

  if (saveError) {
    console.error('[LS Webhook] Error guardando evento:', saveError)
    // Aun así intentamos procesar
  }

  // 5. Procesar el evento
  try {
    await handleWebhookEvent(eventName, payload)

    // Marcar como procesado
    if (savedEvent) {
      await supabaseAdmin
        .from('webhook_events')
        .update({ processed: true, processed_at: new Date().toISOString() })
        .eq('id', savedEvent.id)
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error(`[LS Webhook] Error procesando ${eventName}:`, errorMsg)

    // Guardar el error para debugging
    if (savedEvent) {
      await supabaseAdmin
        .from('webhook_events')
        .update({ error: errorMsg })
        .eq('id', savedEvent.id)
    }

    // Retornar 500 para que Lemon Squeezy reintente
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
