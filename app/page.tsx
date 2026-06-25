import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Solution from '@/components/sections/Solution'
import HowItWorksResults from '@/components/sections/HowItWorksResults'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorksResults />
      <FinalCTA />
      <Footer />
    </main>
  )
}
