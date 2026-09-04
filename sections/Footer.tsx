import Link from "next/link";
import Image from "next/image";

const footerLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#faqs", label: "FAQs" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
];

export default function Footer() {
    return (
        <footer className="border-t border-border py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="flex items-center gap-3">
                        <Image src="/OrionLogo.png" alt="Orion logo" width={36} height={36} />
                        <span className="font-semibold">Orion</span>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Orion. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
