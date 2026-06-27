// Tipos TypeScript generados manualmente desde el schema SQL
// Cuando tengas el proyecto en Supabase, podés auto-generarlos con:
// npx supabase gen types typescript --project-id <tu-id> > types/database.ts

export type ProductType = 'one_time' | 'subscription'
export type BillingInterval = 'monthly' | 'yearly'
export type ClientStatus = 'lead' | 'onboarding' | 'active' | 'paused' | 'churned'
export type OrderStatus = 'pending' | 'paid' | 'refunded' | 'failed'
export type SubscriptionStatus =
  | 'pending'
  | 'active'
  | 'paused'
  | 'past_due'
  | 'cancelled'
  | 'expired'
export type ImplementationStatus =
  | 'pending'
  | 'in_progress'
  | 'waiting_client'
  | 'completed'
  | 'paused'
  | 'cancelled'
export type ImplementationPriority = 'low' | 'normal' | 'high' | 'urgent'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost'
export type AdminRole = 'super_admin' | 'admin' | 'support'

export interface Product {
  id: string
  slug: string
  name: string
  description: string | null
  type: ProductType
  billing_interval: BillingInterval | null
  ls_product_id: string | null
  ls_variant_id: string | null
  price_cents: number | null
  currency: string
  active: boolean
  display_order: number | null
  created_at: string
}

export interface Client {
  id: string
  contact_name: string
  contact_email: string
  contact_phone: string | null
  contact_whatsapp: string | null
  business_name: string | null
  business_type: string | null
  business_address: string | null
  business_city: string | null
  website_url: string | null
  google_profile_url: string | null
  status: ClientStatus
  source: string | null
  ls_customer_id: string | null
  notes: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface ElaraAdmin {
  id: string
  name: string
  email: string
  role: AdminRole
  avatar_url: string | null
  active: boolean
  created_at: string
}

export interface Order {
  id: string
  client_id: string | null
  product_id: string | null
  ls_order_id: string | null
  ls_order_number: string | null
  amount_cents: number
  currency: string
  status: OrderStatus
  customer_name: string | null
  customer_email: string | null
  paid_at: string | null
  refunded_at: string | null
  created_at: string
}

export interface Subscription {
  id: string
  client_id: string | null
  product_id: string | null
  ls_subscription_id: string | null
  status: SubscriptionStatus
  billing_anchor: string | null
  current_period_start: string | null
  current_period_end: string | null
  next_billing_date: string | null
  cancelled_at: string | null
  config: Record<string, unknown>
  customer_name: string | null
  customer_email: string | null
  created_at: string
  updated_at: string
}

export interface ChecklistItem {
  id: string
  task: string
  done: boolean
  due: string | null
}

export interface Deliverable {
  type: 'url' | 'file' | 'text'
  label: string
  value: string
}

export interface Implementation {
  id: string
  client_id: string
  product_id: string | null
  order_id: string | null
  subscription_id: string | null
  assigned_to: string | null
  status: ImplementationStatus
  checklist: ChecklistItem[]
  deliverables: Deliverable[]
  priority: ImplementationPriority
  started_at: string | null
  completed_at: string | null
  deadline: string | null
  internal_notes: string | null
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  client_id: string | null
  name: string | null
  email: string | null
  phone: string | null
  service_interest: string | null
  message: string | null
  source: string
  status: LeadStatus
  captured_at: string
}

export interface ChatbotFlowNode {
  id: string
  label: string
  response: string
  children: string[]
}

export interface ChatbotConfig {
  id: string
  client_id: string
  name: string
  welcome_msg: string
  offline_msg: string
  whatsapp_number: string | null
  flow: ChatbotFlowNode[]
  active: boolean
  updated_at: string
}

export interface WebhookEvent {
  id: string
  source: string
  event_name: string
  payload: Record<string, unknown>
  processed: boolean
  processed_at: string | null
  error: string | null
  received_at: string
}

export interface OnboardingSubmission {
  id: string
  client_id: string | null
  order_id: string | null
  subscription_id: string | null
  product_slug: string
  token: string
  status: 'pending' | 'completed'
  logo_url: string | null
  answers: Record<string, unknown>
  completed_at: string | null
  created_at: string
}

// Joins útiles para el dashboard
export interface ClientWithStats extends Client {
  orders?: Order[]
  subscriptions?: Subscription[]
  implementations?: Implementation[]
  leads_count?: number
}

export interface ImplementationWithRelations extends Implementation {
  client?: Client
  product?: Product
  assigned_admin?: ElaraAdmin
}
