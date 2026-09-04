"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  listSites,
  createSiteFromTemplate,
  deleteSite,
  updateSite,
  TEMPLATES,
  type Site,
} from "@/lib/cms/store";

export default function SitesPage() {
  const router = useRouter();
  const [sites, setSites] = useState<Site[] | null>(null);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState("saas");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setSites(listSites());
  }, []);

  const handleCreate = () => {
    if (!name.trim()) return;
    setCreating(true);
    const site = createSiteFromTemplate(name.trim(), templateId);
    router.push(`/dashboard/sites/${site.id}`);
  };

  const handleDelete = (id: string) => {
    deleteSite(id);
    setSites(listSites());
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sites</h1>
          <p className="text-sm text-muted-foreground">
            Create websites with blocks, customize everything visually, publish in one click.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-lime-500 hover:bg-lime-600 text-white">
              <Plus className="size-4 mr-1" /> New site
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create a new site</DialogTitle>
              <DialogDescription>
                Pick a starting point — you can change everything later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Site name</Label>
                <Input
                  id="site-name"
                  placeholder="Acme Marketing"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label>Template</Label>
                <div className="grid gap-2">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplateId(t.id)}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        templateId === t.id
                          ? "border-lime-500 bg-lime-500/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleCreate}
                disabled={creating || !name.trim()}
                className="rounded-full bg-lime-500 hover:bg-lime-600 text-white"
              >
                {creating ? <Loader2 className="size-4 animate-spin" /> : "Create site"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {sites === null ? null : sites.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <Globe className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-4 font-medium">No sites yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first site — it takes about a minute.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <div
              key={site.id}
              className="group rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="relative flex h-32 items-end justify-start overflow-hidden rounded-t-2xl p-4"
                style={{ background: `linear-gradient(135deg, ${site.theme.primary}26, transparent 60%)` }}
              >
                <div className="absolute left-4 top-4 flex h-8 items-center rounded-md bg-background/80 px-3 text-xs font-medium shadow-sm backdrop-blur">
                  {site.name}
                </div>
                {site.published ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-500/15 px-2.5 py-1 text-xs font-medium text-lime-700 dark:text-lime-400">
                    <span className="size-1.5 rounded-full bg-lime-500" /> Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-muted-foreground/50" /> Draft
                  </span>
                )}
                <span className="absolute bottom-3 right-4 text-[10px] text-muted-foreground/60">
                  {site.blocks.length} blocks
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <p className="truncate text-xs text-muted-foreground">/{site.slug}</p>
                <div className="flex items-center gap-1">
                  <Button asChild size="sm" variant="ghost" className="rounded-full">
                    <Link href={`/dashboard/sites/${site.id}`}>
                      <Pencil className="size-3.5 mr-1" /> Edit
                    </Link>
                  </Button>
                  {site.published && (
                    <Button asChild size="sm" variant="ghost" className="rounded-full">
                      <a href={`/s/${site.slug}`} target="_blank" rel="noreferrer">
                        <ExternalLink className="size-3.5 mr-1" /> View
                      </a>
                    </Button>
                  )}
                  <button
                    aria-label={`Delete ${site.name}`}
                    onClick={() => handleDelete(site.id)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
