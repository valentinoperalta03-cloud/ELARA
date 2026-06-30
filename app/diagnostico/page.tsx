'use client'

import { useState, useEffect } from 'react'
import DiagnosticoQuiz from './DiagnosticoQuiz'
import DiagnosticoResult from './DiagnosticoResult'
import { type DiagnosticoResult as TResult } from './engine'

const STORAGE_KEY = 'elara_diag_result_v1'

export default function DiagnosticoPage() {
  const [result, setResult] = useState<TResult | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setResult(JSON.parse(saved))
    } catch { /* ignore */ }
    setLoaded(true)
  }, [])

  function handleComplete(r: TResult) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(r)) } catch { /* ignore */ }
    setResult(r)
  }

  function handleReset() {
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
    setResult(null)
  }

  if (!loaded) return null

  if (result) return <DiagnosticoResult result={result} onReset={handleReset} />
  return <DiagnosticoQuiz onComplete={handleComplete} />
}
