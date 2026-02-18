"use client";

import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ToastProviderWrapper } from "@/components/ui/ToastContext";

export default function Home() {
    return (
        <ToastProviderWrapper>
            <Header />
            <main>
                <Hero />
            </main>
        </ToastProviderWrapper>
    );
}
