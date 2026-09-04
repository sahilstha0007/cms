"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Globe,
  Image as ImageIcon,
  Settings,
  Plus,
  Upload,
  UserPlus,
  LogOut,
  Home,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { clearSession } from "@/lib/auth";

const pages = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Sites", href: "/dashboard/sites", icon: Globe },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Asset Library", href: "/dashboard/assets", icon: ImageIcon },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a page or run an action"
    >
      <CommandInput placeholder="Type a page or action…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((p) => (
            <CommandItem key={p.href} onSelect={() => run(() => router.push(p.href))}>
              <p.icon className="text-muted-foreground" />
              <span>{p.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => router.push("/dashboard/sites"))}>
            <Globe className="text-muted-foreground" />
            <span>Create a site</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/dashboard/projects"))}>
            <Plus className="text-muted-foreground" />
            <span>New project</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/dashboard/assets"))}>
            <Upload className="text-muted-foreground" />
            <span>Upload asset</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/dashboard/settings"))}>
            <UserPlus className="text-muted-foreground" />
            <span>Invite teammate</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Workspace">
          <CommandItem onSelect={() => run(() => router.push("/"))}>
            <Home className="text-muted-foreground" />
            <span>Back to landing page</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                clearSession();
                router.push("/");
              })
            }
          >
            <LogOut className="text-muted-foreground" />
            <span>Log out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
