"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/ToastContext";
import { Snowflake } from "lucide-react";

const signupSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function Hero({ onSignup }: { onSignup?: (email: string) => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const isWaitlist = pathname === "/";
    const { toast } = useToast();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: SignupFormValues) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Subscription failed");

            toast({
                title: "Success!",
                description: isWaitlist
                    ? "Welcome aboard! We've added you to the waitlist."
                    : "Welcome aboard! Let's get your account set up.",
                variant: "success",
            });
            form.reset();
            if (onSignup) onSignup(data.email);
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
            {/* 3D Abstract Shapes Elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -z-10" />

            {/* Decorative Floating SVG Elements (Snow/Ice Cubes) */}
            <div className="absolute top-40 left-[10%] animate-float hidden lg:block opacity-20">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="20" y="20" width="40" height="40" rx="8" fill="#2160FF" />
                    <rect x="10" y="10" width="40" height="40" rx="8" stroke="#2160FF" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
            </div>
            <div className="absolute bottom-40 right-[10%] animate-float-delayed hidden lg:block opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="20" fill="#2160FF" opacity="0.6" />
                    <circle cx="40" cy="40" r="10" stroke="#2160FF" strokeWidth="2" />
                </svg>
            </div>

            <div className="container-tight text-center relative z-10">
                {/* Stage Badge */}
                {isWaitlist && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-caption font-semibold mb-8 animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-soft" />
                        Join the 2026 Waitlist
                    </div>
                )}

                {/* Headline */}
                <h1 className="text-display-lg md:text-display-xl font-heading font-extrabold text-neutral tracking-tight mb-6 animate-fade-in leading-tight">
                    {isWaitlist ? (
                        <>
                            The Future of Snow <br className="hidden md:block" />
                            <span className="text-brand">Management</span> is Here.
                        </>
                    ) : (
                        <>
                            Automate Your Snow <br className="hidden md:block" />
                            <span className="text-brand">Operations</span> Today.
                        </>
                    )}
                </h1>

                {/* Subtext */}
                <p className="text-body-lg text-neutral-body max-w-2xl mx-auto mb-12 animate-fade-in-up md:px-8">
                    {isWaitlist
                        ? "Join the elite group of snow contractors using data-driven certainty to run their operations. Sign up for early access."
                        : "Automated monitoring. Seamless contractor alerts. Reliable thresholds. Everything you need to manage snow contracts with precision."}
                </p>

                {/* Signup Form */}
                <div id="signup" className="max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="relative group">
                        <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-white border border-neutral-border rounded-2xl shadow-soft hover:shadow-card hover:border-neutral-muted/30 transition-all duration-300">
                            <Input
                                {...form.register("email")}
                                placeholder="Enter your work email"
                                className="border-none shadow-none focus-visible:ring-0 h-12"
                                type="email"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full sm:w-auto shrink-0"
                                isLoading={isLoading}
                            >
                                Get Started for Free
                            </Button>
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-caption text-red-500 mt-2 text-left px-4">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </form>
                    <p className="text-caption text-neutral-muted mt-4">
                        Start free. No credit card required.
                    </p>
                </div>
            </div>
        </section>
    );
}
