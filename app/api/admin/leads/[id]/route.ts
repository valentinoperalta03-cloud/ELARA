import { supabaseAdmin } from '@/lib/supabase/admin'

const VALID_STATUSES = ['new', 'contacted', 'qualified', 'lost'] as const

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json()
  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: 'Estado inválido' }, { status: 400 })
  }
  const { error } = await supabaseAdmin
    .from('leads')
    .update({ status })
    .eq('id', params.id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
