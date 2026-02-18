"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Snowflake } from "lucide-react";
import { login } from "@/app/auth/actions";
import { useState } from "react";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        await login(formData);
        setIsLoading(false);
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
                        <CardTitle className="text-heading font-bold text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center text-neutral-body">
                            Enter your credentials to access your account
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
                                <div className="flex items-center justify-between">
                                    <label className="text-caption font-semibold text-neutral">Password</label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-caption text-brand hover:underline font-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    className="h-12"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pb-8">
                            <Button type="submit" className="w-full h-12" isLoading={isLoading}>
                                Sign In
                            </Button>
                            <p className="text-caption text-neutral-muted text-center">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="text-brand hover:underline font-semibold">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
