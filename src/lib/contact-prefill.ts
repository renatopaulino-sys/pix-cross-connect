export const CONTACT_PREFILL_EVENT = "cruziapay:contact-prefill";

export type ContactPrefill = { message?: string; country?: string; vertical?: string };

export function requestContact(detail: ContactPrefill = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ContactPrefill>(CONTACT_PREFILL_EVENT, { detail }));
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
