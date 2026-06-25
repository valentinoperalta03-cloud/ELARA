'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MessageCircle, Calendar } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const products = [
  'ELARA Launch™',
  'Inbox AI™',
  'Smart System™',
  'Automations™',
  'Social AI™',
  'Leads AI™',
  'Insights™',
  'No sé todavía — quiero asesoramiento',
]

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    business: '',
    product: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simula envío — en producción conectar a API o Resend
    await new Promise((r) => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  return (
    <section className="bg-zinc-950 min-h-screen pt-32 pb-24 px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-flex text-xs font-medium text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full px-3 py-1 mb-6">
            Respuesta en menos de 24 horas
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Hablemos sobre
            <br />
            <span className="text-gradient">tu negocio.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Contanos qué estás buscando y te recomendamos el sistema ideal para tu situación.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact options sidebar */}
          <FadeIn direction="left" className="lg:col-span-2 space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-display font-semibold text-white text-sm mb-1">WhatsApp</h3>
              <p className="text-xs text-zinc-500 mb-3">Respuesta inmediata en horario comercial</p>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                Iniciar conversación <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-display font-semibold text-white text-sm mb-1">Email</h3>
              <p className="text-xs text-zinc-500 mb-3">Para consultas detalladas</p>
              <a
                href="mailto:hola@elara.com"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                hola@elara.com <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-display font-semibold text-white text-sm mb-1">Llamada de 20 min</h3>
              <p className="text-xs text-zinc-500 mb-3">Gratis. Sin compromiso.</p>
              <a
                href="/contacto"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                Reservar horario <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" className="lg:col-span-3">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Mensaje enviado</h3>
                  <p className="text-zinc-400 text-sm">Te respondemos en menos de 24 horas hábiles.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Nombre</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Negocio / Empresa</label>
                    <input
                      type="text"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      placeholder="¿A qué se dedica tu negocio?"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">¿Qué sistema te interesa?</label>
                    <select
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                    >
                      <option value="" className="bg-zinc-900">Seleccioná un sistema</option>
                      {products.map((p) => (
                        <option key={p} value={p} className="bg-zinc-900">{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Mensaje</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Contanos brevemente qué querés mejorar o automatizar en tu negocio..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    {loading ? 'Enviando...' : 'Enviar mensaje'}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </motion.button>

                  <p className="text-xs text-zinc-600 text-center">
                    Sin spam. Sin presiones. Solo una respuesta útil.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
