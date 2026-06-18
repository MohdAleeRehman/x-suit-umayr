"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout, Card } from "@adminlte/react";
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
    <AuthLayout authType="login">
      <Card title="Superadmin Login" theme="primary" className="shadow-sm">
        <p className="text-muted mb-3">Single-user secure access for Umair.</p>

        <form onSubmit={onSubmit}>
          <InputField label="Username" value={username} onChange={setUsername} />
          <InputField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />

          {error ? (
            <div className="alert alert-danger py-2">{error}</div>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="w-100"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
