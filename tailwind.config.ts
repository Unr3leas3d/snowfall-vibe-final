import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            /* ─── Nexaris-Inspired Color Palette ────────────────────────── */
            colors: {
                // Primary brand colors
                brand: {
                    DEFAULT: "#2160FF",     // Impact Blue - primary CTA, links
                    hover: "#1A4FD1",       // Hover state for Impact Blue
                    light: "#E8EFFF",       // Light blue tint for backgrounds
                    50: "#EFF4FF",
                    100: "#DBE6FF",
                    200: "#BFCFFF",
                    300: "#93ADFF",
                    400: "#6080FF",
                    500: "#2160FF",
                    600: "#1A4FD1",
                    700: "#153FA6",
                    800: "#12337F",
                    900: "#0E2660",
                },
                // Neutral palette
                neutral: {
                    DEFAULT: "#0A0A0A",     // Near Black - headings, primary text
                    body: "#4B5563",        // Body Gray - paragraph text
                    muted: "#6B7280",       // Muted text
                    border: "#E5E7EB",      // Subtle borders
                    bg: "#F9FAFB",          // Off-white background
                    card: "#FFFFFF",        // Card background
                },
            },

            /* ─── Typography ───────────────────────────────────────────── */
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                heading: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
            },
            fontSize: {
                // Custom sizes matching Nexaris scale
                "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
                "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
                "display": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
                "heading-lg": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
                "heading": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
                "heading-sm": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
                "body-lg": ["1.25rem", { lineHeight: "1.6" }],
                "body": ["1rem", { lineHeight: "1.6" }],
                "body-sm": ["0.875rem", { lineHeight: "1.5" }],
                "caption": ["0.75rem", { lineHeight: "1.4" }],
            },

            /* ─── Spacing & Layout ─────────────────────────────────────── */
            spacing: {
                "18": "4.5rem",
                "22": "5.5rem",
                "30": "7.5rem",
                "34": "8.5rem",
                "38": "9.5rem",
            },
            maxWidth: {
                "8xl": "88rem",
            },

            /* ─── Border Radius ────────────────────────────────────────── */
            borderRadius: {
                "xl": "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
            },

            /* ─── Shadows ──────────────────────────────────────────────── */
            boxShadow: {
                "soft": "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
                "card": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)",
                "elevated": "0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)",
                "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
            },

            /* ─── Glassmorphism Backdrop ───────────────────────────────── */
            backdropBlur: {
                "xs": "2px",
                "glass": "12px",
            },

            /* ─── Animations ───────────────────────────────────────────── */
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(8px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-soft": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.7" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-out forwards",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                "slide-in-right": "slide-in-right 0.5s ease-out forwards",
                "float": "float 6s ease-in-out infinite",
                "pulse-soft": "pulse-soft 3s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;
