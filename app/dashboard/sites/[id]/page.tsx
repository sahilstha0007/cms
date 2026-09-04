"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Globe,
  HelpCircle,
  Layers,
  Mail,
  PanelBottom,
  Palette,
  Plus,
  Rocket,
  Star,
  Trash2,
  Type as TypeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  getSite,
  updateSite,
  THEMES,
  type Block,
  type BlockType,
  type Site,
} from "@/lib/cms/store";
import SiteRenderer from "@/lib/cms/site-renderer";

const BLOCK_LIBRARY: {
  type: BlockType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { type: "hero", name: "Hero", icon: Globe },
  { type: "features", name: "Features", icon: Layers },
  { type: "testimonials", name: "Testimonials", icon: Star },
  { type: "faq", name: "FAQ", icon: HelpCircle },
  { type: "cta", name: "Call to action", icon: Rocket },
  { type: "contact", name: "Contact", icon: Mail },
  { type: "footer", name: "Footer", icon: PanelBottom },
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function newBlock(type: BlockType): Block {
  const id = uid();
  switch (type) {
    case "hero":
      return { id, type, props: { badge: "New", title: "Headline", subtitle: "Subtitle", primaryCta: "Get started", secondaryCta: "Learn more" } };
    case "features":
      return { id, type, props: { title: "Features", items: "Feature one|Describe it here.\nFeature two|Describe it here.\nFeature three|Describe it here." } };
    case "testimonials":
      return { id, type, props: { title: "Testimonials", items: "Great product!|Happy Customer\nChanged our workflow.|Another Client" } };
    case "faq":
      return { id, type, props: { title: "FAQ", items: "A question?|The answer.\nAnother?|More detail." } };
    case "cta":
      return { id, type, props: { title: "Ready to start?", subtitle: "Join us today.", button: "Get started" } };
    case "contact":
      return { id, type, props: { title: "Contact us", email: "hello@example.com" } };
    case "footer":
      return { id, type, props: { text: "© 2026 Your Company" } };
    default:
      return { id, type: "footer", props: { text: "" } };
  }
}

const PROP_LABELS: Record<string, string> = {
  badge: "Badge text",
  title: "Title",
  subtitle: "Subtitle",
  primaryCta: "Primary button",
  secondaryCta: "Secondary button",
  items: "Items (one per line: Title|Description)",
  button: "Button text",
  email: "Email address",
  text: "Text",
};

export default function SiteEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [site, setSiteState] = useState<Site | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const s = getSite(id);
    if (!s) {
      setNotFound(true);
      return;
    }
    setSiteState(s);
  }, [id]);

  const commit = (next: Site) => {
    setSiteState(next);
    setSaveState("saving");
    updateSite(next.id, next);
    window.setTimeout(() => setSaveState("saved"), 350);
    window.setTimeout(() => setSaveState("idle"), 1800);
  };

  const addBlock = (type: BlockType) => {
    if (!site) return;
    const block = newBlock(type);
    commit({ ...site, blocks: [...site.blocks, block] });
    setSelectedId(block.id);
    setShowAdd(false);
  };

  const move = (index: number, dir: -1 | 1) => {
    if (!site) return;
    const next = [...site.blocks];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    commit({ ...site, blocks: next });
  };

  const duplicate = (index: number) => {
    if (!site) return;
    const next = [...site.blocks];
    next.splice(index + 1, 0, { ...next[index], id: uid() });
    commit({ ...site, blocks: next });
  };

  const remove = (index: number) => {
    if (!site) return;
    commit({ ...site, blocks: site.blocks.filter((_, i) => i !== index) });
  };

  const setProp = (blockId: string, key: string, value: string) => {
    if (!site) return;
    commit({
      ...site,
      blocks: site.blocks.map((b) =>
        b.id === blockId ? { ...b, props: { ...b.props, [key]: value } } : b
      ),
    });
  };

  if (notFound) {
    return (
      <div className="py-24 text-center">
        <p className="font-medium">Site not found</p>
        <Button asChild variant="outline" className="mt-4 rounded-full">
          <Link href="/dashboard/sites">Back to sites</Link>
        </Button>
      </div>
    );
  }

  if (!site) return null;

  const selected = site.blocks.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button asChild size="icon" variant="outline" className="shrink-0 rounded-full">
            <Link href="/dashboard/sites" aria-label="Back to sites">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <input
              value={site.name}
              onChange={(e) => commit({ ...site, name: e.target.value })}
              className="w-48 truncate rounded-md bg-transparent px-1 text-lg font-bold tracking-tight outline-none hover:bg-muted/50 focus:bg-muted/50"
            />
            <p className="px-1 text-xs text-muted-foreground">
              /s/{site.slug} ·{" "}
              {saveState === "saved"
                ? "Saved"
                : saveState === "saving"
                  ? "Saving…"
                  : "All changes saved"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
          <Globe className="size-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Published</span>
          <Switch
            checked={site.published}
            onCheckedChange={(v) => commit({ ...site, published: v })}
          />
          {site.published && (
            <a
              href={`/s/${site.slug}`}
              target="_blank"
              rel="noreferrer"
              aria-label="View live site"
              className="text-lime-600 hover:underline dark:text-lime-400"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[290px_1fr]">
        {/* Left column */}
        <div className="space-y-4">
          {/* Blocks panel */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <TypeIcon className="size-4" /> Blocks
              </span>
              <button
                onClick={() => setShowAdd(!showAdd)}
                className="rounded-lg p-1.5 hover:bg-muted"
                aria-label="Add block"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {showAdd && (
              <div className="mt-3 grid gap-1.5 rounded-xl border border-border p-2">
                {BLOCK_LIBRARY.map((b) => (
                  <button
                    key={b.type}
                    onClick={() => addBlock(b.type)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                  >
                    <b.icon className="size-4 text-muted-foreground" />
                    {b.name}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-3 space-y-1.5">
              {site.blocks.map((block, index) => (
                <div
                  key={block.id}
                  className={cn(
                    "group flex items-center gap-0.5 rounded-xl border p-1 transition-colors",
                    selectedId === block.id
                      ? "border-lime-500 bg-lime-500/5"
                      : "border-transparent hover:bg-muted/50"
                  )}
                >
                  <button
                    onClick={() => setSelectedId(block.id)}
                    className="flex-1 truncate px-1.5 text-left text-sm capitalize"
                  >
                    {block.type}
                  </button>
                  <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label="Move up"
                      className="rounded p-1 hover:bg-muted disabled:opacity-30"
                    >
                      <ChevronUp className="size-3.5" />
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={index === site.blocks.length - 1}
                      aria-label="Move down"
                      className="rounded p-1 hover:bg-muted disabled:opacity-30"
                    >
                      <ChevronDown className="size-3.5" />
                    </button>
                    <button
                      onClick={() => duplicate(index)}
                      aria-label="Duplicate block"
                      className="rounded p-1 hover:bg-muted"
                    >
                      <Copy className="size-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(index)}
                    aria-label="Remove block"
                    className="rounded p-1.5 text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Theme panel */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Palette className="size-4" /> Theme
            </span>
            <p className="mt-3 text-xs text-muted-foreground">Accent color</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() =>
                    commit({ ...site, theme: { ...site.theme, primary: t.value } })
                  }
                  aria-label={t.name}
                  className={cn(
                    "size-7 rounded-full border-2 transition-transform hover:scale-110",
                    site.theme.primary === t.value
                      ? "border-foreground"
                      : "border-transparent"
                  )}
                  style={{ background: t.value }}
                />
              ))}
              <input
                type="color"
                value={site.theme.primary}
                onChange={(e) =>
                  commit({ ...site, theme: { ...site.theme, primary: e.target.value } })
                }
                aria-label="Custom accent color"
                className="size-7 cursor-pointer rounded-full border border-border bg-transparent"
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Corners</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {(["none", "md", "full"] as const).map((radius) => (
                <button
                  key={radius}
                  onClick={() => commit({ ...site, theme: { ...site.theme, radius } })}
                  className={cn(
                    "rounded-lg border px-2 py-1.5 text-xs capitalize transition-colors",
                    site.theme.radius === radius
                      ? "border-lime-500 bg-lime-500/5"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  {radius}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Font</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {(["sans", "serif"] as const).map((font) => (
                <button
                  key={font}
                  onClick={() => commit({ ...site, theme: { ...site.theme, font } })}
                  className={cn(
                    "rounded-lg border px-2 py-1.5 text-xs capitalize transition-colors",
                    site.theme.font === font
                      ? "border-lime-500 bg-lime-500/5"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  {font === "sans" ? "Sans serif" : "Serif"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {selected && (
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <span className="text-sm font-semibold capitalize">
                {selected.type} settings
              </span>
              <div className="mt-3 grid gap-3">
                {Object.entries(selected.props).map(([key, value]) => (
                  <div key={key} className="grid gap-1.5">
                    <Label htmlFor={`prop-${key}`}>{PROP_LABELS[key] ?? key}</Label>
                    {key === "items" ? (
                      <textarea
                        id={`prop-${key}`}
                        value={value}
                        onChange={(e) => setProp(selected.id, key, e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm"
                      />
                    ) : (
                      <Input
                        id={`prop-${key}`}
                        value={value}
                        onChange={(e) => setProp(selected.id, key, e.target.value)}
                        className="rounded-xl"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live preview */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-yellow-400" />
              <span className="size-2.5 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-muted-foreground">
                {site.published ? `orion.app/s/${site.slug}` : "preview"}
              </span>
            </div>
            <div className="max-h-[70vh] overflow-y-auto bg-background">
              <SiteRenderer blocks={site.blocks} theme={site.theme} mode="preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
