import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const { token, answers } = await request.json()

  if (!token) {
    return Response.json({ error: 'token requerido' }, { status: 400 })
  }

  const { data: submission } = await supabaseAdmin
    .from('onboarding_submissions')
    .select('id')
    .eq('token', token)
    .single()

  if (!submission) {
    return Response.json({ error: 'Token inválido' }, { status: 404 })
  }

  const { error } = await supabaseAdmin
    .from('onboarding_submissions')
    .update({
      answers,
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('token', token)

  if (error) {
    console.error('[submit-onboarding]', error)
    return Response.json({ error: 'Error al guardar' }, { status: 500 })
  }

  return Response.json({ success: true })
}
