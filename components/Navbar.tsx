"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Integrations", href: "/#integrations" },
  { label: "FAQs", href: "/#faqs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSignedIn(!!getSession());
  }, []);

  useEffect(() => {
    const ids = ["features", "integrations", "faqs"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const linkCls = (href: string) =>
    cn(
      "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
      active === href.slice(1)
        ? "bg-lime-500/10 text-lime-700 dark:text-lime-400"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <div
        className={cn(
          "w-full max-w-6xl rounded-full border px-4 md:px-6 py-2.5 flex items-center justify-between gap-3 transition-all duration-300",
          scrolled
            ? "border-border bg-card/90 shadow-lg shadow-zinc-950/5 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/OrionLogo.png" alt="Orion" width={34} height={34} />
          <span className="font-semibold text-lg tracking-tight">Orion</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkCls(item.href)}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {signedIn ? (
              <Button asChild className="rounded-full bg-lime-500 hover:bg-lime-600 text-white">
                <Link href="/dashboard">Open app</Link>
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:border-lime-500/60 hover:text-lime-700 dark:hover:text-lime-400"
                >
                  Login
                </Link>
                <Button asChild className="rounded-full bg-lime-500 hover:bg-lime-600 text-white">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="md:hidden rounded-full border border-border p-2 text-foreground transition-colors hover:bg-muted"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="rounded-b-3xl border-border">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Image src="/OrionLogo.png" alt="" width={28} height={28} />
                  Orion
                </SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6 grid gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-3 grid gap-2 border-t border-border pt-4">
                  {signedIn ? (
                    <Button asChild className="w-full rounded-full bg-lime-500 hover:bg-lime-600 text-white">
                      <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Open app</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full rounded-full">
                        <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="w-full rounded-full bg-lime-500 hover:bg-lime-600 text-white">
                        <Link href="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
