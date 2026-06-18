"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RentFormShell } from "@/components/rent/RentFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RentPage() {
  const { logout } = useAuthGuard();

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 pb-24 md:px-10 md:pb-8">
      <AppHeader
        title="For Rent Module"
        subtitle="Tenant move-in, cheque schedule, and deposit model"
        onLogout={logout}
      />
      <RentFormShell />
      <MobileBottomNav />
    </main>
  );
}
