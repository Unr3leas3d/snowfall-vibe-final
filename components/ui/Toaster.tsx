"use client";

import * as React from "react";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface ToasterProps {
    toasts: {
        id: string;
        title?: string;
        description?: string;
        variant?: "default" | "destructive" | "success";
    }[];
    removeToast: (id: string) => void;
}

export function Toaster({ toasts, removeToast }: ToasterProps) {
    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, variant, ...props }) => (
                <Toast
                    key={id}
                    onOpenChange={(open: boolean) => !open && removeToast(id)}
                    className={cn(
                        variant === "success" && "border-green-100 bg-green-50 text-green-900",
                        variant === "destructive" && "border-red-100 bg-red-50 text-red-900"
                    )}
                    {...props}
                >
                    <div className="grid gap-1">
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && (
                            <ToastDescription>{description}</ToastDescription>
                        )}
                    </div>
                    <ToastClose />
                </Toast>
            ))}
            <ToastViewport />
        </ToastProvider>
    );
}

// Helper hook for toasts since we are implementing manually
export function useToaster() {
    const [toasts, setToasts] = React.useState<ToasterProps["toasts"]>([]);

    const toast = React.useCallback(({ title, description, variant = "default" }: Omit<ToasterProps["toasts"][number], "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, title, description, variant }]);

        // Auto remove after 5s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, toast, removeToast };
}
