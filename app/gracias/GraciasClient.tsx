'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, MessageCircle, Loader2 } from 'lucide-react'

type State = 'idle' | 'loading' | 'not_found' | 'already_completed' | 'error'

export default function GraciasClient() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setState('loading')

    try {
      const res = await fetch(`/api/onboarding/by-email?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()

      if (res.ok && data.token) {
        router.push(`/onboarding/${data.token}`)
        return
      }

      if (res.status === 409) {
        setState('already_completed')
        return
      }

      setState('not_found')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
          </div>
        </motion.div>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2 text-center">
          ¡Tu pago fue exitoso!
        </h1>
        <p className="text-zinc-400 text-center mb-8 leading-relaxed">
          Ingresá el email con el que realizaste tu compra y completá el formulario de onboarding.
          Con esa información construimos tu sistema exactamente como tu negocio lo necesita.
        </p>

        {/* Form */}
        {state !== 'already_completed' && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={e => { setEmail(e.target.value); setState('idle') }}
              placeholder="tu@email.com"
              required
              className="w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 rounded-xl px-4 py-3.5 text-base focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={state === 'loading' || !email.trim()}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl px-6 py-3.5 text-sm transition-colors shadow-lg"
            >
              {state === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  Acceder al formulario
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* States */}
        {state === 'not_found' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-300 leading-relaxed"
          >
            No encontramos un pago reciente con ese email. Si acabás de pagar, esperá unos segundos y volvé a intentarlo. Si el problema persiste, escribinos al WhatsApp.
            <a
              href="https://wa.me/5493417830260?text=Hola%2C%20acabo%20de%20pagar%20y%20no%20puedo%20acceder%20al%20formulario."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Escribinos al WhatsApp
            </a>
          </motion.div>
        )}

        {state === 'already_completed' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-center"
          >
            <div className="text-2xl mb-2">🙌</div>
            <p className="text-emerald-300 font-medium">Ya completaste tu formulario.</p>
            <p className="text-zinc-400 text-sm mt-1">Nos ponemos en contacto pronto.</p>
          </motion.div>
        )}

        {state === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-zinc-500 text-sm"
          >
            Error de conexión. Intentá de nuevo.
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
