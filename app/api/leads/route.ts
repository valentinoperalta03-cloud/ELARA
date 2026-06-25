import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// POST /api/leads
// Captura un lead desde el sitio web de un cliente de ELARA
// Recibe: client_id del cliente ELARA + datos del lead

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { client_id, name, email, phone, service_interest, message, source } = body

    if (!client_id) {
      return NextResponse.json({ error: 'client_id requerido' }, { status: 400 })
    }

    // Verificar que el client_id existe y está activo
    const { data: client } = await supabaseAdmin
      .from('clients')
      .select('id, status')
      .eq('id', client_id)
      .single()

    if (!client || client.status === 'churned') {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
    }

    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .insert({
        client_id,
        name: name?.trim() || null,
        email: email?.trim()?.toLowerCase() || null,
        phone: phone?.trim() || null,
        service_interest: service_interest?.trim() || null,
        message: message?.trim() || null,
        source: source || 'form',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('[API Leads]', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
