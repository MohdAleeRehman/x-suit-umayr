"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRecordsSummary } from "@/hooks/useRecordsSummary";

export default function DashboardPage() {
  const { user, loading, error, logout } = useAuthGuard();
  const { summary } = useRecordsSummary(Boolean(user));

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 pb-24 md:px-10 md:pb-8">
      <AppHeader title="Dashboard" subtitle="Single superadmin access" onLogout={logout} />

      <section className="mx-auto mt-5 hidden w-full max-w-5xl md:block">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <Link href="/sale" className="small-box bg-danger">
              <div className="inner">
                <h3>Sale</h3>
                <p>Secondary market model</p>
              </div>
              <div className="icon">S</div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
          <div className="col-xl-3 col-md-6">
            <Link href="/rent" className="small-box bg-info">
              <div className="inner">
                <h3>Rent</h3>
                <p>Tenant move-in costs</p>
              </div>
              <div className="icon">R</div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
          <div className="col-xl-3 col-md-6">
            <Link href="/property" className="small-box bg-success">
              <div className="inner">
                <h3>Property</h3>
                <p>Factsheet profile</p>
              </div>
              <div className="icon">P</div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
          <div className="col-xl-3 col-md-6">
            <Link href="/records" className="small-box bg-secondary">
              <div className="inner">
                <h3>Records</h3>
                <p>History and quick look</p>
              </div>
              <div className="icon">H</div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-2 grid w-full max-w-5xl gap-4 lg:grid-cols-3">
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

      <div className="mx-auto w-full max-w-5xl">
        <DashboardCharts />
      </div>

      {error ? (
        <p className="mx-auto mt-4 w-full max-w-5xl rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <MobileBottomNav />
    </main>
  );
}
