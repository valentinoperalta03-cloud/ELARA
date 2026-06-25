import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Contacto — ELARA',
  description: 'Hablemos sobre tu negocio. Te respondemos en menos de 24 horas.',
}

export default function ContactoPage() {
  return (
    <main>
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  )
}
