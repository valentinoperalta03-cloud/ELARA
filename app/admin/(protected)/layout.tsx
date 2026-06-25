import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: admin } = await supabaseAdmin
    .from('elara_admins')
    .select('id, name, email, role, avatar_url')
    .eq('id', user.id)
    .single()

  if (!admin) redirect('/admin/login')

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      <AdminSidebar admin={admin} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
