"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { SaleFormShell } from "@/components/sale/SaleFormShell";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function SalePage() {
  const { user, logout } = useAuthGuard();

  return (
    <AdminShell
      pageTitle="For Sale Module"
      pageSubtitle="Secondary market pricing and transfer fee model"
      user={user}
      onLogout={logout}
    >
      <SaleFormShell />
    </AdminShell>
  );
}
