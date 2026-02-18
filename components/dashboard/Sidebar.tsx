"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Bell,
    Snowflake,
    LogOut,
    ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Contracts", icon: FileText, href: "/dashboard/contracts" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "relative h-full bg-white border-r border-neutral-border flex flex-col transition-all duration-300 ease-in-out group",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center px-6 border-b border-neutral-border overflow-hidden">
                <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white">
                        <Snowflake size={20} strokeWidth={2.5} />
                    </div>
                    {!isCollapsed && (
                        <span className="font-heading font-bold text-lg tracking-tight text-neutral">
                            Snowfall
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation items */}
            <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/nav",
                                isActive
                                    ? "bg-brand/5 text-brand shadow-sm shadow-brand/5"
                                    : "text-neutral-body hover:bg-neutral-bg hover:text-neutral"
                            )}
                        >
                            <Icon
                                size={20}
                                className={cn(
                                    "shrink-0 transition-transform duration-200 group-hover/nav:scale-110",
                                    isActive ? "text-brand" : "text-neutral-muted"
                                )}
                            />
                            {!isCollapsed && (
                                <span className={cn(
                                    "text-body-sm font-semibold tracking-tight",
                                    isActive ? "text-brand" : "text-neutral-body"
                                )}>
                                    {item.label}
                                </span>
                            )}
                            {isActive && !isCollapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-neutral-border flex items-center justify-center text-neutral-muted hover:text-brand hover:border-brand transition-colors z-10 shadow-sm"
            >
                <ChevronLeft size={14} className={cn("transition-transform duration-300", isCollapsed && "rotate-180")} />
            </button>

            {/* User Footer */}
            <div className="p-4 border-t border-neutral-border mt-auto">
                {!isCollapsed ? (
                    <div className="flex items-center gap-3 px-2 py-3 bg-neutral-bg rounded-xl border border-neutral-border/50">
                        <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs shrink-0">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-caption font-bold text-neutral truncate">
                                {user?.email?.split('@')[0]}
                            </p>
                            <p className="text-[10px] text-neutral-muted font-medium truncate">
                                Free Plan
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
