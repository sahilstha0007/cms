import quantumLogo from "@/assets/images/quantum.svg";
import acmeLogo from "@/assets/images/acme-corp.svg";
import echoValleyLogo from "@/assets/images/echo-valley.svg";
import pulseLogo from "@/assets/images/pulse.svg";
import outsideLogo from "@/assets/images/outside.svg";
import apexLogo from "@/assets/images/apex.svg";
import celestialLogo from "@/assets/images/celestial.svg";
import twiceLogo from "@/assets/images/twice.svg";
import Image from "next/image";

const logos = [
    { name: "Quantum", image: quantumLogo },
    { name: "Acme Corp", image: acmeLogo },
    { name: "Echo Valley", image: echoValleyLogo },
    { name: "Pulse", image: pulseLogo },
    { name: "Outside", image: outsideLogo },
    { name: "Apex", image: apexLogo },
    { name: "Celestial", image: celestialLogo },
    { name: "Twice", image: twiceLogo },
];

export default function LogoTicker() {
    return (
        <section className="py-16 md:py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    Trusted by the world&apos;s most innovative teams
                </h3>
                <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex w-max animate-marquee gap-16 pr-16">
                        {[...logos, ...logos].map((logo, index) => (
                            <Image
                                key={`${logo.name}-${index}`}
                                src={logo.image}
                                alt={logo.name}
                                height={32}
                                className="h-8 w-auto opacity-70 transition-opacity hover:opacity-100"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
