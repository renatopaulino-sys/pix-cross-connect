import { company } from "@/data/company";

/** Shared head() builder: title, description, OG/Twitter, canonical and hreflang (same URL serves pt/en via toggle). */
export function seo(path: string, title: string, description: string) {
  const url = `${company.siteUrl}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "pt-BR", href: url },
      { rel: "alternate", hrefLang: "en", href: url },
      { rel: "alternate", hrefLang: "x-default", href: url },
    ],
  };
}
