"use client";

import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { SolutionHighlight } from "@/components/landing/SolutionHighlight";
import { PricingCards } from "@/components/landing/PricingCards";
import { Footer } from "@/components/landing/Footer";
import { ToastProviderWrapper } from "@/components/ui/ToastContext";

export default function HomePage() {
    return (
        <ToastProviderWrapper>
            <Header />
            <main>
                <Hero />
                <FeatureGrid />
                <SolutionHighlight />
                <PricingCards />
            </main>
            <Footer />
        </ToastProviderWrapper>
    );
}
