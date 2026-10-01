import { Link } from "@tanstack/react-router";
import mark from "@/assets/cruziapay-mark-transparent.png";
import { useI18n } from "@/lib/i18n";
import { company } from "@/data/company";

export function Footer() {
  const { t, locale } = useI18n();
  const f = t.footer;
  const year = new Date().getFullYear();
  const link = "text-sm text-footer-muted hover:text-footer-ink";

  return (
    <footer className="bg-background pb-16 text-slateink">
      <div className="footer-crest pt-40 pb-16 text-footer-ink">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <img src={mark} alt="" aria-hidden="true" className="h-11 w-12 object-contain" width={48} height={44} />
              <span className="font-display text-xl font-extrabold tracking-tight text-footer-ink">CruziaPay</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-footer-muted">{f.description}</p>
            <ul className="mt-6 space-y-1 text-sm text-footer-muted">
              <li>{f.commercial}: <a className="hover:text-footer-ink" href={`mailto:${company.emails.commercial}`}>{company.emails.commercial}</a></li>
              <li>{f.compliance}: <a className="hover:text-footer-ink" href={`mailto:${company.emails.compliance}`}>{company.emails.compliance}</a></li>
              <li>{f.privacyContact}: <a className="hover:text-footer-ink" href={`mailto:${company.emails.privacy}`}>{company.emails.privacy}</a></li>
              <li>{f.hours}: {company.hours[locale]}</li>
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="label-mono text-footer-muted">{f.product}</p>
              <ul className="mt-4 space-y-2">
                <li><a href="/#solucoes" className={link}>{t.nav.solutions}</a></li>
                <li><a href="/#metodos" className={link}>{t.nav.methods}</a></li>
                <li><a href="/#precos" className={link}>{t.nav.pricing}</a></li>
                <li><a href="/#como-funciona" className={link}>{t.nav.how}</a></li>
                <li><a href="/#desenvolvedores" className={link}>{t.nav.developers}</a></li>
              </ul>
            </div>
            <div>
              <p className="label-mono text-footer-muted">{f.company}</p>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className={link}>{f.about}</Link></li>
                <li><Link to="/igaming" className={link}>{f.igaming}</Link></li>
                <li><Link to="/insights" className={link}>{f.insights}</Link></li>
                <li><a href="/#contato" className={link}>{t.nav.contact}</a></li>
              </ul>
            </div>
            <div>
              <p className="label-mono text-footer-muted">{f.legal}</p>
              <ul className="mt-4 space-y-2">
                <li><Link to="/termos" className={link}>{f.terms}</Link></li>
                <li><Link to="/privacidade" className={link}>{f.privacy}</Link></li>
                <li><Link to="/cookies" className={link}>{f.cookies}</Link></li>
                <li><Link to="/refund-chargeback" className={link}>{f.refund}</Link></li>
                <li><Link to="/aml-kyc" className={link}>{f.aml}</Link></li>
                <li><Link to="/prohibited-businesses" className={link}>{f.prohibited}</Link></li>
                <li><Link to="/complaints" className={link}>{f.complaints}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site mt-12 space-y-2 border-t border-border pt-6 text-xs text-slateink">
        <p>
          {f.brandLine} {company.legalName}, CNPJ {company.cnpj}, {locale === "pt" ? company.addressPt : company.address}.
        </p>
        <p>© {year} CruziaPay. {f.rights}</p>
      </div>
    </footer>
  );
}
