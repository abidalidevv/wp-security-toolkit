import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Scanner } from "@/features/scanner/Scanner";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Security Scanner — WP Security Monitor" },
      {
        name: "description",
        content:
          "Run malware scans, monitor file changes, audit security headers and review scan history.",
      },
    ],
  }),
  component: () => (
    <AppLayout>
      <Scanner />
    </AppLayout>
  ),
});


import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="form-group">
        <label htmlFor={inputId} className="form-label">{label}</label>
        <input ref={ref} id={inputId} className={`form-input ${error ? 'error' : ''}`} {...props} />
        {hint && !error && <p className="form-hint">{hint}</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
