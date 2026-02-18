import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
    weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Snowfall — Automated Snow Contract Management",
    description:
        "Monitor snowfall forecasts and automate contractor notifications. Real-time weather tracking, configurable thresholds, and seamless communication — all in one platform.",
    keywords: [
        "snow management",
        "snow removal",
        "contractor notifications",
        "weather monitoring",
        "snow contract",
        "automated alerts",
    ],
    openGraph: {
        title: "Snowfall — Automated Snow Contract Management",
        description:
            "Monitor snowfall forecasts and automate contractor notifications. Start free.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
            <body suppressHydrationWarning={true} className="min-h-screen bg-white">{children}</body>
        </html>
    );
}
