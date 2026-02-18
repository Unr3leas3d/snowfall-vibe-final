"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Snowflake, CheckCircle2 } from "lucide-react";
import { signup } from "@/app/auth/actions";
import { useState } from "react";

export default function SignupPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        await signup(formData);
        setIsLoading(false);
    }

    if (message) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-bg px-4 py-12">
                <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
                    <div className="bg-white p-8 rounded-3xl border border-neutral-border shadow-elevated space-y-6">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-heading font-bold text-neutral">Verify your email</h2>
                        <p className="text-body text-neutral-body">
                            {message}
                        </p>
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/login">Back to Sign In</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-bg px-4 py-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand" />

            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="bg-brand rounded-lg p-1.5 transition-transform group-hover:rotate-12">
                            <Snowflake className="text-white w-6 h-6" />
                        </div>
                        <span className="font-heading text-heading-sm font-bold tracking-tight text-neutral">
                            Snowfall
                        </span>
                    </Link>
                </div>

                <Card className="border-neutral-border shadow-elevated animate-fade-in-up">
                    <CardHeader className="space-y-1 pt-8 pb-6">
                        <CardTitle className="text-heading font-bold text-center">Create account</CardTitle>
                        <CardDescription className="text-center text-neutral-body">
                            Start managing your snow contracts today
                        </CardDescription>
                    </CardHeader>
                    <form action={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-caption text-red-600">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-caption font-semibold text-neutral">Email</label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-caption font-semibold text-neutral">Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="At least 6 characters"
                                    required
                                    minLength={6}
                                    className="h-12"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pb-8">
                            <Button type="submit" className="w-full h-12" isLoading={isLoading}>
                                Get Started Free
                            </Button>
                            <p className="text-caption text-neutral-muted text-center">
                                Already have an account?{" "}
                                <Link href="/login" className="text-brand hover:underline font-semibold">
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
