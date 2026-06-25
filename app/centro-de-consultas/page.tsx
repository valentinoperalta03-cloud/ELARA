import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import CentroConsultas from '@/components/chatbot/CentroConsultas'

export const metadata = {
  title: 'Centro de Consultas — ELARA',
  description: 'Todo lo que necesitás saber sobre ELARA. Consultá en tiempo real.',
}

export default function CentroConsultasPage() {
  return (
    <main>
      <Navbar />
      <CentroConsultas />
      <Footer />
    </main>
  )
}
