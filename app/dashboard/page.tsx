import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, FileText, Activity, AlertTriangle, Snowflake } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
    const supabase = await createClient();

    const { count: totalCount } = await supabase
        .from('contracts')
        .select('*', { count: 'exact', head: true });

    const { count: activeCount } = await supabase
        .from('contracts')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

    return (
        <div className="space-y-8 pb-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-display-sm font-bold text-neutral mb-1">
                        Monitoring Active.
                    </h2>
                    <p className="text-body-sm text-neutral-body font-medium">
                        Real-time snowfall threshold surveillance for {activeCount || 0} locations.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/contracts" className="flex items-center gap-2">
                        <Plus size={18} />
                        Add Contract
                    </Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col gap-4 border-brand/10 bg-brand/5">
                    <div className="p-2 w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/20">
                        <FileText size={20} />
                    </div>
                    <div>
                        <p className="text-caption font-bold text-neutral-muted uppercase tracking-wider mb-1">Active Contracts</p>
                        <p className="text-display-xs font-bold text-neutral">{totalCount || 0}</p>
                    </div>
                </Card>

                <Card className="p-5 flex flex-col gap-4">
                    <div className="p-2 w-10 h-10 rounded-xl bg-neutral-bg text-neutral-body flex items-center justify-center border border-neutral-border">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-caption font-bold text-neutral-muted uppercase tracking-wider mb-1">At Risk</p>
                        <p className="text-display-xs font-bold text-neutral text-amber-500">0</p>
                    </div>
                </Card>

                <Card className="p-5 flex flex-col gap-4">
                    <div className="p-2 w-10 h-10 rounded-xl bg-neutral-bg text-neutral-body flex items-center justify-center border border-neutral-border">
                        <Activity size={20} />
                    </div>
                    <div>
                        <p className="text-caption font-bold text-neutral-muted uppercase tracking-wider mb-1">Season Average</p>
                        <p className="text-display-xs font-bold text-neutral">0.0 cm</p>
                    </div>
                </Card>

                <Card className="p-5 flex flex-col gap-4">
                    <div className="p-2 w-10 h-10 rounded-xl bg-neutral-bg text-neutral-body flex items-center justify-center border border-neutral-border">
                        <Snowflake size={20} />
                    </div>
                    <div>
                        <p className="text-caption font-bold text-neutral-muted uppercase tracking-wider mb-1">Next Event</p>
                        <p className="text-display-xs font-bold text-neutral">None</p>
                    </div>
                </Card>
            </div>

            {/* Main Action Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-8 flex flex-col items-center justify-center text-center min-h-[400px] border-dashed border-2 border-neutral-border/50 bg-transparent">
                    <div className="w-16 h-16 rounded-full bg-neutral-bg border border-neutral-border flex items-center justify-center text-neutral-muted mb-6">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-body-lg font-bold text-neutral mb-2">
                        {totalCount && totalCount > 0 ? "Contracts Active" : "No active contracts found"}
                    </h3>
                    <p className="text-body-sm text-neutral-body max-w-sm mb-0">
                        {totalCount && totalCount > 0
                            ? "Navigate to the contracts tab to manage your locations and monitor status."
                            : "Add your first snow management contract to start monitoring thresholds and receiving automated alerts."
                        }
                    </p>
                </Card>

                <div className="space-y-6">
                    <Card className="p-6">
                        <h4 className="text-body-md font-bold text-neutral mb-4">Upcoming Forecast</h4>
                        <div className="space-y-4">
                            <p className="text-body-xs text-neutral-body italic">
                                No significant snow events forecasted for the next 48 hours.
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-brand text-white overflow-hidden relative">
                        {/* Decorative snowflake */}
                        <Snowflake size={120} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" />

                        <div className="relative z-10">
                            <h4 className="text-body-md font-bold mb-2">Pro Feature Tip</h4>
                            <p className="text-white/80 text-body-xs mb-4">
                                Upgrade to Pro to unlock SMS alerts and historical snowfall CSV reports.
                            </p>
                            <Button size="sm" className="bg-white text-brand hover:bg-neutral-bg border-none" asChild>
                                <Link href="/dashboard/settings">Upgrade Plan</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
