CREATE TABLE diagnostic_leads (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  scores           JSONB NOT NULL,
  recommended_services TEXT[],
  answers          JSONB,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE diagnostic_leads ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; anon can only insert (to save from browser)
CREATE POLICY "service_all" ON diagnostic_leads USING (true) WITH CHECK (true);
CREATE POLICY "anon_insert" ON diagnostic_leads FOR INSERT TO anon WITH CHECK (true);
