'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, RefreshCw } from 'lucide-react'
import { products } from '@/data/products'
import { CHECKOUT } from '@/data/checkout'
import FadeIn from '@/components/ui/FadeIn'

const accentMap: Record<string, { border: string; badge: string; icon: string; glow: string }> = {
  blue:   { border: 'hover:border-blue-500/40',   badge: 'bg-blue-500/10 text-blue-400',   icon: 'text-blue-400',   glow: 'group-hover:shadow-blue-500/10' },
  emerald:{ border: 'hover:border-emerald-500/40', badge: 'bg-emerald-500/10 text-emerald-400', icon: 'text-emerald-400', glow: 'group-hover:shadow-emerald-500/10' },
  violet: { border: 'hover:border-violet-500/40',  badge: 'bg-violet-500/10 text-violet-400',  icon: 'text-violet-400',  glow: 'group-hover:shadow-violet-500/10' },
  amber:  { border: 'hover:border-amber-500/40',   badge: 'bg-amber-500/10 text-amber-400',   icon: 'text-amber-400',   glow: 'group-hover:shadow-amber-500/10' },
  pink:   { border: 'hover:border-pink-500/40',    badge: 'bg-pink-500/10 text-pink-400',    icon: 'text-pink-400',    glow: 'group-hover:shadow-pink-500/10' },
  cyan:   { border: 'hover:border-cyan-500/40',    badge: 'bg-cyan-500/10 text-cyan-400',    icon: 'text-cyan-400',    glow: 'group-hover:shadow-cyan-500/10' },
  indigo: { border: 'hover:border-indigo-500/40',  badge: 'bg-indigo-500/10 text-indigo-400',  icon: 'text-indigo-400',  glow: 'group-hover:shadow-indigo-500/10' },
}

export default function ProductsGrid() {
  return (
    <section className="bg-zinc-950 min-h-screen pt-32 pb-24 px-5">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full px-3 py-1 mb-6">
            7 sistemas disponibles
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Elige el sistema
            <br />
            <span className="text-gradient">que tu negocio necesita.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Cada producto resuelve un problema específico. Podés empezar con uno y sumar más cuando estés listo.
          </p>
        </FadeIn>

        {/* Filters visual */}
        <FadeIn direction="up" delay={0.1} className="flex items-center justify-center gap-3 mb-12">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500 border border-white/[0.06] rounded-full px-3 py-1.5">
            <Zap className="w-3 h-3 text-amber-400" />
            Pago único
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500 border border-white/[0.06] rounded-full px-3 py-1.5">
            <RefreshCw className="w-3 h-3 text-blue-400" />
            Servicios mensuales
          </span>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* ELARA Launch — featured, full width on mobile */}
          {products.map((product, i) => {
            const accent = accentMap[product.accentColor] ?? accentMap.blue
            const isFeatured = product.slug === 'elara-launch'
            const links = CHECKOUT[product.slug as keyof typeof CHECKOUT]
            const buyUrl = product.type === 'one_time'
              ? (links as any).oneTime
              : (links as any).monthly

            return (
              <FadeIn key={product.slug} direction="up" delay={i * 0.07}>
                <div className={`group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${accent.border} hover:shadow-2xl ${isFeatured ? 'ring-1 ring-blue-500/20' : ''}`}>
                  {isFeatured && (
                    <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                  )}

                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{product.icon}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${accent.badge}`}>
                        {product.badge}
                      </span>
                      {isFeatured && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name & description */}
                  <Link href={`/productos/${product.slug}`}>
                    <h2 className="font-display font-bold text-xl text-white mb-2 hover:text-zinc-100 transition-colors">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-6">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="font-display font-bold text-xl text-white">
                      {product.price}
                    </div>
                    <div className="text-xs text-zinc-500">{product.priceSub}</div>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-2">
                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2.5 px-4 rounded-xl text-white transition-all ${
                        product.accentColor === 'blue' ? 'bg-blue-600 hover:bg-blue-500' :
                        product.accentColor === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-500' :
                        product.accentColor === 'violet' ? 'bg-violet-600 hover:bg-violet-500' :
                        product.accentColor === 'amber' ? 'bg-amber-600 hover:bg-amber-500' :
                        product.accentColor === 'pink' ? 'bg-pink-600 hover:bg-pink-500' :
                        product.accentColor === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-500' :
                        'bg-indigo-600 hover:bg-indigo-500'
                      }`}
                    >
                      {product.type === 'one_time' ? 'Comprar' : 'Suscribirse'}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                    <Link
                      href={`/productos/${product.slug}`}
                      className={`text-xs font-medium py-2.5 px-3 rounded-xl border border-white/[0.08] hover:border-white/20 transition-colors ${accent.icon}`}
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.5} className="text-center mt-16">
          <p className="text-zinc-500 text-sm mb-4">¿No sabés por dónde empezar?</p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/[0.12] hover:border-white/30 rounded-xl px-5 py-2.5 transition-all hover:bg-white/[0.04]"
          >
            Hablemos — te recomendamos el sistema ideal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
