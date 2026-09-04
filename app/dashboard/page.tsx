import Link from "next/link";
import { FolderKanban, Layers, Users, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Active projects", value: "4", icon: FolderKanban, trend: "+1 this week" },
  { label: "Assets in library", value: "128", icon: Layers, trend: "+12 this month" },
  { label: "Team members", value: "6", icon: Users, trend: "+2 invited" },
  { label: "Last sync", value: "2m ago", icon: Clock, trend: "All changes saved" },
];

const activity = [
  { user: "Maya R.", action: "updated the design system", target: "Orion DS v2", time: "12m ago" },
  { user: "You", action: "exported code for", target: "Hero section", time: "1h ago" },
  { user: "Tom K.", action: "commented on", target: "Checkout flow", time: "3h ago" },
  { user: "Priya S.", action: "uploaded 8 files to", target: "Asset Library", time: "Yesterday" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — here&apos;s what&apos;s happening in your workspace.
          </p>
        </div>
        <Button className="rounded-full bg-lime-500 hover:bg-lime-600 text-white">
          <Plus className="size-4 mr-1" /> New project
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="size-4 text-lime-600 dark:text-lime-400" />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Recent activity</h2>
          <ul className="mt-4 space-y-4">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {a.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{a.user}</span>{" "}
                  {a.action}{" "}
                  <span className="font-medium text-foreground">{a.target}</span>
                  <span className="ml-2 text-xs text-muted-foreground/70">
                    {a.time}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-2">
            <Button asChild variant="outline" className="justify-start rounded-xl">
              <Link href="/dashboard/projects">
                <FolderKanban className="size-4 mr-2" /> Browse projects
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start rounded-xl">
              <Link href="/dashboard/assets">
                <Layers className="size-4 mr-2" /> Open asset library
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start rounded-xl">
              <Link href="/dashboard/settings">
                <Users className="size-4 mr-2" /> Invite teammates
              </Link>
            </Button>
          </div>
          <div className="mt-6 rounded-xl bg-muted/60 p-4">
            <p className="text-sm font-medium">Tip of the day</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Press{" "}
              <kbd className="rounded bg-background px-1.5 py-0.5 text-[10px] font-mono shadow-sm">
                ⌘K
              </kbd>{" "}
              to jump anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
