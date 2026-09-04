"use client";

import { useState } from "react";
import {
  Zap,
  Shield,
  Heart,
  Star,
  Globe,
  Layers,
  Rocket,
  ChevronDown,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { parseItems, type Block, type SiteTheme } from "./store";

const ICONS: Record<string, LucideIcon> = { Zap, Shield, Heart, Star, Globe, Layers, Rocket };

type Mode = "preview" | "published";

export default function SiteRenderer({
  blocks,
  theme,
  mode = "preview",
}: {
  blocks: Block[];
  theme: SiteTheme;
  mode?: Mode;
}) {
  const radius =
    theme.radius === "none" ? "0px" : theme.radius === "full" ? "9999px" : "0.75rem";

  return (
    <div
      className={cn(
        "bg-background text-foreground",
        theme.font === "serif" ? "font-serif" : "font-sans"
      )}
    >
      {blocks.map((block) => (
        <BlockView key={block.id} block={block} theme={theme} mode={mode} radius={radius} />
      ))}
    </div>
  );
}

function BlockView({
  block,
  theme,
  mode,
  radius,
}: {
  block: Block;
  theme: SiteTheme;
  mode: Mode;
  radius: string;
}) {
  const r = { borderRadius: radius };
  switch (block.type) {
    case "hero":
      return (
        <section className="px-6 py-20 md:py-28 text-center">
          <div className="mx-auto max-w-3xl">
            {block.props.badge ? (
              <span
                className="inline-block px-3.5 py-1 text-xs font-medium"
                style={{ ...r, background: `${theme.primary}1a`, color: theme.primary }}
              >
                {block.props.badge}
              </span>
            ) : null}
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter text-balance">
              {block.props.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              {block.props.subtitle}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                className="px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ ...r, background: theme.primary }}
              >
                {block.props.primaryCta}
              </button>
              <button
                className="px-6 py-2.5 text-sm font-medium border border-border transition-colors hover:bg-muted"
                style={r}
              >
                {block.props.secondaryCta}
              </button>
            </div>
          </div>
        </section>
      );
    case "features": {
      const items = parseItems(block.props.items ?? "");
      return (
        <section className="px-6 py-16 md:py-24 bg-muted/40">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
              {block.props.title}
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => {
                const Icon = ICONS[Object.keys(ICONS)[i % Object.keys(ICONS).length]];
                return (
                  <div
                    key={i}
                    className="border border-border bg-card p-6 shadow-sm"
                    style={r}
                  >
                    <div
                      className="flex size-10 items-center justify-center"
                      style={{ ...r, background: `${theme.primary}1a`, color: theme.primary }}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }
    case "testimonials": {
      const items = parseItems(block.props.items ?? "");
      return (
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
              {block.props.title}
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {items.map((item, i) => (
                <figure
                  key={i}
                  className="border border-border bg-card p-6 shadow-sm"
                  style={r}
                >
                  <div className="flex gap-1" style={{ color: theme.primary }}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed">
                    “{item.title}”
                  </blockquote>
                  <figcaption className="mt-3 text-xs text-muted-foreground">
                    {item.desc}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case "faq":
      return <FaqBlock block={block} theme={theme} radius={radius} />;
    case "cta":
      return (
        <section className="px-6 py-16 md:py-24">
          <div
            className="mx-auto max-w-5xl px-6 py-14 text-center text-white"
            style={r}
          >
            <div className="bg-white/10 backdrop-blur-sm" style={{ ...r, background: theme.primary }}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {block.props.title}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/85">{block.props.subtitle}</p>
              <button
                className="mt-7 px-6 py-2.5 text-sm font-medium bg-white transition-opacity hover:opacity-90"
                style={{ ...r, color: theme.primary }}
              >
                {block.props.button}
              </button>
            </div>
          </div>
        </section>
      );
    case "contact":
      return <ContactBlock block={block} theme={theme} radius={radius} />;
    case "footer":
      return (
        <footer className="border-t border-border px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">{block.props.text}</p>
        </footer>
      );
    default:
      return null;
  }
}

function FaqBlock({
  block,
  theme,
  radius,
}: {
  block: Block;
  theme: SiteTheme;
  radius: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const items = parseItems(block.props.items ?? "");
  return (
    <section className="px-6 py-16 md:py-24 bg-muted/40">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
          {block.props.title}
        </h2>
        <div className="mt-10 space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-border bg-card overflow-hidden"
              style={{ borderRadius: radius }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
              >
                {item.title}
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 transition-transform",
                    open === i && "rotate-180"
                  )}
                  style={{ color: theme.primary }}
                />
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  block,
  theme,
  radius,
}: {
  block: Block;
  theme: SiteTheme;
  radius: string;
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {block.props.title}
        </h2>
        <a
          href={`mailto:${block.props.email}`}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ ...r2(radius), background: theme.primary }}
        >
          <Mail className="size-4" />
          {block.props.email}
        </a>
      </div>
    </section>
  );
}

function r2(radius: string) {
  return { borderRadius: radius };
}
