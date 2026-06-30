'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'
import ElaraLogo from '@/components/ui/ElaraLogo'

const navLinks = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Productos', href: '/productos' },
  { label: 'Consultas', href: '/centro-de-consultas' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/92 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="select-none">
            <ElaraLogo className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-150 font-medium"
            >
              <Zap className="w-3.5 h-3.5" />
              Diagnóstico Gratis
            </Link>
          </div>

          <div className="hidden md:block">
            <Link
              href="/contacto"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors"
            >
              Empezar ahora
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed inset-x-0 top-16 z-40 bg-zinc-950/96 backdrop-blur-md border-b border-white/[0.06] md:hidden"
        >
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm text-zinc-300 hover:text-white transition-colors border-b border-white/[0.06]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/diagnostico"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm text-blue-400 font-medium transition-colors border-b border-white/[0.06] flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Diagnóstico Gratis
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors"
            >
              Empezar ahora
            </Link>
          </nav>
        </motion.div>
      )}
    </>
  )
}
