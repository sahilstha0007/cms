"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  Image as ImageIcon,
  Settings,
  LogOut,
  Sparkles,
  Globe,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getSession, clearSession, type Session } from "@/lib/auth";
import DashboardNav from "@/components/dashboard-nav";
import CommandPalette from "@/components/command-palette";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/sites", label: "Sites", icon: Globe },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/assets", label: "Asset Library", icon: ImageIcon },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSessionState] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    setSessionState(s);
    setChecked(true);
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/");
  };

  if (!checked) return null;

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex items-center gap-2 px-6 py-5">
          <Image src="/OrionLogo.png" alt="Orion" width={32} height={32} />
          <span className="font-semibold">Orion</span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-lime-500/10 text-lime-700 dark:text-lime-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mx-3 mb-4 rounded-2xl border border-border bg-gradient-to-br from-lime-500/10 to-transparent p-4">
          <div className="flex items-center gap-2 text-lime-700 dark:text-lime-400">
            <Sparkles className="size-4" />
            <span className="text-sm font-semibold">Upgrade to Pro</span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            Unlimited projects, version history, and priority sync.
          </p>
          <button className="mt-3 w-full rounded-full bg-lime-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-lime-600">
            See plans
          </button>
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-lime-500/15 text-lime-700 text-xs dark:text-lime-400">
                {session?.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{session?.name}</p>
              <p className="truncate text-xs text-muted-foreground">{session?.planColor}</p>
            </div>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur px-6">
          <span className="font-medium">
            {navItems.find((n) =>
              n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href)
            )?.label ?? "Dashboard"}
          </span>
          <button
            onClick={() => setPaletteOpen(true)}
            className="ml-auto hidden items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            Search pages…
            <kbd className="pointer-events-none rounded bg-background px-1.5 py-0.5 font-mono text-[10px] shadow-sm">
              ⌘K
            </kbd>
          </button>
          <div className="ml-auto flex items-center gap-3 sm:ml-0">
            <span className="hidden rounded-full bg-lime-500/10 px-3 py-1 text-xs font-medium text-lime-700 dark:text-lime-400 sm:inline">
              {session?.planColor}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Log out
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 pb-24 md:pb-6">{children}</main>
      </div>
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <DashboardNav />
    </div>
  );
}
