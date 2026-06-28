'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Upload, X, CheckCircle, Plus, Trash2, ImageIcon } from 'lucide-react'
import { getQuestions, type Question } from './questions'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PhotoItem { file: File; preview: string }
type PhotoValue = (PhotoItem | string)[]

interface ProductItem {
  _id: string
  name: string
  price: string
  description: string
  fotos: PhotoValue
}

interface Props { token: string; productSlug: string }

// ─── Animation ────────────────────────────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OnboardingForm({ token, productSlug }: Props) {
  const allQuestions = getQuestions(productSlug)

  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [currentId, setCurrentId] = useState(allQuestions[0]?.id ?? '')
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Always-fresh reference so async callbacks don't capture stale answers
  const answersRef = useRef(answers)
  answersRef.current = answers

  // Visible questions depend on current answers (conditions filter some out)
  const questions = allQuestions.filter(q => !q.condition || q.condition(answers))
  const index = Math.max(0, questions.findIndex(q => q.id === currentId))
  const q = questions[index]

  const progress = questions.length > 0 ? (index / questions.length) * 100 : 0
  const isFirst = index === 0
  const isLast = index === questions.length - 1

  function setAnswer(val: unknown) {
    setAnswers(a => ({ ...a, [q.id]: val }))
  }

  function canAdvance(): boolean {
    if (!q?.required) return true
    const val = answers[q.id]
    if (val === undefined || val === null || val === '') return false
    if (q.type === 'location') {
      const loc = val as Record<string, string>
      return !!(loc?.direccion && loc?.ciudad)
    }
    if (q.type === 'multiselect') return Array.isArray(val) && (val as unknown[]).length > 0
    return true
  }

  function advance() {
    if (isLast) {
      handleSubmit()
    } else {
      setDir(1)
      setCurrentId(questions[index + 1].id)
    }
  }

  // Used by YesNo which auto-advances and needs to pass the updated answers
  // so conditional filtering sees the new value immediately
  function advanceWithAnswers(newAnswers: Record<string, unknown>) {
    const freshVisible = allQuestions.filter(q => !q.condition || q.condition(newAnswers))
    const freshIndex = freshVisible.findIndex(q => q.id === currentId)
    const nextIndex = freshIndex + 1
    if (nextIndex < freshVisible.length) {
      setDir(1)
      setCurrentId(freshVisible[nextIndex].id)
    } else {
      handleSubmit()
    }
  }

  function goBack() {
    if (!isFirst) {
      setDir(-1)
      setCurrentId(questions[index - 1].id)
    }
  }

  async function uploadFile(file: File, path: string): Promise<string> {
    const fd = new FormData()
    fd.append('token', token)
    fd.append('path', path)
    fd.append('file', file)
    const res = await fetch('/api/onboarding/upload-file', { method: 'POST', body: fd })
    const { url } = await res.json()
    return url as string
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const raw = answersRef.current
      const processed: Record<string, unknown> = { ...raw }

      // Logo
      const logoVal = processed['logo'] as PhotoItem | string | undefined
      if (logoVal && typeof logoVal === 'object' && 'file' in logoVal) {
        const ext = logoVal.file.name.split('.').pop() ?? 'png'
        processed['logo'] = await uploadFile(logoVal.file, `logo/logo.${ext}`)
      }

      // Business photos
      const fotosVal = processed['fotos_negocio'] as PhotoValue | undefined
      if (fotosVal?.length) {
        const urls: string[] = []
        for (let i = 0; i < fotosVal.length; i++) {
          const f = fotosVal[i]
          if (typeof f === 'string') { urls.push(f); continue }
          urls.push(await uploadFile(f.file, `fotos/${i}_${f.file.name}`))
        }
        processed['fotos_negocio'] = urls
      }

      // Products + product photos
      const productsVal = processed['productos_lista'] as ProductItem[] | undefined
      if (productsVal?.length) {
        const cleanProducts = []
        for (let pi = 0; pi < productsVal.length; pi++) {
          const product = productsVal[pi]
          const uploadedFotos: string[] = []
          for (let fi = 0; fi < product.fotos.length; fi++) {
            const f = product.fotos[fi]
            if (typeof f === 'string') { uploadedFotos.push(f); continue }
            uploadedFotos.push(await uploadFile(f.file, `productos/${pi}/${fi}_${f.file.name}`))
          }
          cleanProducts.push({
            name: product.name,
            price: product.price,
            description: product.description,
            fotos: uploadedFotos,
          })
        }
        processed['productos_lista'] = cleanProducts
      }

      await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, answers: processed }),
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
            key={q?.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-xl"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2 leading-tight">
              {q?.question}
            </h2>
            {q?.hint && (
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{q.hint}</p>
            )}
            {!q?.hint && <div className="mb-6" />}

            {q && (
              <QuestionInput
                question={q}
                value={answers[q.id]}
                onChange={setAnswer}
                onNext={advance}
                onNextWithAnswers={advanceWithAnswers}
                currentAnswers={answers}
                isLast={isLast}
                submitting={submitting}
                canAdvance={canAdvance()}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Input dispatch ───────────────────────────────────────────────────────────

interface InputProps {
  question: Question
  value: unknown
  onChange: (val: unknown) => void
  onNext: () => void
  onNextWithAnswers: (a: Record<string, unknown>) => void
  currentAnswers: Record<string, unknown>
  isLast: boolean
  submitting: boolean
  canAdvance: boolean
}

function QuestionInput(props: InputProps) {
  const { question, onNext } = props
  // Skip button shown on non-required questions, except types that handle their own advance (select, yesno)
  const showSkip = !question.required && !['select', 'yesno'].includes(question.type)

  return (
    <div>
      <InputSwitch {...props} />
      {showSkip && (
        <button
          onClick={onNext}
          className="mt-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Omitir esta pregunta →
        </button>
      )}
    </div>
  )
}

function InputSwitch(props: InputProps) {
  switch (props.question.type) {
    case 'text':        return <TextInput {...props} />
    case 'textarea':    return <TextareaInput {...props} />
    case 'location':    return <LocationInput {...props} />
    case 'select':      return <SelectInput {...props} />
    case 'multiselect': return <MultiSelectInput {...props} />
    case 'upload':      return <UploadInput {...props} />
    case 'photos':      return <PhotosInput {...props} />
    case 'yesno':       return <YesNoInput {...props} />
    case 'products':    return <ProductsInput {...props} />
    default:            return null
  }
}

// ─── Shared ───────────────────────────────────────────────────────────────────

const inputClass = 'w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 rounded-xl px-4 py-3.5 text-base focus:border-blue-500 focus:outline-none transition-colors'

function ContinueButton({ onNext, isLast, submitting, canAdvance }: { onNext: () => void; isLast: boolean; submitting: boolean; canAdvance: boolean }) {
  return (
    <button
      onClick={onNext}
      disabled={submitting || !canAdvance}
      className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl px-8 py-3.5 text-sm transition-colors shadow-lg min-h-[48px]"
    >
      {submitting ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {isLast ? 'Enviando...' : 'Cargando...'}
        </>
      ) : (
        <>
          {isLast ? 'Enviar' : 'Continuar'}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  )
}

// ─── TextInput ────────────────────────────────────────────────────────────────

function TextInput({ question: q, value, onChange, onNext, isLast, submitting, canAdvance }: InputProps) {
  return (
    <div>
      <input
        type="text"
        autoFocus
        value={(value as string) ?? ''}
        onChange={e => onChange(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && canAdvance) onNext() }}
        placeholder={q.placeholder}
        className={inputClass}
      />
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    </div>
  )
}

// ─── TextareaInput ────────────────────────────────────────────────────────────

function TextareaInput({ question: q, value, onChange, onNext, isLast, submitting, canAdvance }: InputProps) {
  return (
    <div>
      <textarea
        autoFocus
        rows={4}
        value={(value as string) ?? ''}
        onChange={e => onChange(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (canAdvance) onNext() }
        }}
        placeholder={q.placeholder}
        className={`${inputClass} resize-none leading-relaxed`}
      />
      <p className="text-[11px] text-zinc-600 mt-1.5">Shift + Enter para nueva línea · Enter para continuar</p>
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    </div>
  )
}

// ─── LocationInput ────────────────────────────────────────────────────────────

function LocationInput({ value, onChange, onNext, isLast, submitting, canAdvance }: InputProps) {
  const loc = (value as Record<string, string>) ?? {}
  const update = (field: string, val: string) => onChange({ ...loc, [field]: val })
  return (
    <div className="space-y-3">
      <input autoFocus type="text" value={loc.direccion ?? ''} onChange={e => update('direccion', e.target.value)} placeholder="Dirección" className={inputClass} />
      <input type="text" value={loc.ciudad ?? ''} onChange={e => update('ciudad', e.target.value)} placeholder="Ciudad / Barrio" className={inputClass} />
      <div className="relative">
        <input type="text" value={loc.maps_url ?? ''} onChange={e => update('maps_url', e.target.value)} placeholder="Link de Google Maps" className={inputClass} />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">opcional</span>
      </div>
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={canAdvance} />
    </div>
  )
}

// ─── SelectInput ──────────────────────────────────────────────────────────────

function SelectInput({ question: q, value, onChange, onNext }: InputProps) {
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
          {opt.description && <div className="text-[11px] text-zinc-500 mt-1 leading-tight">{opt.description}</div>}
        </button>
      ))}
    </div>
  )
}

// ─── MultiSelectInput ─────────────────────────────────────────────────────────

function MultiSelectInput({ question: q, value, onChange, onNext, isLast, submitting, canAdvance }: InputProps) {
  const selected = (value as string[]) ?? []
  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val])
  }
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {q.options?.map(opt => {
          const active = selected.includes(opt.value)
          return (
            <button key={opt.value} onClick={() => toggle(opt.value)} className={`text-left p-4 rounded-xl border transition-all min-h-[48px] flex items-center gap-3 ${active ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/20 hover:bg-white/[0.04]'}`}>
              <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${active ? 'bg-blue-600 border-blue-600' : 'border-white/20'}`}>
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

// ─── UploadInput (logo) ───────────────────────────────────────────────────────

function UploadInput({ value, onChange, onNext, isLast, submitting }: InputProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const preview = typeof value === 'string' ? value : (value as PhotoItem | undefined)?.preview

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = e => onChange({ file, preview: e.target?.result as string })
    reader.readAsDataURL(file)
  }

  return (
    <div>
      {preview ? (
        <div className="relative inline-block mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Logo preview" className="max-h-32 rounded-xl border border-white/10 object-contain bg-white/5 p-2" />
          <button onClick={() => { onChange(undefined); if (fileRef.current) fileRef.current.value = '' }} className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <X className="w-3 h-3 text-zinc-400" />
          </button>
        </div>
      ) : (
        <div onClick={() => fileRef.current?.click()} onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) handleFile(f) }} onDragOver={e => e.preventDefault()} className="border-2 border-dashed border-white/20 hover:border-white/30 rounded-xl p-10 text-center cursor-pointer transition-colors group">
          <Upload className="w-8 h-8 text-zinc-600 group-hover:text-zinc-400 mx-auto mb-3 transition-colors" />
          <p className="text-zinc-400 text-sm">Hacé click o arrastrá tu logo acá</p>
          <p className="text-zinc-600 text-xs mt-1">PNG, JPG, SVG</p>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={true} />
    </div>
  )
}

// ─── PhotosInput (fotos del negocio - múltiple) ───────────────────────────────

function PhotosInput({ value, onChange, onNext, isLast, submitting }: InputProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const photos = (value as PhotoValue) ?? []
  const previews = photos.map(p => typeof p === 'string' ? p : (p as PhotoItem).preview)

  function addFiles(files: FileList | null) {
    if (!files) return
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!fileArray.length) return
    Promise.all(
      fileArray.map(file => new Promise<PhotoItem>(resolve => {
        const reader = new FileReader()
        reader.onload = e => resolve({ file, preview: e.target?.result as string })
        reader.readAsDataURL(file)
      }))
    ).then(newPhotos => onChange([...photos, ...newPhotos]))
  }

  function remove(i: number) {
    onChange(photos.filter((_, j) => j !== i))
  }

  return (
    <div>
      {previews.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {previews.map((src, i) => (
            <div key={i} className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover rounded-xl border border-white/10" />
              <button onClick={() => remove(i)} className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors">
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
          <button onClick={() => fileRef.current?.click()} className="aspect-square border-2 border-dashed border-white/20 hover:border-white/30 rounded-xl flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 transition-colors gap-1">
            <Plus className="w-5 h-5" />
            <span className="text-[10px]">Más</span>
          </button>
        </div>
      ) : (
        <div onClick={() => fileRef.current?.click()} onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files) }} onDragOver={e => e.preventDefault()} className="border-2 border-dashed border-white/20 hover:border-white/30 rounded-xl p-10 text-center cursor-pointer transition-colors group mb-4">
          <ImageIcon className="w-8 h-8 text-zinc-600 group-hover:text-zinc-400 mx-auto mb-3 transition-colors" />
          <p className="text-zinc-400 text-sm">Hacé click o arrastrá tus fotos acá</p>
          <p className="text-zinc-600 text-xs mt-1">Podés subir varias imágenes a la vez</p>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={true} />
    </div>
  )
}

// ─── YesNoInput ───────────────────────────────────────────────────────────────

function YesNoInput({ question: q, value, onChange, onNextWithAnswers, currentAnswers }: InputProps) {
  function select(val: 'si' | 'no') {
    const newAnswers = { ...currentAnswers, [q.id]: val }
    onChange(val)
    setTimeout(() => onNextWithAnswers(newAnswers), 220)
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => select('si')}
        className={`py-7 rounded-2xl border-2 font-bold text-xl transition-all ${value === 'si' ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/20 hover:bg-white/[0.04]'}`}
      >
        ✓ &nbsp;Sí
      </button>
      <button
        onClick={() => select('no')}
        className={`py-7 rounded-2xl border-2 font-bold text-xl transition-all ${value === 'no' ? 'border-red-500/60 bg-red-500/10 text-white' : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/20 hover:bg-white/[0.04]'}`}
      >
        ✗ &nbsp;No
      </button>
    </div>
  )
}

// ─── ProductsInput ────────────────────────────────────────────────────────────

function ProductsInput({ value, onChange, onNext, isLast, submitting }: InputProps) {
  const products = (value as ProductItem[]) ?? []

  function addProduct() {
    onChange([...products, { _id: Math.random().toString(36).slice(2), name: '', price: '', description: '', fotos: [] }])
  }

  function update(i: number, patch: Partial<ProductItem>) {
    const next = [...products]
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }

  function remove(i: number) {
    onChange(products.filter((_, j) => j !== i))
  }

  return (
    <div className="space-y-4">
      {products.length === 0 && (
        <div className="border border-dashed border-white/10 rounded-xl p-6 text-center text-zinc-600 text-sm">
          Todavía no agregaste productos.
        </div>
      )}

      {products.map((product, i) => (
        <ProductCard
          key={product._id}
          product={product}
          index={i}
          onChange={patch => update(i, patch)}
          onRemove={() => remove(i)}
        />
      ))}

      <button
        onClick={addProduct}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-white/20 hover:border-white/30 text-zinc-400 hover:text-zinc-200 rounded-xl py-3.5 text-sm transition-colors"
      >
        <Plus className="w-4 h-4" />
        {products.length > 0 ? 'Agregar otro producto' : 'Agregar un producto'}
      </button>

      <ContinueButton onNext={onNext} isLast={isLast} submitting={submitting} canAdvance={true} />
    </div>
  )
}

function ProductCard({ product, index, onChange, onRemove }: { product: ProductItem; index: number; onChange: (p: Partial<ProductItem>) => void; onRemove: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const previews = product.fotos.map(f => typeof f === 'string' ? f : (f as PhotoItem).preview)

  function addFotos(files: FileList | null) {
    if (!files) return
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!fileArray.length) return
    Promise.all(
      fileArray.map(file => new Promise<PhotoItem>(resolve => {
        const reader = new FileReader()
        reader.onload = e => resolve({ file, preview: e.target?.result as string })
        reader.readAsDataURL(file)
      }))
    ).then(newFotos => onChange({ fotos: [...product.fotos, ...newFotos] }))
  }

  function removeFoto(fi: number) {
    onChange({ fotos: product.fotos.filter((_, j) => j !== fi) })
  }

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-zinc-500 font-mono">Producto {index + 1}</span>
        <button onClick={onRemove} className="text-zinc-700 hover:text-zinc-400 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <input
        type="text"
        value={product.name}
        onChange={e => onChange({ name: e.target.value })}
        placeholder="Nombre del producto"
        className={inputClass}
      />
      <input
        type="text"
        value={product.price}
        onChange={e => onChange({ price: e.target.value })}
        placeholder="Precio (ej: $5.000)"
        className={inputClass}
      />
      <textarea
        rows={2}
        value={product.description}
        onChange={e => onChange({ description: e.target.value })}
        placeholder="Descripción (opcional)"
        className={`${inputClass} resize-none text-sm`}
      />

      <div>
        <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">Fotos</p>
        {previews.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {previews.map((src, fi) => (
              <div key={fi} className="relative w-16 h-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover rounded-lg border border-white/10" />
                <button onClick={() => removeFoto(fi)} className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center">
                  <X className="w-2.5 h-2.5 text-zinc-400" />
                </button>
              </div>
            ))}
            <button onClick={() => fileRef.current?.click()} className="w-16 h-16 border border-dashed border-white/20 hover:border-white/30 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-400 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors border border-dashed border-white/10 hover:border-white/20 rounded-lg px-3 py-2">
            <Upload className="w-3.5 h-3.5" />
            Agregar fotos
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => addFotos(e.target.files)} />
      </div>
    </div>
  )
}

// ─── SuccessScreen ────────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-md">
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
        <h2 className="font-display font-bold text-3xl text-white mb-3">¡Listo! Ya tenemos todo.</h2>
        <p className="text-zinc-400">Recibimos tu información. Nos ponemos en contacto en las próximas horas para arrancar.</p>
      </motion.div>
    </div>
  )
}
