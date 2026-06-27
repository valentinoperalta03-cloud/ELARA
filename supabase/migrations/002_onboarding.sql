CREATE TABLE onboarding_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID REFERENCES clients(id) ON DELETE CASCADE,
  order_id        UUID REFERENCES orders(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  product_slug    TEXT NOT NULL,
  token           TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  logo_url        TEXT,
  answers         JSONB DEFAULT '{}',
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_onboarding_token ON onboarding_submissions(token);
CREATE INDEX idx_onboarding_client ON onboarding_submissions(client_id);
CREATE INDEX idx_onboarding_status ON onboarding_submissions(status);

ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins_all" ON onboarding_submissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM elara_admins WHERE id = auth.uid() AND active = TRUE)
  );

CREATE POLICY "public_by_token" ON onboarding_submissions
  FOR SELECT USING (true);

CREATE POLICY "public_update_by_token" ON onboarding_submissions
  FOR UPDATE USING (true);
