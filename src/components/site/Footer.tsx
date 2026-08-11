import { Link } from "@tanstack/react-router";
import mark from "@/assets/cruziapay-mark.png.asset.json";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-paper py-16">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <img src={mark.url} alt="" aria-hidden="true" className="h-9 w-auto" width={57} height={36} />
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">CruziaPay</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slateink">{t.footer.description}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <FooterCol title={t.nav.solutions} links={[{ href: "/#solucoes", label: t.nav.solutions }, { href: "/#como-funciona", label: t.nav.how }]} />
          <FooterCol title={t.nav.methods} links={[{ href: "/#metodos", label: t.nav.methods }, { href: "/#contato", label: t.nav.contact }]} />
          <div>
            <p className="label-mono text-slateink">{t.footer.legal}</p>
            <ul className="mt-4 space-y-2">
              <li><Link to="/termos" className="text-sm text-slateink hover:text-ink">{t.footer.terms}</Link></li>
              <li><Link to="/privacidade" className="text-sm text-slateink hover:text-ink">{t.footer.privacy}</Link></li>
              <li><Link to="/cookies" className="text-sm text-slateink hover:text-ink">{t.footer.cookies}</Link></li>
              <li><a href="/#desenvolvedores" className="text-sm text-slateink hover:text-ink">{t.nav.developers}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-border pt-6">
        <p className="text-xs text-slateink">© {year} CruziaPay. {t.footer.rights}</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="label-mono text-slateink">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-sm text-slateink hover:text-ink">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
