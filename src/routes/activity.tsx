import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { ActivityPage } from "@/features/activity/ActivityPage";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Activity — WP Security Monitor" },
      {
        name: "description",
        content: "Logins, failed attempts, blocked IPs and recent user activity on your site.",
      },
    ],
  }),
  component: () => (
    <AppLayout>
      <ActivityPage />
    </AppLayout>
  ),
});


import { useReducer, Dispatch } from 'react';

type Action<T> =
  | { type: 'SET'; payload: T }
  | { type: 'RESET' }
  | { type: 'MERGE'; payload: Partial<T> };

function reducer<T>(state: T, action: Action<T>): T {
  switch (action.type) {
    case 'SET':   return action.payload;
    case 'RESET': return state;
    case 'MERGE': return { ...state, ...action.payload };
    default:      return state;
  }
}

export function useStateReducer<T>(initial: T): [T, Dispatch<Action<T>>] {
  return useReducer(reducer<T>, initial);
}
