import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ELARA Admin — Pagos' }

export default async function PagosPage() {
  const [{ data: orders }, { data: subscriptions }, { data: onboardings }] = await Promise.all([
    supabaseAdmin
      .from('orders')
      .select('*, clients(contact_name, business_name), products(name)')
      .order('created_at', { ascending: false })
      .limit(50),
    supabaseAdmin
      .from('subscriptions')
      .select('*, clients(contact_name, business_name), products(name)')
      .order('created_at', { ascending: false })
      .limit(50),
    supabaseAdmin
      .from('onboarding_submissions')
      .select('order_id, status'),
  ])

  const onboardingByOrder = Object.fromEntries(
    (onboardings ?? []).map(o => [o.order_id, o.status as string])
  )

  const orderStatusColor: Record<string, string> = {
    paid:     'bg-emerald-50 text-emerald-700',
    pending:  'bg-amber-50 text-amber-700',
    refunded: 'bg-red-50 text-red-500',
    failed:   'bg-zinc-100 text-zinc-400',
  }

  const subStatusColor: Record<string, string> = {
    active:   'bg-emerald-50 text-emerald-700',
    pending:  'bg-amber-50 text-amber-700',
    paused:   'bg-zinc-100 text-zinc-500',
    past_due: 'bg-red-50 text-red-600',
    cancelled:'bg-zinc-100 text-zinc-400',
    expired:  'bg-zinc-100 text-zinc-400',
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-zinc-900">Pagos</h1>
        <p className="text-sm text-zinc-500 mt-1">Órdenes y suscripciones de Lemon Squeezy</p>
      </div>

      {/* Órdenes únicas */}
      <section>
        <h2 className="font-display font-semibold text-zinc-900 mb-3">
          Órdenes únicas ({orders?.length ?? 0})
        </h2>
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          {!orders?.length ? (
            <div className="text-center py-10 text-zinc-400 text-sm">Sin órdenes</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-100">
                <tr>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Producto</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Monto</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Estado</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Onboarding</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-zinc-900">
                      {order.clients?.business_name ?? order.clients?.contact_name ?? order.customer_name ?? '—'}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600">{order.products?.name ?? '—'}</td>
                    <td className="px-5 py-3.5 text-zinc-900 font-mono text-xs">
                      {order.currency} ${(order.amount_cents / 100).toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${orderStatusColor[order.status] ?? 'bg-zinc-100 text-zinc-400'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {onboardingByOrder[order.id] === 'completed' ? (
                        <span className="text-xs font-medium px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700">Completado</span>
                      ) : onboardingByOrder[order.id] ? (
                        <span className="text-xs font-medium px-2 py-1 rounded-lg bg-amber-50 text-amber-700">Pendiente</span>
                      ) : (
                        <span className="text-xs text-zinc-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-400">
                      {new Date(order.created_at).toLocaleDateString('es-AR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Suscripciones */}
      <section>
        <h2 className="font-display font-semibold text-zinc-900 mb-3">
          Suscripciones ({subscriptions?.length ?? 0})
        </h2>
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          {!subscriptions?.length ? (
            <div className="text-center py-10 text-zinc-400 text-sm">Sin suscripciones</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-100">
                <tr>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Producto</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Estado</th>
                  <th className="text-left text-xs font-medium text-zinc-400 px-5 py-3">Próximo cobro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {subscriptions.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-zinc-900">
                      {sub.clients?.business_name ?? sub.clients?.contact_name ?? sub.customer_name ?? '—'}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600">{sub.products?.name ?? '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${subStatusColor[sub.status] ?? 'bg-zinc-100 text-zinc-400'}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-400">
                      {sub.next_billing_date
                        ? new Date(sub.next_billing_date).toLocaleDateString('es-AR')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
