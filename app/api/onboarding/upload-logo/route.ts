import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const formData = await request.formData()
  const token = formData.get('token') as string | null
  const file = formData.get('file') as File | null

  if (!token || !file) {
    return Response.json({ error: 'token y file requeridos' }, { status: 400 })
  }

  const { data: submission } = await supabaseAdmin
    .from('onboarding_submissions')
    .select('id')
    .eq('token', token)
    .single()

  if (!submission) {
    return Response.json({ error: 'Token inválido' }, { status: 404 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png'
  const path = `${token}/logo.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from('logos')
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (error) {
    console.error('[upload-logo]', error)
    return Response.json({ error: 'Error al subir imagen' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('logos')
    .getPublicUrl(path)

  await supabaseAdmin
    .from('onboarding_submissions')
    .update({ logo_url: publicUrl })
    .eq('token', token)

  return Response.json({ url: publicUrl })
}
