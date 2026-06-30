'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { QUESTIONS, buildResult, type DiagnosticoResult } from './engine'

interface Props {
  onComplete: (result: DiagnosticoResult) => void
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

const TOTAL_STEPS = QUESTIONS.length + 1  // +1 for contact step

function ContactForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (contact: { nombre: string; apellido: string; email: string; telefono: string }) => Promise<void>
  onBack: () => void
}) {
  const [nombre,   setNombre]   = useState('')
  const [apellido, setApellido] = useState('')
  const [email,    setEmail]    = useState('')
  const [telefono, setTelefono] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !apellido.trim() || !email.trim() || !telefono.trim()) {
      setError('Completá todos los campos para continuar.')
      return
    }
    setError('')
    setLoading(true)
    await onSubmit({ nombre, apellido, email, telefono })
  }

  const inputCls = 'w-full bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-zinc-600 rounded-2xl px-5 py-4 text-[15px] focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors'

  return (
    <div className="w-full max-w-2xl">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium mb-5">
        Pregunta 12
      </div>

      <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-[2.1rem] text-white leading-tight mb-2">
        ¿A quién le enviamos el análisis?
      </h2>
      <p className="text-zinc-500 text-sm mb-7 leading-relaxed">
        Usamos tus datos para preparar tu plan personalizado. No compartimos tu información con nadie.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre"
            autoFocus
            className={inputCls}
          />
          <input
            type="text"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            placeholder="Apellido"
            className={inputCls}
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className={inputCls}
        />
        <input
          type="tel"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          placeholder="Teléfono / WhatsApp"
          className={inputCls}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[15px] font-semibold rounded-2xl transition-colors mt-2 shadow-[0_0_28px_rgba(37,99,235,0.4)]"
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Generando tu análisis...</>
            : 'Ver mi diagnóstico →'
          }
        </button>
      </form>
    </div>
  )
}

export default function DiagnosticoQuiz({ onComplete }: Props) {
  const [index,   setIndex]   = useState(0)
  const [dir,     setDir]     = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const isContactStep = index === QUESTIONS.length
  const q = !isContactStep ? QUESTIONS[index] : null
  const progress = (index / TOTAL_STEPS) * 100
  const isFirst = index === 0

  function select(value: string) {
    const newAnswers = { ...answers, [q!.id]: value }
    setAnswers(newAnswers)

    setTimeout(() => {
      setDir(1)
      setIndex(i => i + 1)
    }, 220)
  }

  function goBack() {
    if (!isFirst) {
      setDir(-1)
      setIndex(i => i - 1)
    }
  }

  async function handleContactSubmit(contact: { nombre: string; apellido: string; email: string; telefono: string }) {
    const result = buildResult(answers)

    // Save contact + scores to DB
    try {
      await fetch('/api/diagnostico/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${contact.nombre} ${contact.apellido}`.trim(),
          email: contact.email,
          phone: contact.telefono,
          scores: result.scores,
          recommended_services: result.servicios.map(s => s.name),
          answers,
        }),
      })
    } catch { /* non-blocking */ }

    onComplete(result)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/[0.06] z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="fixed top-4 left-5 right-5 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isFirst && (
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Atrás
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-600 font-mono text-xs tabular-nums">
            {index + 1} / {TOTAL_STEPS}
          </span>
          <div className="flex gap-[3px]">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-[3px] w-4 rounded-full transition-colors duration-300 ${
                  i <= index ? 'bg-blue-500' : 'bg-white/[0.08]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-5 pt-20 pb-12">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={isContactStep ? '__contact__' : q!.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-2xl"
          >
            {isContactStep ? (
              <ContactForm onSubmit={handleContactSubmit} onBack={goBack} />
            ) : (
              <>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium mb-5">
                  Pregunta {index + 1}
                </div>

                <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-[2.1rem] text-white leading-tight mb-2">
                  {q!.question}
                </h2>
                {q!.hint && (
                  <p className="text-zinc-500 text-sm mb-7 leading-relaxed">{q!.hint}</p>
                )}
                {!q!.hint && <div className="mb-7" />}

                <div className="grid gap-3">
                  {q!.options.map(opt => {
                    const sel = answers[q!.id] === opt.value
                    return (
                      <motion.button
                        key={opt.value}
                        onClick={() => select(opt.value)}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.997 }}
                        transition={{ duration: 0.1 }}
                        className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-150 ${
                          sel
                            ? 'border-blue-500 bg-blue-500/[0.12] text-white shadow-[0_0_0_1px_rgba(59,130,246,0.3)]'
                            : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <span className="font-medium text-[15px] leading-snug">{opt.label}</span>
                      </motion.button>
                    )
                  })}
                </div>

                <p className="mt-5 text-center text-[11px] text-zinc-700">
                  Seleccioná una opción para continuar
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
