import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')?.toLowerCase().trim()
  if (!email) {
    return Response.json({ error: 'email requerido' }, { status: 400 })
  }

  const { data: submission } = await supabaseAdmin
    .from('onboarding_submissions')
    .select('token, status')
    .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString())
    .eq('clients.contact_email', email)
    .not('client_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!submission) {
    // Buscar sin filtro de tiempo por si el webhook tardó
    const { data: client } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('contact_email', email)
      .single()

    if (!client) {
      return Response.json({ error: 'not_found' }, { status: 404 })
    }

    const { data: recent } = await supabaseAdmin
      .from('onboarding_submissions')
      .select('token, status')
      .eq('client_id', client.id)
      .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!recent) {
      return Response.json({ error: 'not_found' }, { status: 404 })
    }

    if (recent.status === 'completed') {
      return Response.json({ error: 'already_completed' }, { status: 409 })
    }

    return Response.json({ token: recent.token })
  }

  if (submission.status === 'completed') {
    return Response.json({ error: 'already_completed' }, { status: 409 })
  }

  return Response.json({ token: submission.token })
}
