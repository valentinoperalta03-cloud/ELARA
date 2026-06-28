'use client'

import { useState } from 'react'
import DiagnosticoQuiz from './DiagnosticoQuiz'
import DiagnosticoResult from './DiagnosticoResult'
import { type DiagnosticoResult as TResult } from './engine'

export default function DiagnosticoPage() {
  const [result, setResult] = useState<TResult | null>(null)

  if (result) return <DiagnosticoResult result={result} />
  return <DiagnosticoQuiz onComplete={setResult} />
}
