"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { api } from "@/lib/api";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Breakdown = {
  sale: number;
  rent: number;
  property: number;
};

export function DashboardCharts() {
  const [loading, setLoading] = useState(true);
  const [breakdown, setBreakdown] = useState<Breakdown>({ sale: 0, rent: 0, property: 0 });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [sale, rent, property] = await Promise.all([
          api.getRecords({ type: "sale", limit: 1 }),
          api.getRecords({ type: "rent", limit: 1 }),
          api.getRecords({ type: "property", limit: 1 }),
        ]);

        setBreakdown({
          sale: sale.total,
          rent: rent.total,
          property: property.total,
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const barData = useMemo(
    () => ({
      labels: ["Sale", "Rent", "Property"],
      datasets: [
        {
          label: "Saved Records",
          data: [breakdown.sale, breakdown.rent, breakdown.property],
          backgroundColor: ["#dc3545", "#17a2b8", "#28a745"],
          borderRadius: 6,
        },
      ],
    }),
    [breakdown]
  );

  const doughnutData = useMemo(
    () => ({
      labels: ["Sale", "Rent", "Property"],
      datasets: [
        {
          data: [breakdown.sale, breakdown.rent, breakdown.property],
          backgroundColor: ["#dc3545", "#17a2b8", "#28a745"],
          borderWidth: 1,
        },
      ],
    }),
    [breakdown]
  );

  return (
    <section className="row mt-4">
      <div className="col-lg-8">
        <div className="card card-outline card-danger">
          <div className="card-header">
            <h3 className="card-title">Records Volume by Module</h3>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="skeleton h-56 rounded" />
            ) : (
              <div style={{ height: 260 }}>
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-outline card-secondary">
          <div className="card-header">
            <h3 className="card-title">Distribution</h3>
          </div>
          <div className="card-body d-flex justify-content-center">
            {loading ? (
              <div className="skeleton h-56 w-full rounded" />
            ) : (
              <div style={{ height: 230, width: 230 }}>
                <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "bottom" },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
