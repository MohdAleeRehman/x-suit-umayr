"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { RentFormShell } from "@/components/rent/RentFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RentPage() {
  const { user, logout } = useAuthGuard();

  return (
    <AdminShell
      pageTitle="For Rent Module"
      pageSubtitle="Tenant move-in, cheque schedule, and deposit model"
      user={user}
      onLogout={logout}
    >
      <RentFormShell />
    </AdminShell>
  );
}
