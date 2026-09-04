const text = `You're racing to create exceptional work, but traditional design tools slow you down with unnecessary complexity and steep learning curves.`;

export default function Introduction() {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-lime-700 dark:text-lime-400">
                    Introduction
                </span>
                <p className="mt-6 text-2xl md:text-4xl font-medium tracking-tight leading-snug text-balance">
                    We get it — {text.split("but ")[1]?.split(" slow you down")[0]}{" "}
                    <span className="text-lime-600 dark:text-lime-400">
                        slow you down
                    </span>
                    . That&apos;s why we built Orion: a tool that gets out of your way
                    so the only limit is your imagination.
                </p>
            </div>
        </section>
    );
}
