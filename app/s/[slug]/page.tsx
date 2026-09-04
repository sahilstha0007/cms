"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteRenderer from "@/lib/cms/site-renderer";
import { getSiteBySlug, type Site } from "@/lib/cms/store";

export default function PublicSitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [site, setSite] = useState<Site | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    setSite(getSiteBySlug(slug));
    setLoaded(true);
  }, [slug]);

  if (!loaded) return null;

  if (!site) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Globe className="size-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Site not found</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This site doesn&apos;t exist or isn&apos;t published.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">Go to Orion</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteRenderer blocks={site.blocks} theme={site.theme} mode="published" />
    </div>
  );
}
