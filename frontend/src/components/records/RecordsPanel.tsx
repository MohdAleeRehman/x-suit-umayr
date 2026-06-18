"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRecords } from "@/hooks/useRecords";
import { shareRecordPdf } from "@/lib/pdfShare";
import { RecordType, SavedRecord } from "@/types/records";
import { QuickLookModal } from "@/components/records/QuickLookModal";

type Props = {
  type?: RecordType;
};

export function RecordsPanel({ type }: Props) {
  const {
    records,
    loading,
    error,
    search,
    remove,
    reload,
    total,
    skip,
    limit,
    searchMode,
    nextPage,
    prevPage,
  } = useRecords(type);
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string>("");
  const [sharingId, setSharingId] = useState<string>("");
  const [shareError, setShareError] = useState("");
  const [quickLookRecord, setQuickLookRecord] = useState<SavedRecord | null>(null);

  const pageStart = total === 0 ? 0 : skip + 1;
  const pageEnd = Math.min(skip + records.length, total);

  return (
    <section className="card shadow-sm">
      <div className="card-header">
        <h3 className="card-title mb-0">Saved Records</h3>
        <p className="text-muted mb-0 mt-1">Live data from MongoDB records API.</p>
      </div>

      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <div className="input-group" style={{ maxWidth: 420 }}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  search(query);
                }
              }}
              placeholder="Search records..."
              className="form-control"
            />
            <div className="input-group-append">
              <Button
                variant="secondary"
                disabled={loading}
                onClick={() => search(query)}
              >
                Search
              </Button>
              <Button
                variant="secondary"
                disabled={loading}
                onClick={() => {
                  setQuery("");
                  reload(0);
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="text-muted" style={{ fontSize: 13 }}>
            {searchMode
              ? `Search results: ${total}`
              : `Showing ${pageStart}-${pageEnd} of ${total}`}
          </div>
        </div>

        {!searchMode ? (
          <div className="d-flex gap-2 mb-3">
            <Button
              variant="secondary"
              disabled={loading || skip === 0}
              onClick={prevPage}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={loading || skip + limit >= total}
              onClick={nextPage}
            >
              Next
            </Button>
          </div>
        ) : null}

      {error ? (
        <p className="alert alert-danger py-2">
          {error}
        </p>
      ) : null}

      {shareError ? (
        <p className="alert alert-warning py-2">
          {shareError}
        </p>
      ) : null}

      <div className="table-responsive">
        <table className="table table-hover table-striped table-sm mb-0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-muted py-3">Loading records...</td>
              </tr>
            ) : null}
            {!loading && records.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-muted py-3">No records found.</td>
              </tr>
            ) : null}
            {!loading
              ? records.map((record) => (
                  <tr key={record._id}>
                    <td className="fw-semibold">{record.title}</td>
                    <td className="text-uppercase text-muted">{record.type}</td>
                    <td className="text-muted">
                      {new Date(record.createdAt).toLocaleString("en-AE")}
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => setQuickLookRecord(record)}
                        >
                          Quick Look
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={sharingId === record._id}
                          onClick={async () => {
                            try {
                              setShareError("");
                              setSharingId(record._id);
                              const result = await shareRecordPdf(record);
                              if (result === "downloaded") {
                                setShareError("PDF generated and downloaded. Use WhatsApp attachment to send this file.");
                              }
                            } catch {
                              setShareError("Unable to generate or share PDF right now.");
                            } finally {
                              setSharingId("");
                            }
                          }}
                        >
                          {sharingId === record._id ? "Preparing PDF..." : "Share PDF"}
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={deletingId === record._id}
                          onClick={async () => {
                            try {
                              setDeletingId(record._id);
                              await remove(record._id);
                            } finally {
                              setDeletingId("");
                            }
                          }}
                        >
                          {deletingId === record._id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      </div>

      <QuickLookModal record={quickLookRecord} onClose={() => setQuickLookRecord(null)} />
    </section>
  );
}
