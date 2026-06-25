'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Check, ChevronDown, Zap } from 'lucide-react'
import type { Product } from '@/data/products'
import { CHECKOUT, PRICES } from '@/data/checkout'
import FadeIn from '@/components/ui/FadeIn'
import ProductFAQSection from './ProductFAQSection'

type Accent = { badge: string; stat: string; check: string; step: string; cta: string; border: string; glow: string }

const accentMap: Record<string, Accent> = {
  blue:    { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',    stat: 'text-blue-400',    check: 'text-blue-400',    step: 'bg-blue-500/10 text-blue-400 border-blue-500/20',    cta: 'bg-blue-600 hover:bg-blue-500',    border: 'border-blue-500/20', glow: 'shadow-blue-500/20' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', stat: 'text-emerald-400', check: 'text-emerald-400', step: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', cta: 'bg-emerald-600 hover:bg-emerald-500', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/20' },
  violet:  { badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',  stat: 'text-violet-400',  check: 'text-violet-400',  step: 'bg-violet-500/10 text-violet-400 border-violet-500/20',  cta: 'bg-violet-600 hover:bg-violet-500',  border: 'border-violet-500/20', glow: 'shadow-violet-500/20' },
  amber:   { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',   stat: 'text-amber-400',   check: 'text-amber-400',   step: 'bg-amber-500/10 text-amber-400 border-amber-500/20',   cta: 'bg-amber-600 hover:bg-amber-500',   border: 'border-amber-500/20', glow: 'shadow-amber-500/20' },
  pink:    { badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',    stat: 'text-pink-400',    check: 'text-pink-400',    step: 'bg-pink-500/10 text-pink-400 border-pink-500/20',    cta: 'bg-pink-600 hover:bg-pink-500',    border: 'border-pink-500/20', glow: 'shadow-pink-500/20' },
  cyan:    { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',    stat: 'text-cyan-400',    check: 'text-cyan-400',    step: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',    cta: 'bg-cyan-600 hover:bg-cyan-500',    border: 'border-cyan-500/20', glow: 'shadow-cyan-500/20' },
  indigo:  { badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  stat: 'text-indigo-400',  check: 'text-indigo-400',  step: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  cta: 'bg-indigo-600 hover:bg-indigo-500',  border: 'border-indigo-500/20', glow: 'shadow-indigo-500/20' },
}

export default function ProductLanding({ product }: { product: Product }) {
  const accent = accentMap[product.accentColor] ?? accentMap.blue

  return (
    <div className="bg-zinc-950">
      <ProductHero product={product} accent={accent} />
      <ProductProblem product={product} accent={accent} />
      <ProductSolution product={product} accent={accent} />
      <ProductIncludes product={product} accent={accent} />
      <ProductHowItWorks product={product} accent={accent} />
      <ProductUseCases product={product} accent={accent} />
      <ProductBenefits product={product} accent={accent} />
      <ProductFAQSection product={product} />
      <ProductCTAFinal product={product} accent={accent} />
    </div>
  )
}

/* ─── HERO ─── */
function ProductHero({ product, accent }: { product: Product; accent: Accent }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-20 px-5 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn direction="up">
          <Link href="/productos" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
            ← Volver a productos
          </Link>
        </FadeIn>

        <FadeIn direction="up" delay={0.05}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">{product.icon}</span>
            <span className={`text-xs font-medium border px-3 py-1 rounded-full ${accent.badge}`}>
              {product.badge}
            </span>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-[1.1] mb-6">
            {product.hero.headline}
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.15}>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {product.hero.sub}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link
              href="/contacto"
              className={`inline-flex items-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl text-sm shadow-lg transition-all ${accent.cta}`}
            >
              {product.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#que-incluye"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-zinc-300 hover:text-white border border-white/[0.1] hover:border-white/20 rounded-xl text-sm transition-all"
            >
              {product.hero.ctaSecondary}
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn direction="up" delay={0.25}>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[product.hero.stat1, product.hero.stat2, product.hero.stat3].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`font-display font-bold text-2xl mb-1 ${accent.stat}`}>{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── PROBLEM ─── */
function ProductProblem({ product, accent }: any) {
  return (
    <section className="py-24 px-5 bg-zinc-900/40">
      <div className="max-w-4xl mx-auto">
        <FadeIn direction="up">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">El problema</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-5">
            {product.problem.headline}
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl">
            {product.problem.body}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.problem.items.map((item: string, i: number) => (
            <FadeIn key={i} direction="up" delay={i * 0.06}>
              <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                <p className="text-sm text-zinc-300">{item}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SOLUTION ─── */
function ProductSolution({ product, accent }: any) {
  return (
    <section className="py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <FadeIn direction="up">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">La solución</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-5">
            {product.solution.headline}
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
            {product.solution.body}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── INCLUDES ─── */
function ProductIncludes({ product, accent }: any) {
  return (
    <section id="que-incluye" className="py-24 px-5 bg-zinc-900/40">
      <div className="max-w-5xl mx-auto">
        <FadeIn direction="up" className="mb-12">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Qué incluye</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3">
            Todo lo que necesitás, ya incluido.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.includes.map((item: any, i: number) => (
            <FadeIn key={i} direction="up" delay={i * 0.06}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-colors">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-4 ${accent.step}`}>
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="font-display font-semibold text-white text-base mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ─── */
function ProductHowItWorks({ product, accent }: any) {
  return (
    <section className="py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <FadeIn direction="up" className="mb-12">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Cómo funciona</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3">
            Simple. Claro. Sin vueltas.
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {product.howItWorks.map((step: any, i: number) => (
            <FadeIn key={i} direction="up" delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex items-start gap-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <span className={`font-display font-bold text-sm border px-3 py-1 rounded-lg shrink-0 mt-0.5 ${accent.step}`}>
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── USE CASES ─── */
function ProductUseCases({ product, accent }: any) {
  return (
    <section className="py-24 px-5 bg-zinc-900/40">
      <div className="max-w-5xl mx-auto">
        <FadeIn direction="up" className="mb-12">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Casos de uso</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3">
            Funciona para tu tipo de negocio.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.useCases.map((uc: any, i: number) => (
            <FadeIn key={i} direction="up" delay={i * 0.06}>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-colors">
                <span className="text-2xl mb-3 block">{uc.icon}</span>
                <h3 className="font-display font-semibold text-white text-sm mb-1">{uc.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{uc.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── BENEFITS ─── */
function ProductBenefits({ product, accent }: any) {
  return (
    <section className="py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <FadeIn direction="up" className="mb-12">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Resultados</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3">
            Lo que ganás desde el día uno.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.benefits.map((benefit: string, i: number) => (
            <FadeIn key={i} direction="up" delay={i * 0.06}>
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl px-5 py-4">
                <Check className={`w-4 h-4 shrink-0 ${accent.check}`} />
                <span className="text-sm text-zinc-200">{benefit}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA FINAL ─── */
function ProductCTAFinal({ product, accent }: any) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const links = CHECKOUT[product.slug as keyof typeof CHECKOUT]
  const isOneTime = product.type === 'one_time'

  const buyUrl = isOneTime
    ? (links as any).oneTime
    : billing === 'annual'
    ? (links as any).annual
    : (links as any).monthly

  return (
    <section className="py-24 px-5">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn direction="up">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <span className="text-3xl mb-4 block">{product.icon}</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
              Empezar con {product.name}
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm">
              Sin contratos largos. Sin letra chica. Cancelable cuando quieras.
            </p>

            {/* Price + billing toggle */}
            {isOneTime ? (
              <div className="mb-8">
                <div className="font-display font-bold text-4xl text-white mb-1">
                  {PRICES.launch.oneTime}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500">
                  <Zap className="w-3 h-3 text-amber-400" />
                  {PRICES.launch.note}
                </div>
              </div>
            ) : (
              <div className="mb-8">
                {/* Toggle */}
                <div className="inline-flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 mb-5">
                  <button
                    onClick={() => setBilling('monthly')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${billing === 'monthly' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Mensual
                  </button>
                  <button
                    onClick={() => setBilling('annual')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${billing === 'annual' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Anual
                    <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                      -20%
                    </span>
                  </button>
                </div>

                {billing === 'monthly' ? (
                  <div>
                    <div className="font-display font-bold text-4xl text-white mb-1">{PRICES.subscription.monthly}</div>
                    <div className="text-xs text-zinc-500">Cancelable cuando quieras</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-display font-bold text-4xl text-white mb-1">{PRICES.subscription.annual}</div>
                    <div className="text-xs text-emerald-400">20% de descuento · Equivale a 2 meses gratis</div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl text-sm shadow-lg transition-all ${accent.cta}`}
              >
                {isOneTime ? 'Comprar ahora' : 'Suscribirme'}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 rounded-xl text-sm transition-all"
              >
                Tengo preguntas
              </Link>
            </div>
            <p className="text-xs text-zinc-600 mt-5">Procesado de forma segura por Lemon Squeezy</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
