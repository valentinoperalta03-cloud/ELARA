import { supabaseAdmin } from '@/lib/supabase/admin'
import OnboardingForm from './OnboardingForm'

export const dynamic = 'force-dynamic'

interface Props {
  params: { token: string }
}

export default async function OnboardingPage({ params }: Props) {
  const { data: submission } = await supabaseAdmin
    .from('onboarding_submissions')
    .select('token, product_slug, status')
    .eq('token', params.token)
    .single()

  if (!submission) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="font-display font-bold text-2xl text-white mb-2">Link inválido</h1>
          <p className="text-zinc-400 text-sm">
            Este formulario no existe o ya fue utilizado.
          </p>
        </div>
      </div>
    )
  }

  if (submission.status === 'completed') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">🙌</div>
          <h1 className="font-display font-bold text-2xl text-white mb-2">
            ¡Ya completaste tu formulario!
          </h1>
          <p className="text-zinc-400 text-sm">
            Ya tenemos todo lo que necesitamos. Nos ponemos en contacto pronto.
          </p>
        </div>
      </div>
    )
  }

  return (
    <OnboardingForm token={submission.token} productSlug={submission.product_slug} />
  )
}
