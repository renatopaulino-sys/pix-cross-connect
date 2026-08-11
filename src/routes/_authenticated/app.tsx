import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PanelLayout } from "@/components/panel/PanelLayout";
import { ProfileProvider } from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <ProfileProvider>
      <PanelLayout>
        <Outlet />
      </PanelLayout>
    </ProfileProvider>
  );
}