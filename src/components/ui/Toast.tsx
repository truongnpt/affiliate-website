'use client';

import React, { useEffect, useState } from 'react';
import type { ToastItem } from '@/store/toast';
import type { AlertVariant } from './Alert';

const variantStyles: Record<
  AlertVariant,
  { bg: string; border: string; text: string; icon: string; progress: string }
> = {
  success: {
    bg: 'bg-white',
    border: 'border-l-emerald-500',
    text: 'text-emerald-800',
    icon: 'text-emerald-500',
    progress: 'bg-emerald-500',
  },
  error: {
    bg: 'bg-white',
    border: 'border-l-red-500',
    text: 'text-red-800',
    icon: 'text-red-500',
    progress: 'bg-red-500',
  },
  warning: {
    bg: 'bg-white',
    border: 'border-l-amber-500',
    text: 'text-amber-800',
    icon: 'text-amber-500',
    progress: 'bg-amber-500',
  },
  info: {
    bg: 'bg-white',
    border: 'border-l-primary',
    text: 'text-body-text',
    icon: 'text-primary',
    progress: 'bg-primary',
  },
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

function SingleToast({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: (id: string) => void;
}) {
  const [isExiting, setIsExiting] = useState(false);
  const variant = item.variant ?? 'success';
  const styles = variantStyles[variant];
  const duration = item.duration ?? 4000;

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(item.id), 300);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, item.id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(item.id), 300);
  };

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 rounded-xl border border-gray-200 border-l-4 ${styles.border}
        ${styles.bg} ${styles.text} p-4 shadow-lg
        animate-toast-in
        ${isExiting ? 'animate-toast-out' : ''}
      `}
    >
      <span className={`flex-shrink-0 ${styles.icon}`}>{variantIcons[variant]}</span>
      <div className="flex-1 min-w-0">
        {item.title && <p className="font-semibold text-sm">{item.title}</p>}
        <p className="text-sm mt-0.5">{item.message}</p>
        {duration > 0 && (
          <div className="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full w-full rounded-full ${styles.progress} animate-toast-progress`}
              style={{ animationDuration: `${duration}ms` }}
            />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="flex-shrink-0 rounded-lg p-1 text-gray-400 hover:text-gray-600 transition"
        aria-label="Đóng"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export default function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm sm:max-w-md"
      aria-live="polite"
    >
      {toasts.map((item) => (
        <SingleToast key={item.id} item={item} onClose={removeToast} />
      ))}
    </div>
  );
}
