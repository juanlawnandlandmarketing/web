create extension if not exists pgcrypto;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  domain text not null,
  website_url text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  dataforseo_location_code integer,
  dataforseo_language_code text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (domain)
);

create table if not exists public.weekly_execution (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  year integer not null check (year between 2020 and 2100),
  week_number integer not null check (week_number between 1 and 53),
  completed_seo_tasks boolean not null default false,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, year, week_number)
);

create table if not exists public.technical_health_snapshots (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  year integer not null check (year between 2020 and 2100),
  week_number integer not null check (week_number between 1 and 53),
  health_score numeric(5,2),
  verified_seo_score numeric(5,2),
  technical_seo_score numeric(5,2),
  previous_technical_seo_score numeric(5,2),
  score_change numeric(5,2),
  pages_crawled integer not null default 0,
  clean_pages integer not null default 0,
  critical_error_count integer not null default 0,
  last_crawled_at timestamptz,
  crawl_status text not null default 'pending' check (crawl_status in ('pending', 'success', 'failed', 'partial')),
  raw_audit_json jsonb,
  created_at timestamptz not null default now(),
  unique (client_id, year, week_number)
);

create table if not exists public.technical_health_issues (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references public.technical_health_snapshots(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  issue_type text not null,
  severity text not null check (severity in ('critical', 'warning', 'notice')),
  page_url text,
  details text,
  created_at timestamptz not null default now()
);

create table if not exists public.dataforseo_trend_snapshots (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  year integer not null check (year between 2020 and 2100),
  week_number integer not null check (week_number between 1 and 53),
  ranking_keywords integer not null default 0,
  top_3_keywords integer not null default 0,
  top_10_keywords integer not null default 0,
  top_100_keywords integer not null default 0,
  keyword_change integer not null default 0,
  estimated_traffic numeric(12,2),
  estimated_value numeric(12,2),
  biggest_wins jsonb not null default '[]'::jsonb,
  biggest_losses jsonb not null default '[]'::jsonb,
  raw_dataforseo_json jsonb,
  created_at timestamptz not null default now(),
  unique (client_id, year, week_number)
);

create table if not exists public.weekly_outputs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  year integer not null check (year between 2020 and 2100),
  week_number integer not null check (week_number between 1 and 53),
  blog_done boolean not null default false,
  blog_url text,
  prs_published_count integer not null default 0,
  report_sent_count integer not null default 0,
  report_notes text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, year, week_number)
);

create table if not exists public.weekly_update_runs (
  id uuid primary key default gen_random_uuid(),
  year integer not null check (year between 2020 and 2100),
  week_number integer not null check (week_number between 1 and 53),
  status text not null default 'running' check (status in ('running', 'complete', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  clients_total integer not null default 0,
  clients_completed integer not null default 0,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists clients_status_idx on public.clients(status);
create index if not exists weekly_execution_week_idx on public.weekly_execution(year, week_number);
create index if not exists technical_health_week_idx on public.technical_health_snapshots(year, week_number);
create index if not exists technical_health_issues_snapshot_idx on public.technical_health_issues(snapshot_id);
create index if not exists dataforseo_trends_week_idx on public.dataforseo_trend_snapshots(year, week_number);
create index if not exists weekly_outputs_week_idx on public.weekly_outputs(year, week_number);
create index if not exists weekly_update_runs_week_idx on public.weekly_update_runs(year, week_number, created_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at before update on public.clients
for each row execute function public.set_updated_at();

drop trigger if exists weekly_execution_set_updated_at on public.weekly_execution;
create trigger weekly_execution_set_updated_at before update on public.weekly_execution
for each row execute function public.set_updated_at();

drop trigger if exists weekly_outputs_set_updated_at on public.weekly_outputs;
create trigger weekly_outputs_set_updated_at before update on public.weekly_outputs
for each row execute function public.set_updated_at();

alter table public.clients enable row level security;
alter table public.weekly_execution enable row level security;
alter table public.technical_health_snapshots enable row level security;
alter table public.technical_health_issues enable row level security;
alter table public.dataforseo_trend_snapshots enable row level security;
alter table public.weekly_outputs enable row level security;
alter table public.weekly_update_runs enable row level security;
