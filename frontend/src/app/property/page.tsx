"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { PropertyFormShell } from "@/components/property/PropertyFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function PropertyPage() {
  const { logout } = useAuthGuard();

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 md:px-10">
      <AppHeader
        title="Property Details Module"
        subtitle="Week 6 API integration"
        onLogout={logout}
      />
      <PropertyFormShell />
    </main>
  );
}
