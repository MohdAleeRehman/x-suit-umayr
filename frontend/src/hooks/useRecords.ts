"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { RecordType, SavedRecord } from "@/types/records";

const PAGE_SIZE = 20;

type State = {
  records: SavedRecord[];
  loading: boolean;
  error: string;
  total: number;
  skip: number;
  limit: number;
  searchMode: boolean;
};

export function useRecords(type?: RecordType) {
  const [state, setState] = useState<State>({
    records: [],
    loading: false,
    error: "",
    total: 0,
    skip: 0,
    limit: PAGE_SIZE,
    searchMode: false,
  });

  const load = useCallback(async (skip = 0) => {
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    try {
      const response = await api.getRecords({ type, skip, limit: PAGE_SIZE });
      setState((prev) => ({
        ...prev,
        records: response.data,
        total: response.total,
        skip,
        limit: PAGE_SIZE,
        searchMode: false,
        loading: false,
        error: "",
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        records: [],
        total: 0,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load records",
      }));
    }
  }, [type]);

  const search = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        await load(0);
        return;
      }
      setState((prev) => ({ ...prev, loading: true, error: "" }));
      try {
        const response = await api.searchRecords(q, type);
        setState((prev) => ({
          ...prev,
          records: response.data,
          total: response.count,
          skip: 0,
          searchMode: true,
          loading: false,
          error: "",
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Search failed",
        }));
      }
    },
    [load, type]
  );

  const remove = useCallback(async (id: string) => {
    await api.deleteRecord(id);
    setState((prev) => ({
      ...prev,
      records: prev.records.filter((record) => record._id !== id),
      total: Math.max(0, prev.total - 1),
    }));
  }, []);

  const nextPage = useCallback(async () => {
    if (state.searchMode) return;
    const nextSkip = state.skip + state.limit;
    if (nextSkip >= state.total) return;
    await load(nextSkip);
  }, [load, state.limit, state.searchMode, state.skip, state.total]);

  const prevPage = useCallback(async () => {
    if (state.searchMode) return;
    const prevSkip = Math.max(0, state.skip - state.limit);
    await load(prevSkip);
  }, [load, state.limit, state.searchMode, state.skip]);

  useEffect(() => {
    load(0);
  }, [load]);

  return {
    ...state,
    reload: load,
    search,
    remove,
    nextPage,
    prevPage,
  };
}
