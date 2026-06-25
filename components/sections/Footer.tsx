import Link from 'next/link'

const links = [
  { label: 'Sistemas', href: '#sistemas' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Precios', href: '#precios' },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display font-bold text-xl text-white tracking-tight select-none"
            aria-label="ELARA — Inicio"
          >
            ELARA
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} ELARA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
