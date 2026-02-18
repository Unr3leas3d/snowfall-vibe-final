"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ToastContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contractSchema = z.object({
    contractor_name: z.string().min(2, "Name must be at least 2 characters"),
    contractor_email: z.string().email("Invalid email address"),
    contractor_phone: z.string().optional(),
    location_postal_code: z.string().min(3, "Invalid postal code"),
    snowfall_threshold_cm: z.coerce.number().min(0.1, "Threshold must be positive"),
    monthly_price: z.coerce.number().min(0, "Price cannot be negative"),
});

type ContractFormValues = z.infer<typeof contractSchema>;

interface NewContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any; // Add this for edit mode
}

export function NewContractModal({ isOpen, onClose, onSuccess, initialData }: NewContractModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const supabase = createClient();

    const isEditMode = !!initialData;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContractFormValues>({
        resolver: zodResolver(contractSchema),
        defaultValues: initialData || {
            snowfall_threshold_cm: 5,
            monthly_price: 0,
        }
    });

    // Reset form when initialData changes or modal opens
    useEffect(() => {
        if (isOpen) {
            reset(initialData || {
                contractor_name: "",
                contractor_email: "",
                contractor_phone: "",
                location_postal_code: "",
                snowfall_threshold_cm: 5,
                monthly_price: 0,
            });
        }
    }, [initialData, isOpen, reset]);

    const onSubmit = async (values: ContractFormValues) => {
        setIsSubmitting(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            toast({
                title: "Authentication Error",
                description: "You must be logged in to manage contracts.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        let error;

        if (isEditMode) {
            const { error: updateError } = await supabase
                .from("contracts")
                .update(values)
                .eq("id", initialData.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("contracts")
                .insert({
                    ...values,
                    user_id: user.id,
                    is_active: true,
                });
            error = insertError;
        }

        if (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: isEditMode ? "Contract Updated" : "Contract Created",
                description: `${values.contractor_name} has been ${isEditMode ? "updated" : "added to your dashboard"}.`,
            });
            reset();
            onSuccess();
            onClose();
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] rounded-3xl overflow-hidden border-neutral-border p-0 bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="p-8 pb-0">
                        <DialogTitle className="text-display-xs font-bold text-neutral">
                            {isEditMode ? "Edit Snow Contract" : "New Snow Contract"}
                        </DialogTitle>
                        <p className="text-body-sm text-neutral-body mt-1">
                            {isEditMode
                                ? "Update monitoring details for this client location."
                                : "Set up threshold monitoring for a new client location."
                            }
                        </p>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-caption font-bold text-neutral">Client Name</label>
                                <Input
                                    {...register("contractor_name")}
                                    placeholder="e.g. Northern Plaza Mall"
                                    className={cn(errors.contractor_name && "border-red-500")}
                                />
                                {errors.contractor_name && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.contractor_name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-caption font-bold text-neutral">Client Email</label>
                                <Input
                                    {...register("contractor_email")}
                                    placeholder="alerts@client.com"
                                    className={cn(errors.contractor_email && "border-red-500")}
                                />
                                {errors.contractor_email && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.contractor_email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-caption font-bold text-neutral">Client Phone</label>
                                <Input
                                    {...register("contractor_phone")}
                                    placeholder="(555) 000-0000"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-caption font-bold text-neutral">Location (ZIP/Postal)</label>
                                <Input
                                    {...register("location_postal_code")}
                                    placeholder="e.g. 10001"
                                    className={cn(errors.location_postal_code && "border-red-500")}
                                />
                                {errors.location_postal_code && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.location_postal_code.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-caption font-bold text-neutral">Threshold (cm)</label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    {...register("snowfall_threshold_cm")}
                                    className={cn(errors.snowfall_threshold_cm && "border-red-500")}
                                />
                                {errors.snowfall_threshold_cm && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.snowfall_threshold_cm.message}</p>}
                            </div>

                            <div className="space-y-2 col-span-2">
                                <label className="text-caption font-bold text-neutral">Monthly Contract Price ($)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted">$</span>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...register("monthly_price")}
                                        className={cn("pl-7", errors.monthly_price && "border-red-500")}
                                    />
                                </div>
                                {errors.monthly_price && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.monthly_price.message}</p>}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-8 bg-neutral-bg/50 border-t border-neutral-border gap-3">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isSubmitting} className="shadow-lg shadow-brand/20">
                            {isEditMode ? "Update Contract" : "Create Contract"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Helper for class merging
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
