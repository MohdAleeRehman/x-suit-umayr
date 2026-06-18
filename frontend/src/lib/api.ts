import { API_BASE_URL } from "./config";
import { authStore } from "./auth";
import { SavedRecord, RecordType } from "@/types/records";

type LoginPayload = {
  username: string;
  password: string;
};

export type AuthUser = {
  _id: string;
  username: string;
  name: string;
  role: "superadmin";
  isActive: boolean;
};

type CreateRecordPayload = {
  type: "sale" | "rent" | "property";
  dataset: Record<string, unknown>;
  tags?: string[];
};

type GetRecordsOptions = {
  type?: RecordType;
  skip?: number;
  limit?: number;
};

type SharePayloadRequest = {
  moduleType: RecordType;
  title: string;
  summary?: string;
  recordId?: string;
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = authStore.getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Request failed");
  }

  return data as T;
};

export const api = {
  login: (payload: LoginPayload) =>
    request<{ success: boolean; token: string; data: AuthUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: () => request<{ success: boolean; data: AuthUser }>("/api/auth/me"),

  getRecords: (options: GetRecordsOptions = {}) => {
    const params = new URLSearchParams();
    if (options.type) params.set("type", options.type);
    if (typeof options.skip === "number") params.set("skip", String(options.skip));
    if (typeof options.limit === "number") params.set("limit", String(options.limit));

    const query = params.toString();
    return request<{ success: boolean; count: number; total: number; data: SavedRecord[] }>(
      `/api/records${query ? `?${query}` : ""}`
    );
  },

  createRecord: (payload: CreateRecordPayload) =>
    request<{ success: boolean; message: string; data: SavedRecord }>(
      "/api/records",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    ),

  deleteRecord: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/records/${id}`, {
      method: "DELETE",
    }),

  searchRecords: (query: string, type?: RecordType) => {
    const params = new URLSearchParams();
    params.set("q", query);
    if (type) params.set("type", type);
    return request<{ success: boolean; count: number; data: SavedRecord[] }>(
      `/api/records/search?${params.toString()}`
    );
  },

  generateSharePayload: (payload: SharePayloadRequest) =>
    request<{
      success: boolean;
      message: string;
      data: {
        whatsappUrl: string;
        link: string;
        pdf: { status: string; storage: string; fileUrl: string | null };
      };
    }>("/api/pdf/share-payload", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
