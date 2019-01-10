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
