"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RecordsPanel } from "@/components/records/RecordsPanel";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RecordsPage() {
  const { logout } = useAuthGuard();

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 pb-24 md:px-10 md:pb-8">
      <AppHeader
        title="Records History"
        subtitle="Search, review, and delete saved records"
        onLogout={logout}
      />
      <RecordsPanel />
      <MobileBottomNav />
    </main>
  );
}
