"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { PropertyFormShell } from "@/components/property/PropertyFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function PropertyPage() {
  const { user, logout } = useAuthGuard();

  return (
    <AdminShell
      pageTitle="Property Details Module"
      pageSubtitle="Identity, configuration, pricing, and return profile"
      user={user}
      onLogout={logout}
    >
      <PropertyFormShell />
    </AdminShell>
  );
}
