"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { RecordsPanel } from "@/components/records/RecordsPanel";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RecordsPage() {
  const { user, logout } = useAuthGuard();

  return (
    <AdminShell
      pageTitle="Records History"
      pageSubtitle="Search, review, and delete saved records"
      user={user}
      onLogout={logout}
    >
      <RecordsPanel />
    </AdminShell>
  );
}
