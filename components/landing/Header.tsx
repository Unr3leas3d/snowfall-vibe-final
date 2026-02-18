"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Snowflake, Menu, X, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/auth/actions";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();
    const isWaitlist = pathname === "/";
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, [supabase]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "glass h-20 shadow-soft" : "bg-transparent h-24"
            )}
        >
            <div className="container-wide h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-brand rounded-lg p-1.5 transition-transform group-hover:rotate-12">
                        <Snowflake className="text-white w-6 h-6" />
                    </div>
                    <span className="font-heading text-heading-sm font-bold tracking-tight text-neutral">
                        Snowfall
                    </span>
                </Link>

                {/* Desktop Navigation */}
                {!isWaitlist && (
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/home#features"
                            className="text-body-sm font-medium text-neutral-body hover:text-brand transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/home#pricing"
                            className="text-body-sm font-medium text-neutral-body hover:text-brand transition-colors"
                        >
                            Pricing
                        </Link>
                        <div className="h-4 w-px bg-neutral-border mx-2" />
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-body-sm font-medium text-neutral-body hover:text-brand transition-colors flex items-center gap-2"
                                >
                                    <User size={16} className="text-brand" />
                                    Dashboard
                                </Link>
                                <form action={signOut}>
                                    <button
                                        type="submit"
                                        className="text-body-sm font-medium text-neutral-body hover:text-brand transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-body-sm font-medium text-neutral-body hover:text-brand transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Button size="sm" asChild>
                                    <Link href="/signup">Get Started for Free</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                )}

                {/* Mobile Toggle */}
                {!isWaitlist && (
                    <button
                        className="md:hidden text-neutral p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 top-20 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="container-tight py-8 flex flex-col gap-6">
                    <Link
                        href="/#features"
                        className="text-heading-sm font-heading font-semibold text-neutral"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        href="/#pricing"
                        className="text-heading-sm font-heading font-semibold text-neutral"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Pricing
                    </Link>
                    <hr className="border-neutral-border" />
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-heading-sm font-heading font-semibold text-neutral flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <User size={20} className="text-brand" />
                                Dashboard
                            </Link>
                            <form action={signOut}>
                                <button
                                    type="submit"
                                    className="text-heading-sm font-heading font-semibold text-neutral text-left w-full"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-heading-sm font-heading font-semibold text-neutral"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Button size="lg" className="w-full" asChild>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    Get Started for Free
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
