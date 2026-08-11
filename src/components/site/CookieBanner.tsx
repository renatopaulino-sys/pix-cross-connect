import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const KEY = "cruziapay-cookie-consent";

export function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const decide = (value: "all" | "essential") => {
    window.localStorage.setItem(KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-paper/95 backdrop-blur-md">
      <div className="container-site flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slateink">
          {t.cookies.text}{" "}
          <Link to="/cookies" className="text-cobalt underline underline-offset-2">
            {t.cookies.link}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("essential")}
            className="rounded-lg border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand"
          >
            {t.cookies.reject}
          </button>
          <button
            type="button"
            onClick={() => decide("all")}
            className="rounded-lg border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
