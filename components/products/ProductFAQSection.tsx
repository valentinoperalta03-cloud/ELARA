'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Product } from '@/data/products'
import FadeIn from '@/components/ui/FadeIn'

export default function ProductFAQSection({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-5 bg-zinc-900/40">
      <div className="max-w-3xl mx-auto">
        <FadeIn direction="up" className="mb-10">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">FAQ</span>
          <h2 className="font-display font-bold text-3xl text-white mt-3">Preguntas frecuentes</h2>
        </FadeIn>

        <div className="space-y-2">
          {product.faq.map((item, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.05}>
              <div className="border border-white/[0.06] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-medium text-white">{item.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus className="w-4 h-4 text-zinc-500 shrink-0 ml-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
