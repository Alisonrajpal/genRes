-- Supabase schema for genRes
-- Run this in your Supabase SQL editor

-- Table to store templates (optional)
create table if not exists templates (
  id text primary key,
  name text,
  description text,
  category text,
  color text,
  preview text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Table to store resumes as JSONB
create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Index for quick lookup by keys inside data (example: personalInfo.email)
create index if not exists resumes_personal_email_idx on resumes ((data->'personalInfo'->>'email'));
