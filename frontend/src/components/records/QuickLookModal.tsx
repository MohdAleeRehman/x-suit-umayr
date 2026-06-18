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
    <>
      <div className="modal-backdrop show" onClick={onClose} />
      <div className="modal show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title">{record.title}</h5>
                <small className="text-muted">
                  {record.type.toUpperCase()} | {new Date(record.createdAt).toLocaleString("en-AE")}
                </small>
              </div>
              <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>

            <div className="modal-body">
              <div className="row g-2 mb-3">
                {metrics.primary.map((m) => (
                  <div key={m.label} className="col-md-4">
                    <div className="card card-body p-2">
                      <div>
                        <span className="d-block text-muted" style={{ fontSize: 12 }}>{m.label}</span>
                        <span className="d-block fw-semibold">{m.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <table className="table table-sm table-striped mb-0">
                <tbody>
                  {metrics.breakdown.map((row) => (
                    <tr key={row.label}>
                      <td className="text-muted fw-semibold">{row.label}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
