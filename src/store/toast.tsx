'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import type { AlertVariant } from '@/components/ui/Alert';

export interface ToastItem {
  id: string;
  message: string;
  variant?: AlertVariant;
  duration?: number;
  title?: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (message: string, options?: { variant?: AlertVariant; duration?: number; title?: string }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;
function generateId() {
  return `toast-${Date.now()}-${++toastCounter}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, options?: { variant?: AlertVariant; duration?: number; title?: string }) => {
      const id = generateId();
      const duration = options?.duration ?? 4000;
      const item: ToastItem = {
        id,
        message,
        variant: options?.variant ?? 'success',
        duration,
        title: options?.title,
      };
      setToasts((prev) => [...prev, item]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
