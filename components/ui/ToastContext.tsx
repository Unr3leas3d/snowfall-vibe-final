"use client";

import * as React from "react";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    type ToastProps
} from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface ToastContextType {
    toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" | "success" }) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProviderWrapper({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<{ id: string; title?: string; description?: string; variant?: "default" | "destructive" | "success" }[]>([]);

    const toast = React.useCallback(({ title, description, variant = "default" }: { title?: string; description?: string; variant?: "default" | "destructive" | "success" }) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, title, description, variant }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            <ToastProvider>
                {children}
                {toasts.map(({ id, title, description, variant }) => (
                    <Toast
                        key={id}
                        onOpenChange={(open) => !open && removeToast(id)}
                        className={cn(
                            variant === "success" && "border-green-100 bg-green-50 text-green-900",
                            variant === "destructive" && "border-red-100 bg-red-50 text-red-900"
                        )}
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
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProviderWrapper");
    }
    return context;
}
