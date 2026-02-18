"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Snowflake, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContractCardProps {
    contract: any;
    onClick: () => void;
}

export function ContractCard({ contract, onClick }: ContractCardProps) {
    // Mock risk status for now - will be dynamic later
    const riskStatus: 'none' | 'amber' | 'red' = 'none';

    return (
        <Card
            onClick={onClick}
            className={cn(
                "group cursor-pointer p-6 transition-all duration-300 hover:shadow-elevated border-l-4",
                riskStatus === 'red' ? "border-l-red-500 bg-red-50/30" :
                    riskStatus === 'amber' ? "border-l-amber-500 bg-amber-50/30" :
                        "border-l-transparent hover:border-l-brand",
                !contract.is_active && "opacity-60 grayscale-[0.2] bg-neutral-bg/50 border-neutral-border"
            )}
        >
            <div className="flex flex-col h-full gap-4">
                <div className="flex justify-between items-start">
                    <h3 className={cn(
                        "text-body-md font-bold transition-colors truncate pr-4",
                        contract.is_active ? "text-neutral group-hover:text-brand" : "text-neutral-muted"
                    )}>
                        {contract.contractor_name}
                    </h3>
                    <Badge variant="outline" className={cn(
                        "backdrop-blur-sm shrink-0",
                        contract.is_active ? "bg-white/50" : "bg-neutral-bg/50 text-neutral-muted"
                    )}>
                        {contract.snowfall_threshold_cm}cm
                    </Badge>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-neutral-muted">
                        <MapPin size={14} className="shrink-0" />
                        <span className="text-caption font-medium truncate">
                            {contract.location_postal_code}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-border/50">
                        <div className="flex items-center gap-1.5">
                            {contract.is_active ? (
                                <>
                                    <Snowflake size={14} className="text-brand/50" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand">Active</span>
                                </>
                            ) : (
                                <>
                                    <Calendar size={14} className="text-neutral-muted" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted">Paused</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-body">
                            <DollarSign size={14} className={cn(contract.is_active ? "text-green-500/50" : "text-neutral-muted/50")} />
                            <span className={cn("text-body-sm font-bold", contract.is_active ? "text-neutral" : "text-neutral-muted")}>
                                ${contract.monthly_price || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
