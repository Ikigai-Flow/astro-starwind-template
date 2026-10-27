/**
 * Per-client site settings. Update this file first when starting a new site.
 * Everything in the layout (title, meta tags, nav, footer) reads from here.
 */
export const siteConfig = {
  name: "Client Name",
  title: "Client Name | Tagline",
  description: "Short description of the client's business, used for meta and social tags.",
  locale: "en_US",
  lang: "en",
  /** Path under /public for Open Graph/Twitter cards (1200x630 PNG/JPG), e.g. "/og-image.png". Leave empty to omit. */
  ogImage: "",
  contact: {
    email: "hello@example.com",
    phone: "",
    address: "",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ],
  social: [] as { label: string; href: string }[],
};

export type SiteConfig = typeof siteConfig;
