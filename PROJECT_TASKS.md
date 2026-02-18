# Phase 1: Project Foundation & Setup

## 1.1: Initialize Next.js Project
- [x] Next.js 15 initialized with TypeScript + Tailwind + App Router
- [x] TypeScript strict mode enabled
- [x] Core deps installed: `@supabase/supabase-js`, `@supabase/ssr`
- [x] Form libs installed: `react-hook-form`, `zod`, `@hookform/resolvers`
- [x] UI utilities installed: `clsx`, `tailwind-merge`, `lucide-react`
- [x] Radix UI installed: dialog, dropdown-menu, select, toast, slot

## 1.2: Configure Tailwind for Nexaris Theme
- [x] Custom Nexaris color palette (brand blues, neutrals)
- [x] Inter + Plus Jakarta Sans fonts via `next/font`
- [x] Font weights configured (400-800)
- [x] Backdrop-blur utilities for glassmorphism
- [x] Custom animations (fade-in, float, pulse-soft)
- [x] Custom shadows (soft, card, elevated, glass)

## 1.3: Project Structure
- [x] Directory structure created (components/ui, landing, dashboard, lib/supabase, hooks, types)
- [x] `.env.example` with all placeholders
- [ ] Suppress known lint warnings in `globals.css`

## Phase 4.7: Landing Page Bifurcation
- [x] Refactor `Header` and `Hero` for multi-mode support
- [x] Convert `/` to minimal Waitlist page
- [x] Create `/home` as full Product page
- [x] Verify both experiences in browser
- [x] Remove footer from Waitlist page
- [x] `.env.local` in `.gitignore`
- [x] `globals.css` with base styles, glass component, utilities
- [x] `lib/utils.ts` with `cn()` helper
- [x] `types/database.ts` with full schema types
- [x] `lib/subscriptions/constants.ts` with plan definitions

## 1.4: Core UI Components
- [x] `components/ui/Button.tsx` — Primary/secondary/outline/ghost variants
- [x] `components/ui/Input.tsx` — With validation states and labels
- [x] `components/ui/Card.tsx` — Subtle borders, white background

## 1.5: Supabase Client Setup
- [x] `lib/supabase/client.ts` — Browser client
- [x] `lib/supabase/server.ts` — Server client (cookies)
- [x] `lib/supabase/middleware.ts` — Auth middleware

## 1.6: Subscription Helpers
- [x] `lib/subscriptions/helpers.ts` — getUserSubscription, canCreateContract, getContractLimit

## 1.7: Verification
- [x] npm run build (completed locally with EPERM note)
- [x] TypeScript compiles (completed locally with EPERM note)
- [x] Foundation files created

---

# Phase 2: Supabase Setup & Database Schema

## 2.1: Supabase Project Setup
- [x] Connect/Create Supabase project (`xgfcupevjxgtniskyoky`)
- [x] Configure `.env.local` with credentials
- [x] Enable Email Auth

## 2.2: Database Migrations
- [x] Create `001_initial_schema.sql`
- [x] Tables: email_signups, subscriptions, contracts, notifications_log
- [x] Enable RLS & Add Policies

## 2.3: Verification
- [x] Apply migrations
- [x] Verify table structure
- [x] RLS policies ready

---

# Phase 3: Landing Page (Nexaris Style)

## 3.1: Layout & Navigation
- [x] Sticky glassmorphic Header
- [x] Responsive Navigation
- [x] Footer with Nexaris styling

## 3.2: Hero & Features
- [x] Hero Section with 3D snow/ice shapes
- [x] Alternating 50/50 Feature Grid
- [x] Blue Highlight Benefit Section

## 3.3: Pricing & Signup
- [x] Pricing Cards (Free/Pro/Enterprise)
- [x] Zod validation & Success/Error Toast
- [x] Browser Verification (UI & Functional Audit)
- [x] Fix hydration mismatch in `RootLayout` bug
- [x] Fixed notification context bug

---

# Phase 4: Authentication & Subscriptions

## 4.1: Landing Page Fixes
- [x] Update "2025" to "2026" in Hero
- [x] Optimize section IDs and smooth scroll behavior
- [x] Update Header/Footer links for reliability

## 4.2: Authentication Flow
- [x] Create Nexaris-style Login Page
- [x] Create Account Creation Page
- [x] Implement Server Actions for Auth (Sign In/Out/Up)
- [x] Configure Auth Middleware redirects

## 4.3: Automatic Onboarding
- [ ] Verify subscription limits logic for new users
- [x] Create automatic onboarding trigger
- [x] Inject test account (`test@example.com`)

## 4.5: UI/UX Refinement
- [x] Update all pricing buttons to point to `/signup`
- [x] Fix "Get Started for Free" button visibility and link
- [x] Final polishing of landing page links

---

# Phase 5: Dashboard & Contract Management

## 5.1: Dashboard Foundation
- [x] Create `app/dashboard/layout.tsx` with sidebar navigation
- [x] Implement `DashboardHeader.tsx` with breadcrumbs and user menu
- [x] Build `DashboardOverview.tsx` (Empty state vs. Stats cards)

## 5.2: Contract Management
- [x] Create `app/dashboard/contracts/page.tsx` (List view)
- [x] Build `ContractCard.tsx` (Ultra-minimal summary with risk status)
- [x] Build `ContractDetailView.tsx` (Slide-over with granular event logs)
- [x] Implement event aggregation logic (Total snowfall in X months)
- [x] Add monthly pricing display in detail view
- [x] Implement `NewContractModal.tsx` with dynamic units (in/cm)

## 5.3: Data Integration & RLS
- [ ] Verify `contracts` table RLS for user-only access
- [ ] Fetch and display real data from Supabase
- [ ] Implement contract deletion and status updates

## 5.4: Verification
- [ ] Browser test: Navigate from Login -> Dashboard
- [ ] Functional test: Create a contract and see it appear in the list
- [ ] Edge case: Test subscription limits (Free plan max 1 contract)

## 5.5: Dashboard Polish & Fixes (Post-Testing)
- [x] Refactor `DashboardHeader.tsx` to remove titles/breadcrumbs
- [x] Update `DashboardOverview` to fetch real contract counts
- [x] Remove redundant CTA in dashboard empty state
- [x] Clean up `ContractDetailView.tsx` (Remove manual X, logs, and accumulation)
- [x] Implement/Placeholder "View full forecast" behavior

## 5.6: Contract CRUD Fixes & Edit Flow
- [x] Refactor `NewContractModal.tsx` to support Edit mode
- [x] Add "Edit" trigger to `ContractDetailView.tsx`
- [x] Verify Delete functionality and robust error handling
- [x] Final verification of full CRUD cycle

## 5.7: Status Toggles & Dashboard Copy Polish
- [x] Implement `is_active` toggle in `ContractDetailView.tsx`
- [x] Update `ContractCard.tsx` for inactive state styling
- [x] Refine `DashboardOverview` (app/dashboard/page.tsx) copy
- [x] Final verification of status logic and UI

## Phase 6: GitHub Deployment
- [x] Initialize local git repository
- [x] Create GitHub repository
- [x] Push local changes to remote
