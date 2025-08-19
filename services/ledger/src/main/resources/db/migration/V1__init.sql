create table if not exists tenants (
  id uuid primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key,
  tenant_id uuid not null references tenants(id),
  type_pf_pj text not null check (type_pf_pj in ('PF','PJ')),
  kyc_status text not null default 'pending',
  risk_level text not null default 'normal',
  consents jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists idx_customers_tenant on customers(tenant_id);

create table if not exists accounts_ledger (
  id uuid primary key,
  tenant_id uuid not null references tenants(id),
  customer_id uuid not null references customers(id),
  currency char(3) not null check (currency='BRL'),
  status text not null default 'active',
  created_at timestamptz not null default now()
);
create unique index if not exists uidx_ledger_customer_currency on accounts_ledger(tenant_id, customer_id, currency);

create table if not exists postings (
  id uuid primary key,
  tenant_id uuid not null references tenants(id),
  debit_account_id uuid not null references accounts_ledger(id),
  credit_account_id uuid not null references accounts_ledger(id),
  amount numeric(18,2) not null check (amount > 0),
  currency char(3) not null check (currency='BRL'),
  reference_id text not null,
  event_type text not null,
  idempotency_key text not null,
  created_at timestamptz not null default now(),
  unique (tenant_id, idempotency_key)
);
create index if not exists idx_postings_accounts on postings(tenant_id, debit_account_id, credit_account_id, created_at);

create table if not exists balances_snapshot (
  account_id uuid not null references accounts_ledger(id),
  as_of timestamptz not null,
  balance numeric(18,2) not null,
  primary key (account_id, as_of)
);

create table if not exists outbox_events (
  id uuid primary key,
  tenant_id uuid not null,
  aggregate_type text not null,
  aggregate_id text not null,
  event_type text not null,
  payload jsonb not null,
  occurred_at timestamptz not null default now(),
  published_at timestamptz null
);
create index if not exists idx_outbox_unpublished on outbox_events(tenant_id) where published_at is null;

alter table customers enable row level security;
alter table accounts_ledger enable row level security;
alter table postings enable row level security;

create schema if not exists app;
create or replace function app.current_tenant_id() returns uuid language sql stable as $$
  select nullif(current_setting('app.tenant_id', true), '')::uuid
$$;

drop policy if exists tenant_isolation_select on customers;
drop policy if exists tenant_isolation_write on customers;
create policy tenant_isolation_select on customers using (tenant_id = app.current_tenant_id());
create policy tenant_isolation_write on customers using (tenant_id = app.current_tenant_id()) with check (tenant_id = app.current_tenant_id());

drop policy if exists tenant_isolation_select on accounts_ledger;
drop policy if exists tenant_isolation_write on accounts_ledger;
create policy tenant_isolation_select on accounts_ledger using (tenant_id = app.current_tenant_id());
create policy tenant_isolation_write on accounts_ledger using (tenant_id = app.current_tenant_id()) with check (tenant_id = app.current_tenant_id());

drop policy if exists tenant_isolation_select on postings;
drop policy if exists tenant_isolation_write on postings;
create policy tenant_isolation_select on postings using (tenant_id = app.current_tenant_id());
create policy tenant_isolation_write on postings using (tenant_id = app.current_tenant_id()) with check (tenant_id = app.current_tenant_id());

