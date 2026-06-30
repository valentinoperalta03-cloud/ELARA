import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone, scores, recommended_services, answers } = body

  if (!name?.trim() || !email?.trim()) {
    return Response.json({ error: 'name y email requeridos' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('diagnostic_leads')
    .insert({ name: name.trim(), email: email.trim(), phone: phone?.trim() || null, scores, recommended_services, answers })

  if (error) {
    console.error('[diagnostico/guardar]', error)
    return Response.json({ error: 'Error al guardar' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
