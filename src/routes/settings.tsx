import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { SettingsPage } from "@/features/settings/SettingsPage";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WP Security Monitor" },
      {
        name: "description",
        content: "Configure auto scans, email alerts and security level for WP Security Monitor.",
      },
    ],
  }),
  component: () => (
    <AppLayout>
      <SettingsPage />
    </AppLayout>
  ),
});


import { memo, useState } from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination = memo(({ total, perPage, current, onChange }: PaginationProps) => {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
        <li><button onClick={() => onChange(current - 1)} disabled={current <= 1}>‹ Prev</button></li>
        {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
          <li key={p}>
            <button onClick={() => onChange(p)} aria-current={p === current ? 'page' : undefined}
                    className={p === current ? 'active' : ''}>{p}</button>
          </li>
        ))}
        <li><button onClick={() => onChange(current + 1)} disabled={current >= pages}>Next ›</button></li>
      </ul>
    </nav>
  );
});
