"use client";

import Link from "next/link";
import { AdminShell } from "@/components/layout/AdminShell";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRecordsSummary } from "@/hooks/useRecordsSummary";

export default function DashboardPage() {
  const { user, loading, error, logout } = useAuthGuard();
  const { summary } = useRecordsSummary(Boolean(user));

  return (
    <AdminShell
      pageTitle="Dashboard"
      pageSubtitle="Single superadmin access"
      user={user}
      onLogout={logout}
    >
      <section className="hidden md:block">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <Link href="/sale" className="small-box bg-danger">
              <div className="inner">
                <h3>Sale</h3>
                <p>Secondary market model</p>
              </div>
              <div className="icon"><i className="fas fa-building" /></div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
          <div className="col-xl-3 col-md-6">
            <Link href="/rent" className="small-box bg-info">
              <div className="inner">
                <h3>Rent</h3>
                <p>Tenant move-in costs</p>
              </div>
              <div className="icon"><i className="fas fa-key" /></div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
          <div className="col-xl-3 col-md-6">
            <Link href="/property" className="small-box bg-success">
              <div className="inner">
                <h3>Property</h3>
                <p>Factsheet profile</p>
              </div>
              <div className="icon"><i className="fas fa-file-lines" /></div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
          <div className="col-xl-3 col-md-6">
            <Link href="/records" className="small-box bg-secondary">
              <div className="inner">
                <h3>Records</h3>
                <p>History and quick look</p>
              </div>
              <div className="icon"><i className="fas fa-folder-open" /></div>
              <span className="small-box-footer">Open module</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="row mt-1">
        <div className="col-lg-4">
        <StatCard
          title="Authenticated User"
          value={loading ? "Loading..." : user?.name || "-"}
          subtitle={`@${user?.username || "..."}`}
        />
        </div>
        <div className="col-lg-4">
        <StatCard
          title="Role"
          value={loading ? "Loading..." : user?.role || "-"}
          subtitle="Single superadmin access"
        />
        </div>
        <div className="col-lg-4">
        <StatCard
          title="Records Snapshot"
          value={String(summary?.total ?? "...")}
          subtitle={`Visible records: ${summary?.count ?? "..."}`}
        />
        </div>
      </section>

      <DashboardCharts />

      {error ? (
        <div className="alert alert-danger mt-3">{error}</div>
      ) : null}
    </AdminShell>
  );
}
