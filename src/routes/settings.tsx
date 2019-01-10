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
