/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** EmailJS service ID (publishable, client-side). Absent → "" (mailto-only mode). */
  readonly PUBLIC_EMAILJS_SERVICE_ID: string;
  /** EmailJS template ID (publishable, client-side). */
  readonly PUBLIC_EMAILJS_TEMPLATE_ID: string;
  /** EmailJS public key (publishable, client-side). Falsy → form renders mailto-only mode. */
  readonly PUBLIC_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
