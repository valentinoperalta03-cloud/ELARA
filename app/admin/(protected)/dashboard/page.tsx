import { supabaseAdmin } from '@/lib/supabase/admin'
import KPICard from '@/components/admin/KPICard'
import RecentImplementations from '@/components/admin/RecentImplementations'
import RecentLeads from '@/components/admin/RecentLeads'
import { Users, CreditCard, ListChecks, Inbox, TrendingUp, Clock } from 'lucide-react'

async function getDashboardStats() {
  const [
    { count: totalClients },
    { count: activeSubscriptions },
    { count: pendingImplementations },
    { count: newLeads },
    { data: recentImplementations },
    { data: recentLeads },
    { data: revenueData },
  ] = await Promise.all([
    supabaseAdmin.from('clients').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabaseAdmin.from('implementations').select('*', { count: 'exact', head: true }).in('status', ['pending', 'in_progress', 'waiting_client']),
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabaseAdmin
      .from('implementations')
      .select('id, status, priority, created_at, clients(contact_name, business_name), products(name)')
      .order('created_at', { ascending: false })
      .limit(5),
    supabaseAdmin
      .from('leads')
      .select('id, name, email, service_interest, captured_at, clients(business_name)')
      .order('captured_at', { ascending: false })
      .limit(5),
    supabaseAdmin
      .from('orders')
      .select('amount_cents')
      .eq('status', 'paid'),
  ])

  const totalRevenue = (revenueData ?? []).reduce((sum, o) => sum + o.amount_cents, 0)

  return {
    totalClients: totalClients ?? 0,
    activeSubscriptions: activeSubscriptions ?? 0,
    pendingImplementations: pendingImplementations ?? 0,
    newLeads: newLeads ?? 0,
    totalRevenue,
    recentImplementations: recentImplementations ?? [],
    recentLeads: recentLeads ?? [],
  }
}

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ELARA Admin — Dashboard' }

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const kpis = [
    {
      label: 'Clientes totales',
      value: stats.totalClients,
      icon: Users,
      color: 'blue' as const,
      href: '/admin/clientes',
    },
    {
      label: 'Suscripciones activas',
      value: stats.activeSubscriptions,
      icon: TrendingUp,
      color: 'emerald' as const,
      href: '/admin/pagos',
    },
    {
      label: 'Implementaciones activas',
      value: stats.pendingImplementations,
      icon: ListChecks,
      color: 'amber' as const,
      href: '/admin/implementaciones',
    },
    {
      label: 'Leads sin atender',
      value: stats.newLeads,
      icon: Inbox,
      color: 'violet' as const,
      href: '/admin/leads',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Vista general de ELARA</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Revenue banner */}
      <div className="bg-zinc-950 rounded-2xl p-6 mb-8 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-zinc-500 mb-1">Revenue total acumulado</div>
          <div className="font-display font-bold text-3xl text-white">
            ${(stats.totalRevenue / 100).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-blue-400" />
        </div>
      </div>

      {/* Grid: implementaciones + leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentImplementations implementations={stats.recentImplementations as any} />
        <RecentLeads leads={stats.recentLeads as any} />
      </div>
    </div>
  )
}
