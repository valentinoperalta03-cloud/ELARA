import AdminLoginForm from '@/components/admin/AdminLoginForm'

export const metadata = { title: 'ELARA Admin — Iniciar sesión' }

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-display font-bold text-2xl text-white tracking-tight mb-2">
            ELARA
          </div>
          <p className="text-sm text-zinc-500">Panel administrativo interno</p>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8">
          <h1 className="font-display font-semibold text-white text-lg mb-6">
            Iniciar sesión
          </h1>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
