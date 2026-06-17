"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type RecordSummary = {
  count: number;
  total: number;
};

export function useRecordsSummary(enabled: boolean) {
  const [summary, setSummary] = useState<RecordSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const load = async () => {
      setLoading(true);
      try {
        const records = await api.getRecords();
        setSummary({ count: records.count, total: records.total });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [enabled]);

  return { summary, loading };
}
