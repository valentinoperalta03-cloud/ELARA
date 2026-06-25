'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { ElaraAdmin } from '@/types/database'
import {
  LayoutDashboard,
  Users,
  ListChecks,
  CreditCard,
  Inbox,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/implementaciones', label: 'Implementaciones', icon: ListChecks },
  { href: '/admin/pagos', label: 'Pagos', icon: CreditCard },
  { href: '/admin/leads', label: 'Leads', icon: Inbox },
  { href: '/admin/config', label: 'Configuración', icon: Settings },
]

interface Props {
  admin: Pick<ElaraAdmin, 'id' | 'name' | 'email' | 'role' | 'avatar_url'>
}

export default function AdminSidebar({ admin }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 bg-zinc-950 border-r border-white/[0.06] flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <span className="font-display font-bold text-xl text-white tracking-tight">
          ELARA
        </span>
        <span className="ml-2 text-[10px] font-medium text-zinc-500 border border-white/[0.1] rounded px-1.5 py-0.5">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                active
                  ? 'bg-white/[0.08] text-white'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {active && (
                <ChevronRight className="w-3 h-3 ml-auto text-zinc-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/[0.06] p-3">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              {admin.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">{admin.name}</div>
            <div className="text-[10px] text-zinc-500 truncate capitalize">{admin.role.replace('_', ' ')}</div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
