"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, AuthUser } from "@/lib/api";
import { authStore } from "@/lib/auth";

export function useAuthGuard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = authStore.getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        const me = await api.me();
        setUser(me.data);
      } catch (err) {
        authStore.clearToken();
        setError(err instanceof Error ? err.message : "Authentication failed");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const logout = () => {
    authStore.clearToken();
    router.replace("/login");
  };

  return { user, loading, error, logout };
}
