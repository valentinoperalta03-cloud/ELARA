import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const formData = await request.formData()
  const token = formData.get('token') as string | null
  const path = formData.get('path') as string | null
  const file = formData.get('file') as File | null

  if (!token || !path || !file) {
    return Response.json({ error: 'token, path y file requeridos' }, { status: 400 })
  }

  const { data: submission } = await supabaseAdmin
    .from('onboarding_submissions')
    .select('id')
    .eq('token', token)
    .single()

  if (!submission) {
    return Response.json({ error: 'Token inválido' }, { status: 404 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const storagePath = `${token}/${path}`

  const { error } = await supabaseAdmin.storage
    .from('logos')
    .upload(storagePath, buffer, { contentType: file.type, upsert: true })

  if (error) {
    console.error('[upload-file]', error)
    return Response.json({ error: 'Error al subir archivo' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('logos')
    .getPublicUrl(storagePath)

  return Response.json({ url: publicUrl })
}
