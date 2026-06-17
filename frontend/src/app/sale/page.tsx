"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { SaleFormShell } from "@/components/sale/SaleFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function SalePage() {
  const { logout } = useAuthGuard();

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 md:px-10">
      <AppHeader
        title="For Sale Module"
        subtitle="Week 5 componentized shell"
        onLogout={logout}
      />
      <SaleFormShell />
    </main>
  );
}
