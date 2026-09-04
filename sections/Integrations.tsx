import figmaLogo from "@/assets/images/figma-logo.svg";
import notionLogo from "@/assets/images/notion-logo.svg";
import slackLogo from "@/assets/images/slack-logo.svg";
import relumeLogo from "@/assets/images/relume-logo.svg";
import framerLogo from "@/assets/images/framer-logo.svg";
import githubLogo from "@/assets/images/github-logo.svg";
import Image from "next/image";

const integrations = [
    { name: "Figma", icon: figmaLogo, description: "Figma is a collaborative interface design tool." },
    { name: "Notion", icon: notionLogo, description: "Notion is an all-in-one workspace for notes and docs." },
    { name: "Slack", icon: slackLogo, description: "Slack is a powerful team communication platform." },
    { name: "Relume", icon: relumeLogo, description: "Relume is a no-code website builder and design system." },
    { name: "Framer", icon: framerLogo, description: "Framer is a professional website prototyping tool." },
    { name: "GitHub", icon: githubLogo, description: "GitHub is the leading platform for code collaboration." },
];

export default function Integrations() {
    return (
        <section id="integrations" className="py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-lime-700 dark:text-lime-400">
                        Integrations
                    </span>
                    <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                        Plays well with your stack
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Orion connects with the tools you already use, so nothing has to
                        leave your workflow.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {integrations.map((integration) => (
                        <div
                            key={integration.name}
                            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-transform group-hover:scale-105">
                                <Image src={integration.icon} alt={`${integration.name} logo`} width={24} height={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold">{integration.name}</h3>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                    {integration.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
