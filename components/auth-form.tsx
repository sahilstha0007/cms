"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { setSession } from "@/lib/auth";

type Mode = "login" | "signup";

const DEMO: Record<Mode, { name: string; email: string }> = {
  login: { name: "Sahil Shrestha", email: "sahil@orion.app" },
  signup: { name: "New Designer", email: "you@studio.com" },
};

const OAuthButton = ({ provider, children }: { provider: string; children: React.ReactNode }) => (
  <Button
    type="button"
    variant="outline"
    className="w-full rounded-full"
    onClick={() => alert(`${provider} sign-in is coming soon — use the demo button below.`)}
  >
    {children}
  </Button>
);

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (mode === "signup" && name.trim().length < 2)
      return setError("Please enter your name.");

    setLoading(true);
    setTimeout(() => {
      const demo = DEMO[mode];
      setSession({
        name: mode === "signup" ? name.trim() : demo.name,
        email: email.trim(),
        plan: mode === "signup" ? "Free" : "Pro",
        planColor: mode === "signup" ? "Free plan" : "Pro plan",
      });
      router.push("/dashboard");
    }, 600);
  };

  const fillDemo = () => {
    setLoading(true);
    const demo = DEMO[mode];
    setSession({
      name: demo.name,
      email: demo.email,
      plan: "Pro",
      planColor: "Pro plan",
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: form */}
      <div className="flex w-full flex-col px-6 py-8 lg:w-[45%] lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to home
        </Link>

        <div className="flex flex-1 items-center">
          <div className="w-full max-w-sm mx-auto py-12">
            <div className="flex items-center gap-2">
              <Image src="/OrionLogo.png" alt="Orion" width={36} height={36} />
              <span className="font-semibold text-lg">Orion</span>
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "login"
                ? "Sign in to continue to your workspace."
                : "Start designing at the speed of thought — free forever."}
            </p>

            <div className="mt-8 grid gap-3">
              <OAuthButton provider="Google">
                <svg viewBox="0 0 24 24" className="mr-2 size-4" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
                </svg>
                Continue with Google
              </OAuthButton>
              <OAuthButton provider="GitHub">
                <svg viewBox="0 0 24 24" className="mr-2 size-4" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.64 3.01 8.58 7.18 9.97.53.1.72-.23.72-.5v-1.79c-2.92.64-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.54-1.17-1.54-.95-.66.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.41-2.33-.27-4.78-1.17-4.78-5.19 0-1.15.41-2.09 1.09-2.83-.11-.27-.47-1.35.1-2.81 0 0 .89-.28 2.9 1.08a10.1 10.1 0 0 1 5.28 0c2.01-1.36 2.9-1.08 2.9-1.08.57 1.46.21 2.54.1 2.81.68.74 1.09 1.68 1.09 2.83 0 4.03-2.46 4.92-4.8 5.18.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.52 10.52 0 0 0 22.5 12C22.5 6.2 17.8 1.5 12 1.5Z" />
                </svg>
                Continue with GitHub
              </OAuthButton>
            </div>

            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              {mode === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    placeholder="Ada Lovelace"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-full px-5"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full px-5"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
                      Forgot password?
                    </button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full px-5"
                />
              </div>

              {mode === "signup" && (
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" defaultChecked />
                  <Label htmlFor="terms" className="text-xs font-normal text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/" className="underline hover:text-foreground">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/" className="underline hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-full bg-lime-500 hover:bg-lime-600 text-white"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {mode === "login" ? "Sign in" : "Create account"}
              </Button>

              <Button type="button" variant="ghost" onClick={fillDemo} className="rounded-full text-muted-foreground">
                Skip — enter demo workspace
              </Button>
            </form>

            <p className="mt-8 text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden lg:flex lg:w-[55%] items-center justify-center overflow-hidden bg-lime-500">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 20%, rgb(255 255 255 / 0.35), transparent), radial-gradient(ellipse 50% 60% at 20% 90%, rgb(0 0 0 / 0.18), transparent)",
          }}
        />
        <div className="relative max-w-md px-12 text-white">
          <p className="text-3xl font-semibold tracking-tight leading-snug">
            “Orion cut our design-to-dev handoff in half. The team refuses to go back.”
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-white/20 font-semibold">
              MR
            </div>
            <div>
              <p className="font-medium">Maya Rodriguez</p>
              <p className="text-sm text-white/75">Design Lead, Acme Corp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
