"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SaleFormShell } from "@/components/sale/SaleFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function SalePage() {
  const { logout } = useAuthGuard();

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 pb-24 md:px-10 md:pb-8">
      <AppHeader
        title="For Sale Module"
        subtitle="Secondary market pricing and transfer fee model"
        onLogout={logout}
      />
      <SaleFormShell />
      <MobileBottomNav />
    </main>
  );
}
