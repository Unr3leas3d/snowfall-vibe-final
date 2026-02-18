import { PLANS, PlanType } from "@/lib/subscriptions/constants";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Check, Snowflake } from "lucide-react";
import Link from "next/link";

export function PricingCards() {
    const planKeys = Object.keys(PLANS) as PlanType[];

    return (
        <section id="pricing" className="section-padding bg-neutral-bg">
            <div className="container-wide">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-display font-heading font-extrabold text-neutral mb-6">
                        Choose Your Plan
                    </h2>
                    <p className="text-body-lg text-neutral-body">
                        Transparent pricing designed to grow with your snow management business.
                        Start free, scale as you add more contracts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
                    {planKeys.map((key) => {
                        const plan = PLANS[key];
                        const isPro = plan.type === "pro";

                        return (
                            <Card
                                key={plan.type}
                                className={cn(
                                    "relative flex flex-col transition-all duration-300",
                                    isPro ? "border-brand border-2 shadow-elevated scale-105 z-10" : "hover:border-neutral-muted/30"
                                )}
                            >
                                {isPro && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white px-4 py-1 rounded-full text-caption font-bold tracking-wider uppercase">
                                        Most Popular
                                    </div>
                                )}

                                <CardHeader className="text-center pb-2">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6",
                                        isPro ? "bg-brand text-white" : "bg-brand-light text-brand"
                                    )}>
                                        <Snowflake size={24} />
                                    </div>
                                    <CardTitle className="text-heading font-bold">{plan.name}</CardTitle>
                                </CardHeader>

                                <CardContent className="flex-grow pt-0 text-center">
                                    <div className="mb-8">
                                        <span className="text-display-lg font-heading font-extrabold text-neutral">
                                            ${plan.price}
                                        </span>
                                        <span className="text-neutral-body font-medium ml-2">/mo</span>
                                    </div>

                                    <ul className="space-y-4 text-left">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-body-sm text-neutral">
                                                <Check className="text-brand w-5 h-5 shrink-0 mt-0.5" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter className="pt-8">
                                    <Button
                                        className="w-full"
                                        size="xl"
                                        variant={isPro ? "primary" : "secondary"}
                                        asChild
                                    >
                                        <Link href="/signup">
                                            {plan.type === "free" ? "Get Started for Free" : `Start with ${plan.name}`}
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
