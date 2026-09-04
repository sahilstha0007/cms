export type BlockType =
  | "hero"
  | "features"
  | "testimonials"
  | "faq"
  | "cta"
  | "contact"
  | "footer";

export type Block = {
  id: string;
  type: BlockType;
  props: Record<string, string>;
};

export type SiteTheme = {
  primary: string; // hex
  radius: "none" | "md" | "full";
  font: "sans" | "serif";
};

export type Site = {
  id: string;
  name: string;
  slug: string;
  templateId: string;
  published: boolean;
  theme: SiteTheme;
  blocks: Block[];
};

export type Template = {
  id: string;
  name: string;
  description: string;
  theme: SiteTheme;
  blocks: Omit<Block, "id">[];
};

const STORAGE_KEY = "orion_cms_sites_v1";

export const THEMES: { name: string; value: string }[] = [
  { name: "Lime", value: "#84cc16" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Slate", value: "#475569" },
];

export const TEMPLATES: Template[] = [
  {
    id: "blank",
    name: "Blank canvas",
    description: "Start from scratch with just a hero and footer.",
    theme: { primary: "#84cc16", radius: "md", font: "sans" },
    blocks: [
      { type: "hero", props: { badge: "", title: "Your headline here", subtitle: "Tell visitors what you do in one clear sentence.", primaryCta: "Get started", secondaryCta: "Learn more" } },
      { type: "footer", props: { text: "© 2026 Your Company" } },
    ],
  },
  {
    id: "saas",
    name: "SaaS launch",
    description: "Hero, features, testimonials and CTA — ready to ship.",
    theme: { primary: "#0ea5e9", radius: "md", font: "sans" },
    blocks: [
      { type: "hero", props: { badge: "New", title: "Software that works while you sleep", subtitle: "Automate the busywork and focus on what matters.", primaryCta: "Start free trial", secondaryCta: "Book a demo" } },
      { type: "features", props: { title: "Why teams switch to us", items: "Fast setup|Be running in minutes, not weeks.\nTeam workspace|Everyone sees the same truth.\nFair pricing|Start free, upgrade when you grow." } },
      { type: "testimonials", props: { title: "Loved by modern teams", items: "Switching was the best decision this year.|Dana K., Ops Lead\nSetup took 10 minutes, not 10 days.|Marco P., Founder" } },
      { type: "cta", props: { title: "Ready to try it?", subtitle: "Free for 14 days. No credit card required.", button: "Get started" } },
      { type: "footer", props: { text: "© 2026 Acme Inc." } },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "A personal site with work highlights and contact.",
    theme: { primary: "#8b5cf6", radius: "full", font: "serif" },
    blocks: [
      { type: "hero", props: { badge: "Available for work", title: "Designer & maker of nice things", subtitle: "I help brands look sharp and feel human.", primaryCta: "See my work", secondaryCta: "Say hello" } },
      { type: "features", props: { title: "Selected work", items: "Aurora Brand|Identity for a climate startup.\nNimbus App|Product design end to end.\nAtlas Site|Marketing site & design system." } },
      { type: "contact", props: { title: "Let's work together", email: "hello@example.com" } },
      { type: "footer", props: { text: "© 2026 Studio" } },
    ],
  },
  {
    id: "agency",
    name: "Agency",
    description: "Services, social proof and a strong closing pitch.",
    theme: { primary: "#f59e0b", radius: "none", font: "sans" },
    blocks: [
      { type: "hero", props: { badge: "", title: "We build brands that move markets", subtitle: "Strategy, design and web for ambitious companies.", primaryCta: "Start a project", secondaryCta: "Our services" } },
      { type: "features", props: { title: "What we do", items: "Brand strategy|Positioning that sticks.\nWeb design|Sites that convert visitors.\nDevelopment|Fast, accessible, scalable." } },
      { type: "faq", props: { title: "Common questions", items: "How long does a project take?|Most projects ship in 4–8 weeks.\nWhat does it cost?|Engagements start at $5k.\nDo you work with startups?|Yes — about half our clients are startups." } },
      { type: "cta", props: { title: "Have a project in mind?", subtitle: "Tell us about it — we reply within a day.", button: "Contact us" } },
      { type: "footer", props: { text: "© 2026 Agency" } },
    ],
  },
];

export function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "site"
  );
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function readAll(): Site[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Site[];
  } catch {
    return [];
  }
}

function writeAll(sites: Site[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
}

export function listSites(): Site[] {
  const sites = readAll();
  if (sites.length === 0 && typeof window !== "undefined") {
    const seeded = createSiteFromTemplate("My first site", "saas");
    return [seeded];
  }
  return sites;
}

export function getSite(id: string): Site | null {
  return readAll().find((s) => s.id === id) ?? null;
}

export function getSiteBySlug(slug: string): Site | null {
  return readAll().find((s) => s.slug === slug && s.published) ?? null;
}

export function createSiteFromTemplate(name: string, templateId: string): Site {
  const template =
    TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0];
  const sites = readAll();
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let n = 2;
  while (sites.some((s) => s.slug === slug)) slug = `${baseSlug}-${n++}`;
  const site: Site = {
    id: uid(),
    name,
    slug,
    templateId: template.id,
    published: false,
    theme: template.theme,
    blocks: template.blocks.map((b) => ({ ...b, id: uid() })),
  };
  writeAll([...sites, site]);
  return site;
}

export function updateSite(id: string, patch: Partial<Site>): Site | null {
  const sites = readAll();
  const index = sites.findIndex((s) => s.id === id);
  if (index === -1) return null;
  sites[index] = { ...sites[index], ...patch };
  writeAll(sites);
  return sites[index];
}

export function deleteSite(id: string) {
  writeAll(readAll().filter((s) => s.id !== id));
}

export function parseItems(raw: string): { title: string; desc: string }[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("|");
      return { title: title.trim(), desc: rest.join("|").trim() };
    });
}
