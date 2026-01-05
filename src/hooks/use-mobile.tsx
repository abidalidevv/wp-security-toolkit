import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}


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


import { useState, useCallback } from 'react';

interface AsyncState<T> { data: T | null; loading: boolean; error: string | null; }

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null });
  const execute = useCallback(async (fn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Unknown error';
      setState({ data: null, loading: false, error });
      throw e;
    }
  }, []);
  return { ...state, execute };
}
