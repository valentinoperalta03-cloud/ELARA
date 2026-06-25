import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ELARA — Más clientes. Menos tareas. Menos dependencia.',
  description:
    'ELARA implementa sistemas para que tu negocio consiga más clientes, automatice operaciones y funcione sin depender del dueño.',
  keywords: [
    'automatización de negocios',
    'sistemas para comercios',
    'más clientes',
    'automatizar tareas',
    'gestión de reservas',
    'CRM para negocios',
  ],
  openGraph: {
    title: 'ELARA — Más clientes. Menos tareas. Menos dependencia.',
    description:
      'ELARA implementa sistemas para que tu negocio consiga más clientes, automatice operaciones y funcione sin depender del dueño.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELARA — Más clientes. Menos tareas. Menos dependencia.',
    description:
      'ELARA implementa sistemas para que tu negocio consiga más clientes, automatice operaciones y funcione sin depender del dueño.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-white text-zinc-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
