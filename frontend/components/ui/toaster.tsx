"use client";

import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-96">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border p-4 shadow-lg animate-in slide-in-from-right ${
            toast.variant === "destructive"
              ? "bg-red-50 border-red-200 text-red-900"
              : toast.variant === "success"
              ? "bg-green-50 border-green-200 text-green-900"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              {toast.title && (
                <div className="font-semibold mb-1">{toast.title}</div>
              )}
              {toast.description && (
                <div className="text-sm opacity-90">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
