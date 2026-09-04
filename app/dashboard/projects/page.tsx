import { FolderKanban, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "Orion DS v2", items: 42, updated: "2h ago", color: "bg-lime-500/15 text-lime-700 dark:text-lime-400" },
  { name: "Mobile App 2.0", items: 28, updated: "Yesterday", color: "bg-sky-500/15 text-sky-700 dark:text-sky-400" },
  { name: "Marketing Site", items: 17, updated: "3d ago", color: "bg-violet-500/15 text-violet-700 dark:text-violet-400" },
  { name: "Checkout Flow", items: 9, updated: "1w ago", color: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            All your design projects in one place.
          </p>
        </div>
        <Button className="rounded-full bg-lime-500 hover:bg-lime-600 text-white">
          <Plus className="size-4 mr-1" /> New project
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.name}
            className="group cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex size-10 items-center justify-center rounded-xl ${p.color}`}
              >
                <FolderKanban className="size-5" />
              </div>
              <button
                aria-label="Project options"
                className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
            <h2 className="mt-4 font-semibold">{p.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.items} items · Updated {p.updated}
            </p>
          </div>
        ))}

        <button className="flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-lime-500/50 hover:text-lime-700 dark:hover:text-lime-400">
          <Plus className="size-5" />
          <span className="text-sm font-medium">Create new project</span>
        </button>
      </div>
    </div>
  );
}
