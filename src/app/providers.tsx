'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ToastProvider, useToast } from '@/store/toast';
import ToastContainer from '@/components/ui/Toast';

function ToastRenderer() {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} removeToast={removeToast} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        {children}
        <ToastRenderer />
      </ToastProvider>
    </QueryClientProvider>
  );
}
