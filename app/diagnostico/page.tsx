'use client'

import { useState, useEffect } from 'react'
import DiagnosticoQuiz from './DiagnosticoQuiz'
import DiagnosticoResult from './DiagnosticoResult'
import { type DiagnosticoResult as TResult } from './engine'

const STORAGE_KEY  = 'elara_diag_result_v1'
const LOCK_MS      = 24 * 60 * 60 * 1000  // 24 horas

export default function DiagnosticoPage() {
  const [result, setResult] = useState<TResult | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as { result: TResult; savedAt: number }
        const age = Date.now() - (saved.savedAt ?? 0)
        if (age < LOCK_MS) {
          setResult(saved.result)
        } else {
          // Expired lock — clear so they can redo
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch { /* ignore */ }
    setLoaded(true)
  }, [])

  function handleComplete(r: TResult) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ result: r, savedAt: Date.now() }))
    } catch { /* ignore */ }
    setResult(r)
  }

  if (!loaded) return null
  if (result) return <DiagnosticoResult result={result} />
  return <DiagnosticoQuiz onComplete={handleComplete} />
}
