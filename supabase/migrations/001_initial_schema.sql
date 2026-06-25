-- ============================================================
-- ELARA — Schema inicial
-- Aplicar en: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLA: products
-- Catálogo de productos de ELARA (modificado solo por admins)
-- ============================================================
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  type            TEXT NOT NULL CHECK (type IN ('one_time', 'subscription')),
  billing_interval TEXT CHECK (billing_interval IN ('monthly', 'yearly') OR billing_interval IS NULL),

  -- IDs de Lemon Squeezy (se rellenan después de crear los productos allá)
  ls_product_id   TEXT,
  ls_variant_id   TEXT,

  -- Precio en centavos para evitar floats
  price_cents     INTEGER,
  currency        TEXT DEFAULT 'USD',

  active          BOOLEAN DEFAULT TRUE,
  display_order   INTEGER,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: clients
-- Negocios que compran a ELARA
-- ============================================================
CREATE TABLE clients (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contacto
  contact_name       TEXT NOT NULL,
  contact_email      TEXT NOT NULL UNIQUE,
  contact_phone      TEXT,
  contact_whatsapp   TEXT,

  -- Negocio
  business_name      TEXT,
  business_type      TEXT,
  business_address   TEXT,
  business_city      TEXT,
  website_url        TEXT,
  google_profile_url TEXT,

  -- Estado del cliente en ELARA
  status             TEXT DEFAULT 'lead'
                     CHECK (status IN ('lead', 'onboarding', 'active', 'paused', 'churned')),
  source             TEXT, -- 'web', 'referral', 'instagram', etc.

  -- Lemon Squeezy customer ID
  ls_customer_id     TEXT,

  -- Extras
  notes              TEXT,
  tags               TEXT[] DEFAULT '{}',

  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: elara_admins
-- Usuarios internos del equipo ELARA
-- Referencia a auth.users de Supabase
-- ============================================================
CREATE TABLE elara_admins (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  role       TEXT DEFAULT 'admin'
             CHECK (role IN ('super_admin', 'admin', 'support')),
  avatar_url TEXT,
  active     BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: orders
-- Pagos únicos (ELARA Launch™ principalmente)
-- ============================================================
CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID REFERENCES clients(id) ON DELETE SET NULL,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,

  -- Datos de Lemon Squeezy
  ls_order_id     TEXT UNIQUE,
  ls_order_number TEXT,

  amount_cents    INTEGER NOT NULL,
  currency        TEXT DEFAULT 'USD',

  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending', 'paid', 'refunded', 'failed')),

  -- Snapshot del comprador (en caso de que el cliente se borre)
  customer_name   TEXT,
  customer_email  TEXT,

  paid_at         TIMESTAMPTZ,
  refunded_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: subscriptions
-- Servicios mensuales activos
-- ============================================================
CREATE TABLE subscriptions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id             UUID REFERENCES clients(id) ON DELETE SET NULL,
  product_id            UUID REFERENCES products(id) ON DELETE SET NULL,

  -- Lemon Squeezy
  ls_subscription_id    TEXT UNIQUE,

  status                TEXT DEFAULT 'pending'
                        CHECK (status IN (
                          'pending', 'active', 'paused',
                          'past_due', 'cancelled', 'expired'
                        )),

  -- Ciclo de facturación
  billing_anchor        DATE,
  current_period_start  TIMESTAMPTZ,
  current_period_end    TIMESTAMPTZ,
  next_billing_date     TIMESTAMPTZ,
  cancelled_at          TIMESTAMPTZ,

  -- Configuración específica del producto (flexible)
  -- Ej: {"system_type": "turnos", "automations_count": 2}
  config                JSONB DEFAULT '{}',

  -- Snapshot del comprador
  customer_name         TEXT,
  customer_email        TEXT,

  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: implementations
-- El estado operativo de cada producto por cliente
-- Esta tabla es el corazón del dashboard admin
-- ============================================================
CREATE TABLE implementations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  order_id        UUID REFERENCES orders(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,

  -- Admin responsable
  assigned_to     UUID REFERENCES elara_admins(id) ON DELETE SET NULL,

  status          TEXT DEFAULT 'pending'
                  CHECK (status IN (
                    'pending', 'in_progress', 'waiting_client',
                    'completed', 'paused', 'cancelled'
                  )),

  -- Checklist de tareas (array de objetos)
  -- [{"id": "1", "task": "Crear dominio", "done": false, "due": null}]
  checklist       JSONB DEFAULT '[]',

  -- Entregables finales
  -- [{"type": "url", "label": "Sitio web", "value": "https://..."}]
  deliverables    JSONB DEFAULT '[]',

  priority        TEXT DEFAULT 'normal'
                  CHECK (priority IN ('low', 'normal', 'high', 'urgent')),

  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  deadline        TIMESTAMPTZ,

  internal_notes  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: leads
-- Leads capturados por el sitio de cada cliente (Launch™)
-- ============================================================
CREATE TABLE leads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        UUID REFERENCES clients(id) ON DELETE CASCADE,

  -- Datos de la persona que dejó el lead
  name             TEXT,
  email            TEXT,
  phone            TEXT,
  service_interest TEXT,
  message          TEXT,
  source           TEXT DEFAULT 'form', -- 'chatbot', 'form', 'whatsapp'

  status           TEXT DEFAULT 'new'
                   CHECK (status IN ('new', 'contacted', 'qualified', 'lost')),

  captured_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: chatbot_configs
-- Configuración del chatbot rule-based de Launch™
-- ============================================================
CREATE TABLE chatbot_configs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  name            TEXT NOT NULL,
  welcome_msg     TEXT DEFAULT '¡Hola! ¿En qué puedo ayudarte?',
  offline_msg     TEXT DEFAULT 'En este momento no estamos disponibles. Te contactamos a la brevedad.',
  whatsapp_number TEXT,

  -- Árbol de flujo conversacional
  -- [{"id":"1","label":"Ver horarios","response":"Abrimos de lunes a viernes...","children":["2","3"]}]
  flow            JSONB DEFAULT '[]',

  active          BOOLEAN DEFAULT TRUE,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT chatbot_configs_client_unique UNIQUE (client_id)
);

-- ============================================================
-- TABLA: webhook_events
-- Log completo de eventos de Lemon Squeezy
-- Crítico para idempotencia y debugging
-- ============================================================
CREATE TABLE webhook_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source       TEXT DEFAULT 'lemon_squeezy',
  event_name   TEXT NOT NULL,
  payload      JSONB NOT NULL,
  processed    BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  error        TEXT,
  received_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIGGERS: updated_at automático
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER implementations_updated_at
  BEFORE UPDATE ON implementations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- ÍNDICES para performance
-- ============================================================
CREATE INDEX idx_clients_email        ON clients(contact_email);
CREATE INDEX idx_clients_status       ON clients(status);
CREATE INDEX idx_clients_ls_customer  ON clients(ls_customer_id);

CREATE INDEX idx_orders_client        ON orders(client_id);
CREATE INDEX idx_orders_ls_order      ON orders(ls_order_id);
CREATE INDEX idx_orders_status        ON orders(status);

CREATE INDEX idx_subscriptions_client ON subscriptions(client_id);
CREATE INDEX idx_subscriptions_ls     ON subscriptions(ls_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

CREATE INDEX idx_implementations_client ON implementations(client_id);
CREATE INDEX idx_implementations_status ON implementations(status);
CREATE INDEX idx_implementations_assigned ON implementations(assigned_to);

CREATE INDEX idx_leads_client         ON leads(client_id);
CREATE INDEX idx_leads_captured_at    ON leads(captured_at DESC);

CREATE INDEX idx_webhook_events_name  ON webhook_events(event_name);
CREATE INDEX idx_webhook_events_proc  ON webhook_events(processed);

-- ============================================================
-- RLS (Row Level Security)
-- Toda la data es accedida server-side con service_role key
-- que bypasea RLS. RLS bloquea acceso directo desde browser.
-- ============================================================
ALTER TABLE products           ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients            ENABLE ROW LEVEL SECURITY;
ALTER TABLE elara_admins       ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE implementations    ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads              ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_configs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events     ENABLE ROW LEVEL SECURITY;

-- Los admins autenticados pueden leer todo
CREATE POLICY "admins_read_all" ON products
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON clients
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON subscriptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON implementations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON leads
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON elara_admins
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON chatbot_configs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "admins_read_all" ON webhook_events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

-- ============================================================
-- SEED: Productos iniciales
-- Los ls_product_id y ls_variant_id se actualizan
-- después de configurar Lemon Squeezy
-- ============================================================
INSERT INTO products (slug, name, type, billing_interval, active, display_order) VALUES
  ('elara-launch',  'ELARA Launch™',  'one_time',    NULL,      TRUE, 1),
  ('inbox-ai',      'Inbox AI™',      'subscription', 'monthly', TRUE, 2),
  ('smart-system',  'Smart System™',  'subscription', 'monthly', TRUE, 3),
  ('automations',   'Automations™',   'subscription', 'monthly', TRUE, 4),
  ('social-ai',     'Social AI™',     'subscription', 'monthly', TRUE, 5),
  ('leads-ai',      'Leads AI™',      'subscription', 'monthly', TRUE, 6),
  ('insights',      'Insights™',      'subscription', 'monthly', TRUE, 7);
