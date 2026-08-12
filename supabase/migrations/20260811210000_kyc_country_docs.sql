-- 1. Create Required Documents Configuration Table
CREATE TABLE IF NOT EXISTS cbm_funnels.kyc_required_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code TEXT NOT NULL,          -- e.g., 'BR', 'MX', 'CO', 'AR', 'CL', 'PE'
    document_key TEXT NOT NULL,          -- e.g., 'articles_of_association', 'tax_certificate'
    document_name TEXT NOT NULL,         -- User-friendly name in PT
    description TEXT,                    -- Explanation of what to upload
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (country_code, document_key)
);

-- Enable RLS
ALTER TABLE cbm_funnels.kyc_required_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read required docs config" ON cbm_funnels.kyc_required_documents
    FOR SELECT TO authenticated USING (true);

-- 2. Populate standard KYC requirements for LATAM countries
INSERT INTO cbm_funnels.kyc_required_documents (country_code, document_key, document_name, description, is_required) VALUES
-- BRASIL (BR)
('BR', 'contrato_social', 'Contrato Social ou Estatuto Social', 'Cópia simplificada do contrato social consolidado atualizado e registrado na Junta Comercial.', true),
('BR', 'cartao_cnpj', 'Cartão CNPJ', 'Comprovante de Inscrição e de Situação Cadastral do CNPJ emitido recentemente.', true),
('BR', 'documento_socios', 'RG/CNH dos Sócios e Representantes', 'Documento de identificação com foto (RG ou CNH) de todos os sócios com participação acima de 25% e dos representantes legais.', true),
('BR', 'comprovante_endereco', 'Comprovante de Endereço da Empresa', 'Conta de consumo (água, luz, telefone) recente (últimos 90 dias) em nome da empresa.', true),

-- MÉXICO (MX)
('MX', 'acta_constitutiva', 'Acta Constitutiva', 'Copia certificada del Acta Constitutiva de la sociedad debidamente inscrita en el Registro Público de Comercio.', true),
('MX', 'cedula_rfc', 'Cédula de Identificación Fiscal (RFC)', 'Constancia de Situación Fiscal emitida por el SAT recientemente (no mayor a 3 meses).', true),
('MX', 'identificacion_representante', 'Identificación Oficial del Representante', 'Copia del INE/IFE vigente o Pasaporte del representante legal de la empresa.', true),
('MX', 'comprobante_domicilio', 'Comprobante de Domicilio Comercial', 'Recibo de luz, agua, teléfono o estado de cuenta bancario a nombre de la empresa.', true),

-- COLÔMBIA (CO)
('CO', 'camara_comercio', 'Certificado de Cámara de Comercio', 'Certificado de Existencia y Representación Legal de la Cámara de Comercio con expedición no mayor a 30 días.', true),
('CO', 'rut_colombia', 'Registro Único Tributario (RUT)', 'Copia del RUT actualizado emitido por la DIAN.', true),
('CO', 'documento_representante', 'Cédula de Ciudadanía del Representante', 'Cédula de ciudadanía o pasaporte del representante legal firmado.', true),
('CO', 'comprobante_bancario', 'Certificación Bancaria', 'Certificado de la cuenta bancaria de la empresa emitido por el banco (no mayor a 90 días).', true),

-- ARGENTINA (AR)
('AR', 'estatuto_social', 'Estatuto Social / Contrato de Constitución', 'Estatuto de la sociedad con constancia de inscripción en el Registro Público correspondiente.', true),
('AR', 'constancia_cuit', 'Constancia de Inscripción AFIP (CUIT)', 'Constancia de CUIT activa de la empresa.', true),
('AR', 'dni_representante', 'DNI del Representante Legal', 'Documento Nacional de Identidad (frente y dorso) o Pasaporte del representante legal.', true),
('AR', 'acta_autoridades', 'Acta de Designación de Autoridades', 'Acta de Asamblea o Directorio vigente donde se designan las autoridades y representantes legales.', true),

-- CHILE (CL)
('CL', 'escritura_constitucion', 'Escritura Pública de Constitución', 'Escritura de constitución de la sociedad y sus modificaciones vigentes.', true),
('CL', 'rut_chile', 'E-RUT (Rol Único Tributario)', 'Cédula RUT electrónica emitida por el Servicio de Impuestos Internos (SII).', true),
('CL', 'cedula_representante', 'Cédula de Identidad del Representante', 'Cédula de identidad vigente (frente y dorso) del representante legal.', true),
('CL', 'certificado_vigencia', 'Certificado de Vigencia de la Sociedad', 'Certificado emitido por el Conservador de Bienes Raíces respectivo (no mayor a 60 días).', true),

-- PERU (PE)
('PE', 'ficha_ruc', 'Ficha RUC', 'Ficha RUC actualizada de la Sunat que demuestre estado Activo y Habido.', true),
('PE', 'vigencia_poder', 'Vigencia de Poder / Partida Registral', 'Certificado de Vigencia de Poder emitido por la Sunarp (no mayor a 30 días).', true),
('PE', 'dni_representante_pe', 'DNI o Carné de Extranjería', 'Documento de identidad nacional (DNI) o Carné de Extranjería del apoderado legal.', true),
('PE', 'comprobante_direccion', 'Recibo de Servicios / Domicilio', 'Recibo de luz, agua o internet a nombre de la empresa para validar domicilio.', true)
ON CONFLICT (country_code, document_key) DO NOTHING;

-- 3. Create Merchant Uploaded Documents Table
CREATE TABLE IF NOT EXISTS cbm_funnels.merchant_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES cbm_funnels.merchants(id) ON DELETE CASCADE,
    document_key TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE cbm_funnels.merchant_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
create policy "merchants own docs select" on cbm_funnels.merchant_documents
    for select to authenticated using (
        exists (select 1 from cbm_funnels.merchants m where m.id = merchant_id and m.owner_user_id = auth.uid())
    );

create policy "merchants own docs insert" on cbm_funnels.merchant_documents
    for insert to authenticated with check (
        exists (select 1 from cbm_funnels.merchants m where m.id = merchant_id and m.owner_user_id = auth.uid())
    );

create policy "merchants own docs update" on cbm_funnels.merchant_documents
    for update to authenticated using (
        exists (select 1 from cbm_funnels.merchants m where m.id = merchant_id and m.owner_user_id = auth.uid())
    );

create policy "admins all docs access" on cbm_funnels.merchant_documents
    for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
