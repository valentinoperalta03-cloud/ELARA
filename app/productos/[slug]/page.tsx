import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import ProductLanding from '@/components/products/ProductLanding'
import { getProductBySlug, products } from '@/data/products'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — ELARA`,
    description: product.description,
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  return (
    <main>
      <Navbar />
      <ProductLanding product={product} />
      <Footer />
    </main>
  )
}
