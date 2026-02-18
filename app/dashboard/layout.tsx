import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ToastProviderWrapper } from "@/components/ui/ToastContext";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    return (
        <ToastProviderWrapper>
            <div className="flex h-screen bg-neutral-bg overflow-hidden font-body">
                {/* Sidebar Navigation */}
                <Sidebar user={user} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                    <DashboardHeader user={user} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="max-w-7xl mx-auto animate-fade-in">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </ToastProviderWrapper>
    );
}
