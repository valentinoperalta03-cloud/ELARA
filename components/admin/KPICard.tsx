import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

type Color = 'blue' | 'emerald' | 'amber' | 'violet'

const colorMap: Record<Color, { bg: string; icon: string; text: string }> = {
  blue:    { bg: 'bg-blue-50',    icon: 'text-blue-600',    text: 'text-blue-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', text: 'text-emerald-600' },
  amber:   { bg: 'bg-amber-50',   icon: 'text-amber-600',   text: 'text-amber-600' },
  violet:  { bg: 'bg-violet-50',  icon: 'text-violet-600',  text: 'text-violet-600' },
}

interface Props {
  label: string
  value: number
  icon: LucideIcon
  color: Color
  href: string
}

export default function KPICard({ label, value, icon: Icon, color, href }: Props) {
  const c = colorMap[color]

  return (
    <Link
      href={href}
      className="bg-white border border-zinc-200 rounded-2xl p-5 hover:shadow-sm hover:border-zinc-300 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
      <div className="font-display font-bold text-3xl text-zinc-900 mb-0.5">
        {value}
      </div>
      <div className="text-sm text-zinc-500">{label}</div>
    </Link>
  )
}
