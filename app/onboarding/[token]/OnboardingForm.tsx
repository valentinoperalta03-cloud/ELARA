'use client'

import { useState, useRef, useCallback, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Upload, X, CheckCircle } from 'lucide-react'
import { getQuestions, type Question } from './questions'

interface Props {
  token: string
  productSlug: string
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
}

export default function OnboardingForm({ token, productSlug }: Props) {
  const questions = getQuestions(productSlug)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  const q = questions[index]
  const progress = (index / questions.length) * 100
  const isLast = index === questions.length - 1
  const isFirst = index === 0

  function setAnswer(val: unknown) {
    setAnswers(a => ({ ...a, [q.id]: val }))
  }

  const canAdvance = useCallback(() => {
    if (!q.required) return true
    const val = answers[q.id]
    if (val === undefined || val === null || val === '') return false
    if (q.type === 'location') {
      const loc = val as Record<string, string>
      return !!(loc.direccion && loc.ciudad)
    }
    if (q.type === 'multiselect') {
      return Array.isArray(val) && val.length > 0
    }
    return true
  }, [q, answers])

  async function goNext() {
    if (q.type === 'upload') {
      const val = answers[q.id] as { file?: File } | string | undefined
      if (val && typeof val === 'object' && 'file' in val && val.file) {
        setUploadingLogo(true)
        const fd = new FormData()
        fd.append('token', token)
        fd.append('file', val.file)
        try {
          const res = await fetch('/api/onboarding/upload-logo', { method: 'POST', body: fd })
          if (res.ok) {
            const { url } = await res.json()
            setAnswers(a => ({ ...a, [q.id]: url }))
          }
        } catch {}
        setUploadingLogo(false)
      }
    }

    if (isLast) {
      await handleSubmit()
    } else {
      setDir(1)
      setIndex(i => i + 1)
    }
  }

  function goBack() {
    if (!isFirst) {
      setDir(-1)
      setIndex(i => i - 1)
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, answers }),
      })
      setDone(true)
    } catch {
      setSubmitting(false)
    }
  }

  if (done) return <SuccessScreen />

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <motion.div
          className="h-full bg-blue-600"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="fixed top-3 left-5 right-5 z-40 flex items-center justify-between">
        <span className="text-zinc-500 font-mono text-xs tabular-nums">
          {index + 1} de {questions.length}
        </span>
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

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-5 pt-16 pb-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-xl"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2 leading-tight">
              {q.question}
            </h2>
            {q.hint && (
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{q.hint}</p>
            )}
            {!q.hint && <div className="mb-6" />}

            <QuestionInput
              question={q}
              value={answers[q.id]}
              onChange={setAnswer}
              onNext={goNext}
              isLast={isLast}
              submitting={submitting || uploadingLogo}
              canAdvance={canAdvance()}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── QUESTION INPUT ─── */
interface InputProps {
  question: Question
  value: unknown
  onChange: (val: unknown) => void
  onNext: () => void
  isLast: boolean
  submitting: boolean
  canAdvance: boolean
}

function QuestionInput({ question, value, onChange, onNext, isLast, submitting, canAdvance }: InputProps) {
  switch (question.type) {
    case 'text':
      return <TextInput q={question} value={value as string} onChange={onChange} onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    case 'textarea':
      return <TextareaInput q={question} value={value as string} onChange={onChange} onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    case 'location':
      return <LocationInput q={question} value={value as Record<string, string>} onChange={onChange} onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    case 'select':
      return <SelectInput q={question} value={value as string} onChange={onChange} onNext={onNext} />
    case 'multiselect':
      return <MultiSelectInput q={question} value={value as string[]} onChange={onChange} onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    case 'upload':
      return <UploadInput q={question} value={value} onChange={onChange} onNext={onNext} isLast={isLast} submitting={submitting} />
  }
}

const inputClass = 'w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 rounded-xl px-4 py-3.5 text-base focus:border-blue-500 focus:outline-none transition-colors'

function ContinueButton({ onNext, isLast, submitting, canAdvance }: { onNext: () => void; isLast: boolean; submitting: boolean; canAdvance: boolean }) {
  return (
    <button
      onClick={onNext}
      disabled={submitting || !canAdvance}
      className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl px-8 py-3.5 text-sm transition-colors shadow-lg min-h-[48px]"
    >
      {submitting ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {isLast ? 'Enviando...' : 'Subiendo...'}
        </span>
      ) : (
        <>
          {isLast ? 'Enviar' : 'Continuar'}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  )
}

/* ─── TEXT ─── */
function TextInput({ q, value, onChange, onNext, isLast, submitting, canAdvance }: { q: Question; value: string; onChange: (v: unknown) => void; onNext: () => void; isLast: boolean; submitting: boolean; canAdvance: boolean }) {
  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && canAdvance) onNext()
  }
  return (
    <div>
      <input
        type="text"
        autoFocus
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKey}
        placeholder={q.placeholder}
        className={inputClass}
      />
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    </div>
  )
}

/* ─── TEXTAREA ─── */
function TextareaInput({ q, value, onChange, onNext, isLast, submitting, canAdvance }: { q: Question; value: string; onChange: (v: unknown) => void; onNext: () => void; isLast: boolean; submitting: boolean; canAdvance: boolean }) {
  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (canAdvance) onNext()
    }
  }
  return (
    <div>
      <textarea
        autoFocus
        rows={4}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKey}
        placeholder={q.placeholder}
        className={`${inputClass} resize-none leading-relaxed`}
      />
      <p className="text-[11px] text-zinc-600 mt-1.5">Shift + Enter para nueva línea · Enter para continuar</p>
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    </div>
  )
}

/* ─── LOCATION ─── */
function LocationInput({ q, value, onChange, onNext, isLast, submitting, canAdvance }: { q: Question; value: Record<string, string>; onChange: (v: unknown) => void; onNext: () => void; isLast: boolean; submitting: boolean; canAdvance: boolean }) {
  const loc = value ?? {}
  function update(field: string, val: string) {
    onChange({ ...loc, [field]: val })
  }
  return (
    <div className="space-y-3">
      <input
        type="text"
        autoFocus
        value={loc.direccion ?? ''}
        onChange={e => update('direccion', e.target.value)}
        placeholder="Dirección"
        className={inputClass}
      />
      <input
        type="text"
        value={loc.ciudad ?? ''}
        onChange={e => update('ciudad', e.target.value)}
        placeholder="Ciudad / Barrio"
        className={inputClass}
      />
      <div className="relative">
        <input
          type="text"
          value={loc.maps_url ?? ''}
          onChange={e => update('maps_url', e.target.value)}
          placeholder="Link de Google Maps"
          className={inputClass}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">
          opcional
        </span>
      </div>
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    </div>
  )
}

/* ─── SELECT ─── */
function SelectInput({ q, value, onChange, onNext }: { q: Question; value: string; onChange: (v: unknown) => void; onNext: () => void }) {
  function select(val: string) {
    onChange(val)
    setTimeout(onNext, 180)
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
      {q.options?.map(opt => (
        <button
          key={opt.value}
          onClick={() => select(opt.value)}
          className={`text-left p-4 rounded-xl border transition-all min-h-[48px] ${
            value === opt.value
              ? 'border-blue-500 bg-blue-500/10 text-white'
              : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          <div className="font-medium text-sm leading-snug">{opt.label}</div>
          {opt.description && (
            <div className="text-[11px] text-zinc-500 mt-1 leading-tight">{opt.description}</div>
          )}
        </button>
      ))}
    </div>
  )
}

/* ─── MULTISELECT ─── */
function MultiSelectInput({ q, value, onChange, onNext, isLast, submitting, canAdvance }: { q: Question; value: string[]; onChange: (v: unknown) => void; onNext: () => void; isLast: boolean; submitting: boolean; canAdvance: boolean }) {
  const selected = value ?? []
  function toggle(val: string) {
    if (selected.includes(val)) {
      onChange(selected.filter(v => v !== val))
    } else {
      onChange([...selected, val])
    }
  }
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {q.options?.map(opt => {
          const active = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={`text-left p-4 rounded-xl border transition-all min-h-[48px] flex items-center gap-3 ${
                active
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${
                active ? 'bg-blue-600 border-blue-600' : 'border-white/20'
              }`}>
                {active && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
              <span className="font-medium text-sm leading-snug">{opt.label}</span>
            </button>
          )
        })}
      </div>
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    </div>
  )
}

/* ─── UPLOAD ─── */
function UploadInput({ q, value, onChange, onNext, isLast, submitting }: { q: Question; value: unknown; onChange: (v: unknown) => void; onNext: () => void; isLast: boolean; submitting: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const preview = typeof value === 'string' ? value : (value as { preview?: string } | undefined)?.preview

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      onChange({ file, preview: e.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  function clear() {
    onChange(undefined)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div>
      {preview ? (
        <div className="relative inline-block mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Logo preview" className="max-h-32 rounded-xl border border-white/10 object-contain bg-white/5 p-2" />
          <button
            onClick={clear}
            className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <X className="w-3 h-3 text-zinc-400" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-white/20 hover:border-white/30 rounded-xl p-10 text-center cursor-pointer transition-colors group"
        >
          <Upload className="w-8 h-8 text-zinc-600 group-hover:text-zinc-400 mx-auto mb-3 transition-colors" />
          <p className="text-zinc-400 text-sm">
            Hacé click o arrastrá tu logo acá
          </p>
          <p className="text-zinc-600 text-xs mt-1">PNG, JPG, SVG</p>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      <ContinueButton
        onNext={onNext}
        isLast={isLast}
        submitting={submitting}
        canAdvance={true}
      />
      {!q.required && (
        <button
          onClick={onNext}
          className="mt-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors block"
        >
          Saltar esta pregunta →
        </button>
      )}
    </div>
  )
}

/* ─── SUCCESS SCREEN ─── */
function SuccessScreen() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
          </div>
        </motion.div>
        <h2 className="font-display font-bold text-3xl text-white mb-3">
          ¡Listo! Ya tenemos todo.
        </h2>
        <p className="text-zinc-400">
          Recibimos tu información. Nos ponemos en contacto en las próximas horas para arrancar.
        </p>
      </motion.div>
    </div>
  )
}
