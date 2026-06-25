import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import ProductsGrid from '@/components/products/ProductsGrid'

export const metadata = {
  title: 'Productos — ELARA',
  description: 'Sistemas para que tu negocio consiga más clientes, automatice tareas y escale sin depender de vos.',
}

export default function ProductosPage() {
  return (
    <main>
      <Navbar />
      <ProductsGrid />
      <Footer />
    </main>
  )
}
