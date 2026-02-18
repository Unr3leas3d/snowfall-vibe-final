"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
    "/dashboard": "Overview",
    "/dashboard/contracts": "Snow Management Contracts",
    "/dashboard/notifications": "Notifications",
    "/dashboard/settings": "Account Settings",
};

export function DashboardHeader({ user }: { user: any }) {
    const pathname = usePathname();
    const title = pageTitles[pathname] || "Dashboard";

    return (
        <header className="h-16 border-b border-neutral-border bg-white/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6 md:px-8">
            <div className="flex-1 max-w-xl">
                {/* Search - moved to center-left */}
                <div className="relative items-center">
                    <Search size={16} className="absolute left-3 text-neutral-muted" />
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        className="pl-9 pr-4 py-2 rounded-2xl bg-neutral-bg border border-neutral-border text-body-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all w-full"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-6 w-px bg-neutral-border mx-2 hidden md:block" />

                <button className="relative p-2 text-neutral-body hover:bg-neutral-bg rounded-lg transition-colors group">
                    <Bell size={20} className="group-hover:scale-110 transition-transform" />
                    {/* Notification Dot */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-white" />
                </button>
            </div>
        </header>
    );
}
