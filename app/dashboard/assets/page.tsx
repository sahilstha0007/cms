"use client";

import { useState } from "react";
import { Download, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const assets = [
  { name: "hero-illustration.svg", type: "Illustration", size: "248 KB", hue: "bg-lime-500/15" },
  { name: "icon-set-v3.svg", type: "Icons", size: "96 KB", hue: "bg-sky-500/15" },
  { name: "onboarding-flow.png", type: "Screenshot", size: "1.2 MB", hue: "bg-violet-500/15" },
  { name: "brand-guidelines.pdf", type: "Document", size: "3.4 MB", hue: "bg-amber-500/15" },
  { name: "checkout-mockup.fig", type: "Mockup", size: "820 KB", hue: "bg-rose-500/15" },
  { name: "avatar-pack.zip", type: "Assets", size: "5.1 MB", hue: "bg-teal-500/15" },
];

const filters = ["All", "Illustration", "Icons", "Screenshot", "Document", "Mockup"];

export default function AssetsPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = assets.filter(
    (a) =>
      (filter === "All" || a.type === filter) &&
      a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Asset Library</h1>
          <p className="text-sm text-muted-foreground">
            Every file your team shares, searchable in one place.
          </p>
        </div>
        <Button className="rounded-full bg-lime-500 hover:bg-lime-600 text-white">
          <Upload className="size-4 mr-1" /> Upload
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets…"
            className="rounded-full pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                filter === f
                  ? "border-lime-500 bg-lime-500/10 text-lime-700 dark:text-lime-400"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <div
            key={a.name}
            className="group rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={cn("flex h-28 items-center justify-center rounded-xl", a.hue)}>
              <span className="font-mono text-xs text-muted-foreground">SVG / PNG preview</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{a.name}</p>
                <p className="text-xs text-muted-foreground">
                  {a.type} · {a.size}
                </p>
              </div>
              <button
                aria-label={`Download ${a.name}`}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Download className="size-4" />
              </button>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
            No assets match your search.
          </p>
        )}
      </div>
    </div>
  );
}
