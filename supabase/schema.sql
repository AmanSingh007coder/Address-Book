-- =============================================================
-- Supabase SQL Schema for Contact Hub Address Book
-- Run this in the Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- =============================================================

-- 1. Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz      DEFAULT now(),
  full_name  text             NOT NULL,
  email      text             NOT NULL,
  phone      text             DEFAULT '',
  address    text,
  category   text             DEFAULT 'Work',
  status     text             DEFAULT 'Active',
  notes      text,
  favorite   boolean          DEFAULT false,
  avatar_url text
);

-- 2. Disable Row Level Security (no auth for now)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (since we're using the anon key without auth)
CREATE POLICY "Allow all access" ON contacts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. Seed with initial contacts
INSERT INTO contacts (full_name, email, phone, address, category, status, favorite, notes) VALUES
  ('Ava Thompson',    'ava.thompson@northwind.io', '+1 (415) 555-0123', '221B Baker St, San Francisco, CA', 'Work',    'Active',   true,  'Lead designer at Northwind.'),
  ('Marcus Chen',     'marcus@chenfamily.com',      '+1 (212) 555-0144', '55 Park Ave, New York, NY',        'Family',  'Personal', true,  NULL),
  ('Priya Raman',     'priya.raman@helio.dev',      '+44 20 7946 0958',  '10 Downing Approx, London',        'Work',    'Active',   false, NULL),
  ('Diego Alvarez',   'diego@surfclub.mx',           '+52 55 1234 5678',  NULL,                               'Friends', 'Personal', false, NULL),
  ('Sofia Kowalski',  'sofia.k@studio.pl',           '+48 22 555 0199',   'ul. Marszałkowska 1, Warsaw',      'Work',    'Active',   false, NULL),
  ('Leo Tanaka',      'leo.tanaka@kitsune.jp',       '+81 3 5555 0123',   NULL,                               'Friends', 'Personal', true,  NULL),
  ('Hannah Bergstrom','hannah@bergstrom.se',          '+46 8 555 0166',    NULL,                               'Family',  'Personal', false, NULL),
  ('Jamal Wright',    'jamal.wright@orbital.co',     '+1 (646) 555-0177', '300 Lafayette St, NY',             'Work',    'Active',   false, NULL);
