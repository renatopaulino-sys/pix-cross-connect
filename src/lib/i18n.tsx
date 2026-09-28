import { createContext, useContext, useEffect, useState, type ReactNode, type Context } from "react";
import { content, type Locale } from "@/data/content";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof content)["pt"];
};

// Keep a single context instance across HMR reloads so provider/consumers never diverge.
const g = globalThis as typeof globalThis & { __cruziaI18nCtx?: React.Context<Ctx | null> };
const I18nContext = g.__cruziaI18nCtx ?? (g.__cruziaI18nCtx = createContext<Ctx | null>(null));

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("cruziapay-locale");
    if (saved === "en" || saved === "pt") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("cruziapay-locale", l);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: content[locale] as (typeof content)["pt"] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
