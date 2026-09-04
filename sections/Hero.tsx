import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-36 pb-20">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.768 0.233 130.85 / 0.15), transparent)",
                }}
            />
            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
                    <span className="size-2 rounded-full bg-lime-500 animate-pulse" />
                    Introducing Orion 2.0
                    <span aria-hidden className="text-lime-600">→</span>
                </div>

                <h1 className="mt-6 max-w-4xl mx-auto text-5xl md:text-7xl font-bold tracking-tighter text-balance">
                    Design faster than you think
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
                    A creative tool with a smart interface and phenomenal features that
                    empowers modern design teams to produce exceptional work in record time.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <Button asChild size="lg" className="rounded-full bg-lime-500 hover:bg-lime-600 text-white px-8">
                        <Link href="/signup">Start designing</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full">
                        <Link href="/#features">See how it works</Link>
                    </Button>
                </div>

                <div className="relative mt-16 max-w-5xl mx-auto">
                    <div className="absolute inset-x-8 -top-6 h-24 bg-lime-500/30 blur-3xl rounded-full" aria-hidden />
                    <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-zinc-950/10 overflow-hidden">
                        <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-3">
                            <span className="size-3 rounded-full bg-red-400" />
                            <span className="size-3 rounded-full bg-yellow-400" />
                            <span className="size-3 rounded-full bg-green-400" />
                            <span className="ml-4 text-xs text-muted-foreground">orion.app/studio</span>
                        </div>
                        <div className="relative aspect-[16/9] bg-muted">
                            <Image
                                src="/OrionLogo.png"
                                alt="Orion studio preview"
                                fill
                                className="object-contain p-16"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
