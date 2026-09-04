import {
    FolderOpen,
    Code2,
    Zap,
    RefreshCw,
    Layout,
    Search,
    Ruler,
    type LucideIcon,
} from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
    {
        icon: FolderOpen,
        title: "Asset Library",
        description: "Organize all your components, icons, and media in one searchable library.",
    },
    {
        icon: Code2,
        title: "Code Preview",
        description: "See production-ready code for every element, ready to copy or export.",
    },
    {
        icon: Zap,
        title: "Flow Mode",
        description: "A distraction-free canvas that keeps you in your creative flow.",
    },
    {
        icon: RefreshCw,
        title: "Smart Sync",
        description: "Changes sync across devices and teammates automatically in real time.",
    },
    {
        icon: Layout,
        title: "Auto Layout",
        description: "Responsive layouts that adapt themselves as your designs evolve.",
    },
    {
        icon: Search,
        title: "Fast Search",
        description: "Find any layer, frame, or asset across projects in milliseconds.",
    },
    {
        icon: Ruler,
        title: "Smart Guides",
        description: "Pixel-perfect alignment with intelligent snapping and spacing hints.",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20 md:py-28 bg-muted/40">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-lime-700 dark:text-lime-400">
                        Features
                    </span>
                    <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                        Where power meets simplicity
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Every tool you need to move from idea to shipped design, without the
                        complexity of traditional software.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex size-11 items-center justify-center rounded-xl bg-lime-500/10 text-lime-700 dark:text-lime-400 transition-colors group-hover:bg-lime-500 group-hover:text-white">
                                <feature.icon className="size-5" />
                            </div>
                            <h3 className="mt-5 font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                    <div className="rounded-2xl bg-lime-500 p-6 text-white flex flex-col justify-between shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                        <div>
                            <h3 className="font-semibold text-lg">And much more</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/85">
                                Versioning, offline mode, collaboration, and every detail crafted for speed.
                            </p>
                        </div>
                        <span className="mt-6 inline-flex text-sm font-medium">
                            Explore the docs →
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
