CREATE SCHEMA IF NOT EXISTS cbm_funnels;
CREATE SCHEMA IF NOT EXISTS gateway;
CREATE SCHEMA IF NOT EXISTS provider_catalog;

CREATE TABLE provider_catalog.providers (
    provider_id TEXT PRIMARY KEY,
    provider_name TEXT NOT NULL,
    provider_role TEXT NOT NULL,
    coverage_summary TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE provider_catalog.payin_fees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id TEXT REFERENCES provider_catalog.providers(provider_id) ON DELETE CASCADE,
    country TEXT NOT NULL,
    currency TEXT NOT NULL,
    percentage_fee NUMERIC(5,2) DEFAULT 0.00,
    fixed_fee NUMERIC(10,2) DEFAULT 0.00,
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

INSERT INTO provider_catalog.providers (provider_id, provider_name, provider_role, coverage_summary, notes) VALUES
('PROV_BAMBOO', 'Bamboo', 'Acquirer', 'Argentina, México', 'Adquirente regional para Argentina e México.'),
('PROV_CIELO', 'Cielo', 'Acquirer', 'Brasil', 'Adquirente líder em cartões no Brasil.'),
('PROV_KUSHKI', 'Kushki', 'Acquirer', 'México, Peru, Chile, Colômbia, Equador', 'Excelente cobertura andina e mexicana.'),
('PROV_MONNET', 'Monnet', 'Acquirer', 'LATAM Regional', 'Forte em transferências bancárias locais na América do Sul.'),
('PROV_PAGSEGURO', 'Pagseguro', 'Acquirer', 'Brasil e LATAM', 'Ampla aceitação de cartões locais e e-wallets.'),
('PROV_PAYSAFE', 'Paysafe', 'Acquirer', 'Argentina, Brasil, Europa', 'Adequado para transações cross-border enterprise.'),
('PROV_PAYSTRAX', 'PayStrax', 'Acquirer', 'Reino Unido, Europa', 'Adquirente internacional Visa/Mastercard.'),
('PROV_ALPS', 'ALPS', 'Payment Gateway', 'LATAM Regional', 'Integração de múltiplos meios de pagamento locais.')
ON CONFLICT (provider_id) DO NOTHING;

CREATE TABLE cbm_funnels.merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_master_id TEXT UNIQUE,
    legal_name TEXT,
    fantasy_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    country TEXT,
    registration_number TEXT,
    tax_id TEXT,
    risk_level TEXT DEFAULT 'unknown',
    kyc_status TEXT DEFAULT 'pending',
    compliance_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cbm_funnels.kyc_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES cbm_funnels.merchants(id) ON DELETE CASCADE,
    g2_score NUMERIC(5,2),
    red_flags TEXT,
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
    criteria JSONB NOT NULL,
    destination_connector_id UUID REFERENCES gateway.connector_mappings(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE gateway.merchant_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES cbm_funnels.merchants(id) ON DELETE CASCADE,
    connector_id UUID REFERENCES gateway.connector_mappings(id) ON DELETE CASCADE,
    account_status TEXT DEFAULT 'active',
    credentials_json JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO gateway.connector_mappings (provider_id, connector_name, is_active) VALUES
('PROV_CIELO', 'Cielo Brasil Gateway', true),
('PROV_KUSHKI', 'Kushki LATAM Connector', true),
('PROV_BAMBOO', 'Bamboo Mexico Gateway', true),
('PROV_MONNET', 'Monnet Payout Engine', true);

ALTER TABLE provider_catalog.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_catalog.payin_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_catalog.payout_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE cbm_funnels.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE cbm_funnels.kyc_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE cbm_funnels.compliance_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE gateway.connector_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gateway.routing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE gateway.merchant_accounts ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA provider_catalog, cbm_funnels, gateway TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA provider_catalog TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA cbm_funnels TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA gateway TO service_role;