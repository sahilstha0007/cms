"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getSession, updateSession } from "@/lib/auth";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Free");
  const [notify, setNotify] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (s) {
      setName(s.name);
      setEmail(s.email);
      setPlan(s.plan);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSession({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, workspace and notifications.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="font-semibold">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="settings-name">Full name</Label>
            <Input
              id="settings-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="settings-email">Email</Label>
            <Input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Button
            type="submit"
            className="rounded-full bg-lime-500 hover:bg-lime-600 text-white"
          >
            Save changes
          </Button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-sm text-lime-700 dark:text-lime-400">
              <Check className="size-4" /> Saved
            </span>
          )}
        </div>
      </form>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-semibold">Notifications</h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Product updates</p>
            <p className="text-xs text-muted-foreground">
              Get an email when we ship new features.
            </p>
          </div>
          <Switch checked={notify} onCheckedChange={setNotify} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Plan</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;re on the <span className="font-medium text-foreground">{plan}</span> plan.
            </p>
          </div>
          <Button className="rounded-full bg-lime-500 hover:bg-lime-600 text-white">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
