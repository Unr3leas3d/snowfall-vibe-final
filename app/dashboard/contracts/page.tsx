"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { ContractCard } from "@/components/dashboard/ContractCard";
import { NewContractModal } from "@/components/dashboard/NewContractModal";
import { ContractDetailView } from "@/components/dashboard/ContractDetailView";
import { useToast } from "@/components/ui/ToastContext";

export default function ContractsPage() {
    const [contracts, setContracts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContract, setSelectedContract] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const supabase = createClient();
    const { toast } = useToast();

    const fetchContracts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("contracts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            toast({
                title: "Error",
                description: "Failed to load contracts.",
                variant: "destructive",
            });
        } else {
            setContracts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    const filteredContracts = contracts.filter(c =>
        c.contractor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location_postal_code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted" />
                    <input
                        type="text"
                        placeholder="Search by client or zip code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-border focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all text-body-sm shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 hidden sm:flex">
                        <Filter size={18} />
                        Filter
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-lg shadow-brand/20">
                        <Plus size={18} />
                        New Contract
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <Loader2 size={40} className="text-brand animate-spin mb-4" />
                    <p className="text-neutral-body font-medium">Synchronizing data...</p>
                </div>
            ) : filteredContracts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-neutral-border p-12 text-center flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-neutral-bg flex items-center justify-center text-neutral-muted mb-6">
                        <Plus size={32} />
                    </div>
                    <h3 className="text-body-lg font-bold text-neutral mb-2">No contracts found</h3>
                    <p className="text-body-sm text-neutral-body max-w-sm mb-8">
                        {searchQuery ? `No results for "${searchQuery}". Try a different search term.` : "Add your first snow management contract to start monitoring thresholds."}
                    </p>
                    <Button onClick={() => setIsModalOpen(true)} variant="outline" className="border-brand text-brand hover:bg-brand/5">
                        <Plus size={18} className="mr-2" />
                        Create First Contract
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {filteredContracts.map((contract) => (
                        <ContractCard
                            key={contract.id}
                            contract={contract}
                            onClick={() => setSelectedContract(contract)}
                        />
                    ))}
                </div>
            )}

            <NewContractModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchContracts}
            />

            {selectedContract && (
                <ContractDetailView
                    contract={selectedContract}
                    isOpen={!!selectedContract}
                    onClose={() => setSelectedContract(null)}
                    onUpdate={fetchContracts}
                />
            )}
        </div>
    );
}
