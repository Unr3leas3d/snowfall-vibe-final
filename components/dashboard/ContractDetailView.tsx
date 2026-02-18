"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    Clock,
    Snowflake,
    Calendar,
    DollarSign,
    MapPin,
    TrendingUp,
    Trash2,
    X,
    TrendingDown,
    Activity,
    Pencil
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ToastContext";
import { cn } from "@/lib/utils";
import { NewContractModal } from "./NewContractModal";

interface ContractDetailViewProps {
    contract: any;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export function ContractDetailView({ contract, isOpen, onClose, onUpdate }: ContractDetailViewProps) {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [timeframe, setTimeframe] = useState<'6m' | 'all'>('6m');
    const { toast } = useToast();
    const supabase = createClient();

    // Mock aggregate data for now
    const aggregateSnow = timeframe === '6m' ? 12.4 : 45.8;

    useEffect(() => {
        if (isOpen && contract) {
            // Fetch notification logs (snow events)
            const fetchEvents = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from("notifications_log")
                    .select("*")
                    .eq("contract_id", contract.id)
                    .order("sent_at", { ascending: false });

                if (!error) {
                    setEvents(data || []);
                }
                setLoading(false);
            };
            fetchEvents();
        }
    }, [isOpen, contract]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this contract? This action cannot be undone.")) return;

        const { error } = await supabase
            .from("contracts")
            .delete()
            .eq("id", contract.id);

        if (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Deleted", description: "Contract has been removed." });
            onUpdate();
            onClose();
        }
    };

    const handleToggleStatus = async () => {
        const newStatus = !contract.is_active;
        const { error } = await supabase
            .from("contracts")
            .update({ is_active: newStatus })
            .eq("id", contract.id);

        if (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
            toast({
                title: newStatus ? "Monitoring Resumed" : "Monitoring Paused",
                description: `Contract for ${contract.contractor_name} is now ${newStatus ? 'active' : 'paused'}.`
            });
            onUpdate();
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-xl p-0 border-l border-neutral-border bg-white flex flex-col h-full outline-none shadow-2xl">
                <div className={cn(
                    "absolute left-0 top-0 w-1 h-full transition-colors duration-500",
                    contract.is_active ? "bg-brand" : "bg-neutral-muted"
                )} />

                {/* Header Actions */}
                <div className="p-8 border-b border-neutral-border space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "mb-2",
                                    contract.is_active
                                        ? "text-brand border-brand/20 bg-brand/5"
                                        : "text-neutral-muted border-neutral-border bg-neutral-bg"
                                )}
                            >
                                {contract.is_active ? "Contract Active" : "Monitoring Paused"}
                            </Badge>
                            <SheetTitle className="text-display-xs font-bold text-neutral leading-tight">
                                {contract.contractor_name}
                            </SheetTitle>
                            <div className="flex items-center gap-2 text-neutral-body text-body-sm py-1">
                                <MapPin size={14} className="text-neutral-muted" />
                                {contract.location_postal_code}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-4 rounded-2xl bg-neutral-bg border border-neutral-border">
                            <p className="text-[10px] font-bold text-neutral-muted uppercase tracking-wider mb-1">Threshold</p>
                            <p className="text-body-lg font-bold text-neutral">{contract.snowfall_threshold_cm} cm</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-neutral-bg border border-neutral-border">
                            <p className="text-[10px] font-bold text-neutral-muted uppercase tracking-wider mb-1">Monthly Price</p>
                            <p className="text-body-lg font-bold text-neutral">${contract.monthly_price || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Minimized */}
                <div className="flex-1 p-8 overflow-y-auto space-y-8 flex flex-col items-center justify-center text-center opacity-50">
                    <div className="p-10 rounded-full bg-neutral-bg border-2 border-dashed border-neutral-border/50 text-neutral-muted mb-4">
                        <Snowflake size={48} className={cn(!contract.is_active && "text-neutral-muted/50")} />
                    </div>
                    <p className="text-body-sm font-medium text-neutral-body max-w-xs">
                        {contract.is_active
                            ? "All activity for this location is being monitored in real-time."
                            : "Monitoring is currently paused. No alerts will be sent for this location."
                        }
                    </p>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-neutral-border bg-neutral-bg/50 mt-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                onClick={handleDelete}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 border border-transparent hover:border-red-100 px-3"
                            >
                                <Trash2 size={16} />
                                <span className="hidden sm:inline">Delete</span>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditModalOpen(true)}
                                className="gap-2 border-neutral-border text-neutral hover:bg-white px-3"
                            >
                                <Pencil size={16} />
                                <span className="hidden sm:inline">Edit</span>
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleToggleStatus}
                            className={cn(
                                "gap-2 shadow-sm font-bold",
                                contract.is_active
                                    ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                                    : "border-brand/20 text-brand hover:bg-brand/5"
                            )}
                        >
                            {contract.is_active ? <Clock size={16} /> : <Activity size={16} />}
                            {contract.is_active ? "Pause Monitoring" : "Resume Monitoring"}
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full gap-2 text-neutral-body hover:text-neutral hover:bg-neutral-bg"
                        onClick={() => toast({
                            title: "Coming Soon",
                            description: "Forecast projections and historical charts are currently in development for the Pro version.",
                        })}
                    >
                        <Activity size={16} />
                        View Full Forecast
                    </Button>
                </div>
            </SheetContent>

            <NewContractModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={() => {
                    onUpdate();
                    onClose(); // Close detail view after success to reflect changes
                }}
                initialData={contract}
            />
        </Sheet>
    );
}
