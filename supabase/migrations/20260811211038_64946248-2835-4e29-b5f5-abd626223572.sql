CREATE TABLE IF NOT EXISTS cbm_funnels.kyc_required_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code TEXT NOT NULL,
    document_key TEXT NOT NULL,
    document_name TEXT NOT NULL,
    description TEXT,
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (country_code, document_key)
);

GRANT SELECT ON cbm_funnels.kyc_required_documents TO authenticated;
GRANT ALL ON cbm_funnels.kyc_required_documents TO service_role;

ALTER TABLE cbm_funnels.kyc_required_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Read required docs config" ON cbm_funnels.kyc_required_documents
    FOR SELECT TO authenticated USING (true);

INSERT INTO cbm_funnels.kyc_required_documents (country_code, document_key, document_name, description, is_required) VALUES
('BR', 'contrato_social', 'Contrato Social ou Estatuto Social', 'Cópia simplificada do contrato social consolidado atualizado e registrado na Junta Comercial.', true),
('BR', 'cartao_cnpj', 'Cartão CNPJ', 'Comprovante de Inscrição e de Situação Cadastral do CNPJ emitido recentemente.', true),
('BR', 'documento_socios', 'RG/CNH dos Sócios e Representantes', 'Documento de identificação com foto (RG ou CNH) de todos os sócios com participação acima de 25% e dos representantes legais.', true),
('BR', 'comprovante_endereco', 'Comprovante de Endereço da Empresa', 'Conta de consumo recente (últimos 90 dias) em nome da empresa.', true),
('MX', 'acta_constitutiva', 'Acta Constitutiva', 'Copia certificada del Acta Constitutiva de la sociedad debidamente inscrita en el Registro Público de Comercio.', true),
('MX', 'cedula_rfc', 'Cédula de Identificación Fiscal (RFC)', 'Constancia de Situación Fiscal emitida por el SAT recientemente.', true),
('MX', 'identificacion_representante', 'Identificación Oficial del Representante', 'Copia del INE/IFE vigente o Pasaporte del representante legal.', true),
('MX', 'comprobante_domicilio', 'Comprobante de Domicilio Comercial', 'Recibo de luz, agua o estado de cuenta bancario a nombre de la empresa.', true),
('CO', 'camara_comercio', 'Certificado de Cámara de Comercio', 'Certificado de Existencia y Representación Legal de la Cámara de Comercio (no mayor a 30 días).', true),
('CO', 'rut_colombia', 'Registro Único Tributario (RUT)', 'Copia del RUT actualizado emitido por la DIAN.', true),
('CO', 'documento_representante', 'Cédula de Ciudadanía del Representante', 'Cédula de ciudadanía o pasaporte del representante legal.', true),
('CO', 'comprobante_bancario', 'Certificación Bancaria', 'Certificado de la cuenta bancaria de la empresa emitido por el banco (no mayor a 90 dias).', true)
ON CONFLICT (country_code, document_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS cbm_funnels.merchant_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES cbm_funnels.merchants(id) ON DELETE CASCADE,
    document_key TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON cbm_funnels.merchant_documents TO authenticated;
GRANT ALL ON cbm_funnels.merchant_documents TO service_role;

ALTER TABLE cbm_funnels.merchant_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchants own docs select" ON cbm_funnels.merchant_documents
    FOR SELECT TO authenticated USING (
        exists (select 1 from cbm_funnels.merchants m where m.id = merchant_id and m.owner_user_id = auth.uid())
    );

CREATE POLICY "merchants own docs insert" ON cbm_funnels.merchant_documents
    FOR INSERT TO authenticated WITH CHECK (
        exists (select 1 from cbm_funnels.merchants m where m.id = merchant_id and m.owner_user_id = auth.uid())
    );

CREATE POLICY "merchants own docs update" ON cbm_funnels.merchant_documents
    FOR UPDATE TO authenticated USING (
        exists (select 1 from cbm_funnels.merchants m where m.id = merchant_id and m.owner_user_id = auth.uid())
    );

CREATE POLICY "admins all docs access" ON cbm_funnels.merchant_documents
    FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_merchant_documents_updated_at BEFORE UPDATE ON cbm_funnels.merchant_documents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();