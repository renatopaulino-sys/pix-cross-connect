
-- roles
create type public.app_role as enum ('admin','merchant');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users read own roles" on public.user_roles
for select to authenticated using (user_id = auth.uid());
create policy "Admins read all roles" on public.user_roles
for select to authenticated using (public.has_role(auth.uid(),'admin'));

create or replace function public.handle_new_user_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles) then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'merchant');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_role
after insert on auth.users
for each row execute function public.handle_new_user_role();

-- merchant ownership
alter table cbm_funnels.merchants add column if not exists owner_user_id uuid;
create index if not exists merchants_owner_idx on cbm_funnels.merchants(owner_user_id);

-- transactions
create table gateway.transactions (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid references cbm_funnels.merchants(id) on delete cascade,
  amount numeric(14,2) not null,
  currency text not null default 'BRL',
  method text not null default 'pix',
  status text not null default 'settled',
  connector_id uuid references gateway.connector_mappings(id),
  created_at timestamptz not null default now()
);
grant all on gateway.transactions to service_role;
alter table gateway.transactions enable row level security;

create or replace function public.owns_merchant(_merchant_id uuid)
returns boolean language sql stable security definer set search_path = public, cbm_funnels as $$
  select exists (select 1 from cbm_funnels.merchants m where m.id = _merchant_id and m.owner_user_id = auth.uid())
$$;

-- demo transactions on merchant creation
create or replace function public.seed_demo_transactions()
returns trigger language plpgsql security definer set search_path = public, gateway as $$
declare i int;
begin
  for i in 1..12 loop
    insert into gateway.transactions (merchant_id, amount, currency, method, status, created_at)
    values (
      new.id,
      round((random()*9000 + 150)::numeric, 2),
      'BRL',
      (array['pix','pix','pix','card','boleto'])[floor(random()*5+1)],
      (array['settled','settled','settled','pending','failed'])[floor(random()*5+1)],
      now() - (i || ' days')::interval
    );
  end loop;
  return new;
end;
$$;

create trigger seed_demo_transactions_on_merchant
after insert on cbm_funnels.merchants
for each row execute function public.seed_demo_transactions();

-- RLS policies
create policy "merchants own read" on cbm_funnels.merchants
for select to authenticated using (owner_user_id = auth.uid());
create policy "merchants own insert" on cbm_funnels.merchants
for insert to authenticated with check (owner_user_id = auth.uid());
create policy "merchants own update" on cbm_funnels.merchants
for update to authenticated using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
create policy "merchants admin all" on cbm_funnels.merchants
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "kyc own read" on cbm_funnels.kyc_cases
for select to authenticated using (public.owns_merchant(merchant_id));
create policy "kyc own insert" on cbm_funnels.kyc_cases
for insert to authenticated with check (public.owns_merchant(merchant_id));
create policy "kyc admin all" on cbm_funnels.kyc_cases
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "compliance own read" on cbm_funnels.compliance_cases
for select to authenticated using (
  exists (select 1 from cbm_funnels.kyc_cases k where k.id = kyc_case_id and public.owns_merchant(k.merchant_id))
);
create policy "compliance admin all" on cbm_funnels.compliance_cases
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "transactions own read" on gateway.transactions
for select to authenticated using (public.owns_merchant(merchant_id));
create policy "transactions admin all" on gateway.transactions
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "accounts own read" on gateway.merchant_accounts
for select to authenticated using (public.owns_merchant(merchant_id));
create policy "accounts admin all" on gateway.merchant_accounts
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "connectors read" on gateway.connector_mappings
for select to authenticated using (true);
create policy "connectors admin all" on gateway.connector_mappings
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "routing read" on gateway.routing_rules
for select to authenticated using (true);
create policy "routing admin all" on gateway.routing_rules
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "providers read" on provider_catalog.providers
for select to authenticated using (true);
create policy "providers admin all" on provider_catalog.providers
for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
