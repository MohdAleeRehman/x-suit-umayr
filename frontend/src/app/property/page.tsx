"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PropertyFormShell } from "@/components/property/PropertyFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function PropertyPage() {
  const { logout } = useAuthGuard();

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 pb-24 md:px-10 md:pb-8">
      <AppHeader
        title="Property Details Module"
        subtitle="Identity, configuration, pricing, and return profile"
        onLogout={logout}
      />
      <PropertyFormShell />
      <MobileBottomNav />
    </main>
  );
}
