import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function SolutionHighlight() {
    return (
        <section className="bg-brand text-white section-padding overflow-hidden relative">
            {/* Decorative patterns */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-12 -z-0" />

            <div className="container-tight relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-display-lg font-heading font-extrabold mb-6">
                        The Reliability Your Clients Demand.
                    </h2>
                    <p className="text-body-lg text-white/80">
                        Stop checking weather apps and second-guessing forecasts.
                        Snowfall gives you the data-driven certainty to run a elite-level
                        operation without the manual overhead.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        "100% Data Accuracy from Official Sources",
                        "Multi-channel SMS & Email Dispatch",
                        "Custom Thresholds per Location",
                        "Detailed Auditing for Liability Protection",
                        "Client-Facing Dashboard Access",
                        "24/7 Monitoring - Even While You Sleep",
                    ].map((benefit) => (
                        <div
                            key={benefit}
                            className="flex items-start gap-4 p-6 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/[0.15] transition-colors"
                        >
                            <CheckCircle2 className="w-6 h-6 shrink-0 text-white" />
                            <span className="text-body font-medium">{benefit}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button size="xl" variant="secondary" asChild className="hover-lift bg-white text-brand hover:bg-neutral-bg border-none shadow-elevated">
                        <Link href="/signup">Get Started for Free</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
