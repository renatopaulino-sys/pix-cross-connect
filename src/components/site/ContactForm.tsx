import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_PREFILL_EVENT, type ContactPrefill } from "@/lib/contact-prefill";
import { supabase } from "@/integrations/supabase/client";

type Values = {
  name: string; company: string; email: string; phone: string;
  country: string; vertical: string; volume: string; message: string; consent: boolean;
};

const empty: Values = {
  name: "", company: "", email: "", phone: "",
  country: "", vertical: "", volume: "", message: "", consent: false,
};

const field =
  "w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-slateink/60 focus-visible:border-cobalt";

const countryNames: { pt: string; en: string }[] = [
  { pt: "Brasil", en: "Brazil" },
  { pt: "México", en: "Mexico" },
  { pt: "Colômbia", en: "Colombia" },
  { pt: "Peru", en: "Peru" },
  { pt: "Argentina", en: "Argentina" },
  { pt: "Chile", en: "Chile" },
  { pt: "Outro país", en: "Other country" },
];

export function ContactSection() {
  const { t, locale } = useI18n();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values | "submit", string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<ContactPrefill>).detail ?? {};
      setDone(false);
      setValues((v) => ({
        ...v,
        country: detail.country ?? v.country,
        vertical: detail.vertical ?? v.vertical,
        message: detail.message ?? v.message,
      }));
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 2) e.name = t.contact.errors.name;
    if (values.company.trim().length < 2) e.company = t.contact.errors.company;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = t.contact.errors.email;
    if (!/^\+?[0-9()\s-]{8,20}$/.test(values.phone.trim())) e.phone = t.contact.errors.phone;
    if (values.country.trim().length < 2) e.country = t.contact.errors.country;
    if (!values.vertical) e.vertical = t.contact.errors.vertical;
    if (!values.volume) e.volume = t.contact.errors.volume;
    if (!values.consent) e.consent = t.contact.errors.consent;
    return e;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSending(true);

    const payload = {
      timestamp: new Date().toISOString(),
      name: values.name.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      country: values.country.trim(),
      vertical: values.vertical,
      volume: values.volume,
      message: values.message.trim() || null,
      consent: values.consent,
      locale,
    };

    // 1️⃣ Save to Supabase (Database / Back-office)
    const { error: dbError } = await supabase.from("leads").insert({
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      vertical: payload.vertical,
      monthly_volume: payload.volume,
      message: payload.message,
      consent: payload.consent,
      locale: payload.locale,
    });

    // 2️⃣ Forward to Google Apps Script (Google Sheets + Email Notification)
    const webhookUrl =
      import.meta.env["VITE_GOOGLE_SHEET_WEBHOOK"] ||
      "https://script.google.com/macros/s/AKfycbz_CFEcshUq_lrBYRoYwCcIGf1ZRcmH2h77uybb8u7z1k7yw-ExEUA3JHKjETd0LUSmfA/exec";

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Error sending lead to webhook:", err);
      }
    }

    setSending(false);

    if (dbError) {
      console.error("Supabase error:", dbError);
      setErrors({ submit: t.contact.errors.submit });
      return;
    }

    setDone(true);
    setValues(empty);
  };

  return (
    <section id="contato" className="border-t border-border bg-sand py-24 lg:py-32">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        <div className="max-w-md">
          <p className="label-mono text-slateink">{t.contact.label}</p>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{t.contact.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slateink">{t.contact.intro}</p>
        </div>

        {done ? (
          <div className="flex max-w-2xl items-start gap-4 rounded-lg border border-signal/50 bg-signal/10 p-8">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.6} />
            <div>
              <h3 className="text-lg font-semibold text-ink">{t.contact.successTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slateink">{t.contact.successText}</p>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="max-w-2xl rounded-lg border border-border bg-paper p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label={t.contact.fields.name} error={errors.name}>
                <input id="name" className={field} value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
              </Field>
              <Field id="company" label={t.contact.fields.company} error={errors.company}>
                <input id="company" className={field} value={values.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
              </Field>
              <Field id="email" label={t.contact.fields.email} error={errors.email}>
                <input id="email" type="email" className={field} value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              </Field>
              <Field id="phone" label={t.contact.fields.phone} error={errors.phone}>
                <input id="phone" className={field} placeholder="+55 11 90000-0000" value={values.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
              </Field>
              <Field id="country" label={t.contact.fields.country} error={errors.country}>
                <select id="country" className={field} value={values.country} onChange={(e) => set("country", e.target.value)}>
                  <option value="">{t.contact.fields.select}</option>
                  {countryNames.map((n) => (
                    <option key={n.en} value={n[locale]}>{n[locale]}</option>
                  ))}
                </select>
              </Field>
              <Field id="vertical" label={t.contact.fields.vertical} error={errors.vertical}>
                <select id="vertical" className={field} value={values.vertical} onChange={(e) => set("vertical", e.target.value)}>
                  <option value="">{t.contact.fields.select}</option>
                  {t.contact.verticals.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field id="volume" label={t.contact.fields.volume} error={errors.volume}>
                  <select id="volume" className={field} value={values.volume} onChange={(e) => set("volume", e.target.value)}>
                    <option value="">{t.contact.fields.select}</option>
                    {t.contact.volumes.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="message" label={t.contact.fields.message}>
                  <textarea id="message" rows={4} maxLength={1000} className={field} value={values.message} onChange={(e) => set("message", e.target.value)} />
                </Field>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="consent" className="flex items-start gap-3 text-sm leading-relaxed text-slateink">
                <input
                  id="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded-lg border-border accent-cobalt"
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                />
                <span>
                  {t.contact.consent}{" "}
                  <Link to="/privacidade" className="text-cobalt underline underline-offset-2">
                    {t.contact.consentLink}
                  </Link>
                  .
                </span>
              </label>
              {errors.consent ? (
                <p id="consent-error" className="mt-2 text-xs text-destructive">{errors.consent}</p>
              ) : null}
            </div>

            {errors.submit ? <p className="mt-4 text-sm text-destructive">{errors.submit}</p> : null}

            <button
              type="submit"
              disabled={sending}
              className="mt-6 rounded-lg bg-cobalt px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {sending ? t.contact.sending : t.contact.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  id, label, error, children,
}: {
  id: string; label: string; error?: string | undefined; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
