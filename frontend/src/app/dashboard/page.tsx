"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRecordsSummary } from "@/hooks/useRecordsSummary";

export default function DashboardPage() {
  const { user, loading, error, logout } = useAuthGuard();
  const { summary } = useRecordsSummary(Boolean(user));

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 pb-24 md:px-10 md:pb-8">
      <AppHeader title="Dashboard" subtitle="Single superadmin access" onLogout={logout} />

      <section className="mx-auto mt-5 hidden w-full max-w-5xl gap-3 md:grid md:grid-cols-2 xl:grid-cols-4">
        <Link href="/sale" className="w-full">
          <Button variant="secondary" className="h-12 w-full">Open Sale Module</Button>
        </Link>
        <Link href="/rent" className="w-full">
          <Button variant="secondary" className="h-12 w-full">Open Rent Module</Button>
        </Link>
        <Link href="/property" className="w-full">
          <Button variant="secondary" className="h-12 w-full">Open Property Module</Button>
        </Link>
        <Link href="/records" className="w-full">
          <Button variant="secondary" className="h-12 w-full">Open Records History</Button>
        </Link>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-5xl gap-4 lg:grid-cols-3">
        <StatCard
          title="Authenticated User"
          value={loading ? "Loading..." : user?.name || "-"}
          subtitle={`@${user?.username || "..."}`}
        />
        <StatCard
          title="Role"
          value={loading ? "Loading..." : user?.role || "-"}
          subtitle="Single superadmin access"
        />
        <StatCard
          title="Records Snapshot"
          value={String(summary?.total ?? "...")}
          subtitle={`Visible records: ${summary?.count ?? "..."}`}
        />
      </section>

      {error ? (
        <p className="mx-auto mt-4 w-full max-w-5xl rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <MobileBottomNav />
    </main>
  );
}
