import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import mark from "@/assets/cruziapay-mark.png.asset.json";
import { useI18n } from "@/lib/i18n";
import { PixCheckoutModal } from "./PixCheckoutModal";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPixModal, setOpenPixModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#solucoes", label: t.nav.solutions },
    { href: "/#metodos", label: t.nav.methods },
    { href: "/#como-funciona", label: t.nav.how },
    { href: "/#desenvolvedores", label: t.nav.developers },
    { href: "/#contato", label: t.nav.contact },
  ];

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 border-b bg-paper/80 backdrop-blur-md transition-shadow " +
        (scrolled
          ? "border-border shadow-[0_1px_20px_-8px_oklch(0.244_0.049_250/0.35)]"
          : "border-transparent")
      }
    >
      <div className="container-site grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="CruziaPay">
          <img src={mark.url} alt="" aria-hidden="true" className="h-8 w-auto shrink-0" width={51} height={32} />
          <span className="font-display truncate text-lg font-extrabold tracking-tight text-ink">CruziaPay</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t.nav.solutions}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slateink transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => setOpenPixModal(true)}
            className="rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 cursor-pointer"
          >
            ⚡ Testar Pix
          </button>
          <LocaleToggle locale={locale} setLocale={setLocale} />
          <Link
            to="/auth"
            className="rounded-lg border border-cobalt px-4 py-2 text-sm font-medium text-cobalt transition-colors hover:bg-cobalt hover:text-primary-foreground"
          >
            {t.nav.login}
          </Link>
          <a
            href="/#contato"
            className="rounded-lg bg-cobalt px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.nav.cta}
          </a>
        </div>

        <PixCheckoutModal open={openPixModal} onOpenChange={setOpenPixModal} />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="justify-self-end rounded-lg border border-border p-2 text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-paper lg:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-1 py-2 text-sm text-slateink hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <LocaleToggle locale={locale} setLocale={setLocale} />
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-cobalt px-4 py-2 text-center text-sm font-medium text-cobalt transition-colors hover:bg-cobalt hover:text-primary-foreground"
              >
                {t.nav.login}
              </Link>
              <a
                href="/#contato"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-cobalt px-4 py-2 text-center text-sm font-medium text-primary-foreground"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function LocaleToggle({
  locale,
  setLocale,
}: {
  locale: "pt" | "en";
  setLocale: (l: "pt" | "en") => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-border p-0.5" role="group" aria-label="Language">
      {(["pt", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={
            "label-mono rounded-lg px-2 py-1 transition-colors " +
            (locale === l ? "bg-ink text-paper" : "text-slateink hover:text-ink")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
