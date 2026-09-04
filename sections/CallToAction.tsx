import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-lime-500 px-6 py-16 md:py-24 text-center text-white">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse 60% 80% at 50% 120%, rgb(255 255 255 / 0.25), transparent)",
                        }}
                    />
                    <h2 className="relative text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                        Ready to design at the speed of thought?
                    </h2>
                    <p className="relative mx-auto mt-4 max-w-xl text-white/85 text-pretty">
                        Join thousands of designers and product teams already shipping
                        exceptional work with Orion.
                    </p>
                    <div className="relative mt-8 flex items-center justify-center gap-3">
                        <Button asChild size="lg" variant="secondary" className="rounded-full bg-white text-lime-700 hover:bg-white/90 px-8">
                            <Link href="/signup">Get started free</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white px-8">
                            <Link href="/#faqs">Learn more</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
