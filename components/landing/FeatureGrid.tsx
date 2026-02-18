import { LucideIcon, CloudRain, Bell, BarChart3, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureRow {
    title: string;
    description: string;
    icon: LucideIcon;
    imageAlt: string;
}

const features: FeatureRow[] = [
    {
        title: "Real-time Weather Monitoring",
        description:
            "Our system constantly monitors Environment Canada's official GeoMet API to track snowfall accumulation in real-time across all your contracted postal codes.",
        icon: CloudRain,
        imageAlt: "Weather monitoring dashboard",
    },
    {
        title: "Automated Contractor Alerts",
        description:
            "When snowfall hits your custom thresholds, we automatically dispatch email and SMS notifications to your contractors so they can mobilize instantly.",
        icon: Bell,
        imageAlt: "Notification alert preview",
    },
    {
        title: "Advanced Analytics & Logging",
        description:
            "Keep a perfect audit trail of every snowfall event and every notification sent. Prove compliance and efficiency with detailed historical logs.",
        icon: BarChart3,
        imageAlt: "Data analytics view",
    },
];

export function FeatureGrid() {
    return (
        <section id="features" className="bg-white overflow-hidden">
            <div className="container-wide">
                {features.map((feature, index) => (
                    <div
                        key={feature.title}
                        className={cn(
                            "flex flex-col lg:items-center gap-16 md:gap-24 section-padding border-b border-neutral-border last:border-none",
                            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                        )}
                    >
                        {/* Text Content */}
                        <div className="flex-1 space-y-6 animate-fade-in-up">
                            <div className="bg-brand-light w-12 h-12 rounded-xl flex items-center justify-center text-brand">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-display font-heading text-neutral">
                                {feature.title}
                            </h3>
                            <p className="text-body-lg text-neutral-body max-w-xl">
                                {feature.description}
                            </p>
                            <ul className="space-y-4 pt-4">
                                {["Industry-leading accuracy", "0ms dispatch latency", "Enterprise-grade reliability"].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-body font-medium text-neutral">
                                        <ShieldCheck className="text-brand w-5 h-5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Visual Placeholder */}
                        <div className="flex-1 relative group bg-neutral-bg rounded-3xl p-8 lg:p-12 border border-neutral-border shadow-soft overflow-hidden min-h-[300px] md:min-h-[400px]">
                            <div className="absolute inset-x-8 top-12 bottom-0 bg-white rounded-t-2xl shadow-card border border-neutral-border p-6 transition-transform group-hover:-translate-y-4 duration-500">
                                {/* Visual Mockup Content */}
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-border">
                                    <div className="w-24 h-4 bg-neutral-bg rounded-full animate-pulse" />
                                    <div className="w-8 h-8 rounded-full bg-brand/10" />
                                </div>
                                <div className="space-y-4">
                                    <div className="w-full h-8 bg-neutral-bg rounded-lg" />
                                    <div className="w-3/4 h-8 bg-neutral-bg rounded-lg" />
                                    <div className="w-1/2 h-8 bg-neutral-bg rounded-lg" />
                                </div>
                                <div className="mt-12 h-32 w-full bg-brand/5 rounded-2xl flex items-center justify-center border-2 border-dashed border-brand/20">
                                    <feature.icon className="text-brand/20 w-12 h-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
