-- CruziaPay Database Initialization Schema
-- Created on 2026-08-11
-- This script sets up the database architecture for the new CruziaPay ecosystem.
-- It is completely isolated and runs on the new Supabase instance.

-- 1. SCHEMAS
CREATE SCHEMA IF NOT EXISTS cbm_funnels;
CREATE SCHEMA IF NOT EXISTS gateway;
CREATE SCHEMA IF NOT EXISTS provider_catalog;

-- 2. PROVIDER CATALOG SCHEMA (Tariffs, Acquirers & Coverage)
CREATE TABLE provider_catalog.providers (
    provider_id TEXT PRIMARY KEY,
    provider_name TEXT NOT NULL,
    provider_role TEXT NOT NULL, -- e.g., 'Acquirer', 'Payment Gateway'
    coverage_summary TEXT,       -- e.g., 'Brazil, Mexico'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE provider_catalog.payin_fees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id TEXT REFERENCES provider_catalog.providers(provider_id) ON DELETE CASCADE,
    country TEXT NOT NULL,       -- e.g., 'Brazil', 'Mexico'
    currency TEXT NOT NULL,      -- e.g., 'BRL', 'MXN'
    percentage_fee NUMERIC(5,2) DEFAULT 0.00, -- e.g., 2.50 for 2.5%
    fixed_fee NUMERIC(10,2) DEFAULT 0.00,      -- e.g., 0.50 cents
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE provider_catalog.payout_fees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id TEXT REFERENCES provider_catalog.providers(provider_id) ON DELETE CASCADE,
    country TEXT NOT NULL,
    currency TEXT NOT NULL,
    percentage_fee NUMERIC(5,2) DEFAULT 0.00,
    fixed_fee NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Providers List
INSERT INTO provider_catalog.providers (provider_id, provider_name, provider_role, coverage_summary, notes) VALUES
('PROV_BAMBOO', 'Bamboo', 'Acquirer', 'Argentina, México', 'Adquirente regional para Argentina e México.'),
('PROV_CIELO', 'Cielo', 'Acquirer', 'Brasil', 'Adquirente líder em cartões no Brasil.'),
('PROV_KUSHKI', 'Kushki', 'Acquirer', 'México, Peru, Chile, Colômbia, Equador', 'Excelente cobertura andina e mexicana.'),
('PROV_MONNET', 'Monnet', 'Acquirer', 'LATAM Regional', 'Forte em transferências bancárias locais na América do Sul.'),
('PROV_PAGSEGURO', 'Pagseguro', 'Acquirer', 'Brasil e LATAM', 'Ampla aceitação de cartões locais e e-wallets.'),
('PROV_PAYSAFE', 'Paysafe', 'Acquirer', 'Argentina, Brasil, Europa', 'Adequado para transações cross-border enterprise.'),
('PROV_PAYSTRAX', 'PayStrax', 'Acquirer', 'Reino Unido, Europa', 'Adquirente internacional Visa/Mastercard.'),
('PROV_ALPS', 'ALPS', 'Payment Gateway', 'LATAM Regional', 'Integração de múltiplos meios de pagamento locais.');

-- 3. CLIENT ONBOARDING AND COMPLIANCE SCHEMA (Merchants, KYC, Compliance)
CREATE TABLE cbm_funnels.merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_master_id TEXT UNIQUE,
    legal_name TEXT,
    fantasy_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    country TEXT,
    registration_number TEXT, -- CNPJ / RFC / etc.
    tax_id TEXT,
    risk_level TEXT DEFAULT 'unknown', -- 'low', 'medium', 'high', 'unknown'
    kyc_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    compliance_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cbm_funnels.kyc_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES cbm_funnels.merchants(id) ON DELETE CASCADE,
    g2_score NUMERIC(5,2), -- Risk evaluation score
    red_flags TEXT,        -- Flags detailed description
    g4_required BOOLEAN DEFAULT FALSE,
    kyc_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cbm_funnels.compliance_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kyc_case_id UUID REFERENCES cbm_funnels.kyc_cases(id) ON DELETE CASCADE,
    compliance_status TEXT DEFAULT 'pending',
    action_plan TEXT,
    monitoring_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. GATEWAY AND SMART ROUTING SCHEMA (Connector Mappings, Rules & Routing)
CREATE TABLE gateway.connector_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id TEXT REFERENCES provider_catalog.providers(provider_id) ON DELETE CASCADE,
    connector_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE gateway.routing_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_name TEXT NOT NULL,
    priority INTEGER DEFAULT 1,
    criteria JSONB NOT NULL, -- e.g., {"country": "Brazil", "card_brand": "Visa"}
    destination_connector_id UUID REFERENCES gateway.connector_mappings(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE gateway.merchant_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES cbm_funnels.merchants(id) ON DELETE CASCADE,
    connector_id UUID REFERENCES gateway.connector_mappings(id) ON DELETE CASCADE,
    account_status TEXT DEFAULT 'active',
    credentials_json JSONB, -- Configured API keys for integration
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Initial Connectors mapping
INSERT INTO gateway.connector_mappings (provider_id, connector_name, is_active) VALUES
('PROV_CIELO', 'Cielo Brasil Gateway', true),
('PROV_KUSHKI', 'Kushki LATAM Connector', true),
('PROV_BAMBOO', 'Bamboo Mexico Gateway', true),
('PROV_MONNET', 'Monnet Payout Engine', true);
