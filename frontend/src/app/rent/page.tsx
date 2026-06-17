"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { RentFormShell } from "@/components/rent/RentFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RentPage() {
  const { logout } = useAuthGuard();

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 md:px-10">
      <AppHeader
        title="For Rent Module"
        subtitle="Week 6 API integration"
        onLogout={logout}
      />
      <RentFormShell />
    </main>
  );
}
