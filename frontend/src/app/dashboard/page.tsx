"use client";

import { Card, SmallBox } from "@adminlte/react";
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
      <section className="mb-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">
          <div className="col">
            <SmallBox
              title="Sale"
              text="Secondary market model"
              theme="danger"
              icon={<i className="bi bi-building" />}
              url="/sale"
            />
          </div>
          <div className="col">
            <SmallBox
              title="Rent"
              text="Tenant move-in costs"
              theme="info"
              icon={<i className="bi bi-key" />}
              url="/rent"
            />
          </div>
          <div className="col">
            <SmallBox
              title="Property"
              text="Factsheet profile"
              theme="success"
              icon={<i className="bi bi-file-earmark-text" />}
              url="/property"
            />
          </div>
          <div className="col">
            <SmallBox
              title="Records"
              text="History and quick look"
              theme="secondary"
              icon={<i className="bi bi-folder2-open" />}
              url="/records"
            />
          </div>
        </div>
      </section>

      <section className="row g-3 mb-3">
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
        <Card title="Error" theme="danger" className="mt-3">
          <p>{error}</p>
        </Card>
      ) : null}
    </AdminShell>
  );
}
