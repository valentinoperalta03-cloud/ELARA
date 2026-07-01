import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ELARA Launch™ — Tu sistema comercial listo en 24 horas',
  description: 'Sitio web profesional, chatbot, captura de leads y Google optimizado. Todo en un pago único.',
  robots: { index: false, follow: false },
}

export default function ElaraLaunchLayout({ children }: { children: React.ReactNode }) {
  return children
}
