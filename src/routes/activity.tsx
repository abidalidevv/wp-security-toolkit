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
