"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { authStore } from "@/lib/auth";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("umair");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login({ username, password });
      authStore.setToken(response.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border border-white/60 bg-(--panel) p-8 shadow-[0_20px_70px_rgba(28,36,48,0.12)]">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-(--ink-soft)">
          X Suite
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Superadmin Login
        </h1>
        <p className="mt-2 text-sm text-(--ink-soft)">
          Single-user secure access for Umair.
        </p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <InputField label="Username" value={username} onChange={setUsername} />
          <InputField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />

          {error ? (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </section>
    </main>
  );
}
