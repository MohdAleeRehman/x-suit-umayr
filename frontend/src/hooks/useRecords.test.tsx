import { act, renderHook, waitFor } from "@testing-library/react";
import { useRecords } from "@/hooks/useRecords";
import { api } from "@/lib/api";

jest.mock("@/lib/api", () => ({
  api: {
    getRecords: jest.fn(),
    searchRecords: jest.fn(),
    deleteRecord: jest.fn(),
  },
}));

type MockRecord = {
  _id: string;
  type: "sale" | "rent" | "property";
  title: string;
  dataset: Record<string, unknown>;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

const buildRecord = (id: string): MockRecord => ({
  _id: id,
  type: "sale",
  title: `Sale ${id}`,
  dataset: {},
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

describe("useRecords", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads first page on mount", async () => {
    (api.getRecords as jest.Mock).mockResolvedValue({
      success: true,
      count: 1,
      total: 1,
      data: [buildRecord("1")],
    });

    const { result } = renderHook(() => useRecords());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.records).toHaveLength(1);
    });

    expect(api.getRecords).toHaveBeenCalledWith({ type: undefined, skip: 0, limit: 20 });
  });

  it("deletes record and updates local state", async () => {
    (api.getRecords as jest.Mock).mockResolvedValue({
      success: true,
      count: 2,
      total: 2,
      data: [buildRecord("1"), buildRecord("2")],
    });
    (api.deleteRecord as jest.Mock).mockResolvedValue({ success: true, message: "ok" });

    const { result } = renderHook(() => useRecords());

    await waitFor(() => {
      expect(result.current.records).toHaveLength(2);
    });

    await act(async () => {
      await result.current.remove("1");
    });

    expect(api.deleteRecord).toHaveBeenCalledWith("1");
    expect(result.current.records.map((r) => r._id)).toEqual(["2"]);
    expect(result.current.total).toBe(1);
  });

  it("switches into search mode when query is provided", async () => {
    (api.getRecords as jest.Mock).mockResolvedValue({
      success: true,
      count: 0,
      total: 0,
      data: [],
    });
    (api.searchRecords as jest.Mock).mockResolvedValue({
      success: true,
      count: 1,
      data: [buildRecord("55")],
    });

    const { result } = renderHook(() => useRecords("rent"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.search("Rent");
    });

    expect(api.searchRecords).toHaveBeenCalledWith("Rent", "rent");
    expect(result.current.searchMode).toBe(true);
    expect(result.current.records).toHaveLength(1);
  });
});
