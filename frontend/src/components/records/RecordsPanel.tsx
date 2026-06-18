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
    <section className="card card-outline card-danger mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-white/60 bg-(--panel) p-6 shadow-[0_18px_50px_rgba(28,36,48,0.12)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Saved Records</h2>
          <p className="text-sm text-(--ink-soft)">Live data from MongoDB records API.</p>
        </div>
        <div className="flex w-full flex-wrap gap-2 md:w-auto">
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
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm md:w-64"
          />
          <Button
            variant="secondary"
            className="flex-1 sm:flex-none"
            disabled={loading}
            onClick={() => search(query)}
          >
            Search
          </Button>
          <Button
            variant="secondary"
            className="flex-1 sm:flex-none"
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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-(--ink-soft)">
        <p>
          {searchMode
            ? `Search results: ${total}`
            : `Showing ${pageStart}-${pageEnd} of ${total}`}
        </p>
        {!searchMode ? (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="h-9 px-3"
              disabled={loading || skip === 0}
              onClick={prevPage}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              className="h-9 px-3"
              disabled={loading || skip + limit >= total}
              onClick={nextPage}
            >
              Next
            </Button>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {shareError ? (
        <p className="mt-4 rounded-lg border border-amber-100 bg-amber-50 px-4 py-2 text-sm text-amber-700">
          {shareError}
        </p>
      ) : null}

      <div className="mt-5 overflow-x-auto">
        <table className="table w-full min-w-[640px] border-collapse text-sm md:min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 text-left text-(--ink-soft)">
              <th className="pb-2">Title</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Created</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="py-4 text-(--ink-soft)" colSpan={4}>Loading records...</td>
              </tr>
            ) : null}
            {!loading && records.length === 0 ? (
              <tr>
                <td className="py-4 text-(--ink-soft)" colSpan={4}>No records found.</td>
              </tr>
            ) : null}
            {!loading
              ? records.map((record) => (
                  <tr key={record._id} className="border-b border-slate-100">
                    <td className="py-3 pr-3 font-medium text-foreground">{record.title}</td>
                    <td className="py-3 pr-3 uppercase text-(--ink-soft)">{record.type}</td>
                    <td className="py-3 pr-3 text-(--ink-soft)">
                      {new Date(record.createdAt).toLocaleString("en-AE")}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          className="h-9"
                          onClick={() => setQuickLookRecord(record)}
                        >
                          Quick Look
                        </Button>
                        <Button
                          variant="secondary"
                          className="h-9"
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
                          className="h-9"
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

      <QuickLookModal record={quickLookRecord} onClose={() => setQuickLookRecord(null)} />
    </section>
  );
}
