"use client";

import { Button } from "@/components/ui/Button";
import { SavedRecord } from "@/types/records";
import { buildQuickLook } from "@/lib/quickLook";

type Props = {
  record: SavedRecord | null;
  onClose: () => void;
};

export function QuickLookModal({ record, onClose }: Props) {
  if (!record) return null;

  const metrics = buildQuickLook(record);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="card card-outline card-danger w-full max-w-2xl rounded-2xl border border-white/50 bg-(--panel) p-5 shadow-[0_22px_55px_rgba(15,23,42,0.28)]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--ink-soft)">
              Quick Look
            </p>
            <h3 className="mt-1 text-lg font-bold text-foreground">{record.title}</h3>
            <p className="text-xs text-(--ink-soft)">
              {record.type.toUpperCase()} • {new Date(record.createdAt).toLocaleString("en-AE")}
            </p>
          </div>
          <Button variant="secondary" className="h-9" onClick={onClose}>Close</Button>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {metrics.primary.map((m) => (
            <div key={m.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-(--ink-soft)">{m.label}</p>
              <p className="mt-1 text-sm font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-slate-200">
          <table className="table w-full text-sm">
            <tbody>
              {metrics.breakdown.map((row) => (
                <tr key={row.label} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-2 font-semibold text-(--ink-soft)">{row.label}</td>
                  <td className="px-3 py-2 text-right text-foreground">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
