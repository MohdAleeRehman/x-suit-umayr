"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string;
  subtitle: string;
  onLogout?: () => void;
};

export function AppHeader({ title, subtitle, onLogout }: Props) {
  const pathname = usePathname();
  const flowRoutes = ["/dashboard", "/sale", "/rent", "/property", "/records"];
  const currentIndex = flowRoutes.indexOf(pathname);
  const prevPath = currentIndex > 0 ? flowRoutes[currentIndex - 1] : null;
  const nextPath =
    currentIndex >= 0 && currentIndex < flowRoutes.length - 1
      ? flowRoutes[currentIndex + 1]
      : null;

  return (
    <header className="card card-outline card-danger mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-white/60 bg-(--panel) px-4 py-4 shadow-[0_18px_50px_rgba(28,36,48,0.12)] sm:px-5 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--ink-soft)">
          X Suite Control
        </p>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h1>
        <p className="text-xs text-(--ink-soft)">{subtitle}</p>
        {currentIndex >= 0 ? (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {prevPath ? (
              <Link href={prevPath}>
                <Button variant="ghost" className="h-8 px-2 text-xs">← Back</Button>
              </Link>
            ) : null}
            {nextPath ? (
              <Link href={nextPath}>
                <Button variant="ghost" className="h-8 px-2 text-xs">Next →</Button>
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
        <Link href="/dashboard" className="w-[calc(50%-0.25rem)] sm:w-auto">
          <Button variant="secondary" className="w-full">Dashboard</Button>
        </Link>
        <Link href="/records" className="w-[calc(50%-0.25rem)] sm:w-auto">
          <Button variant="secondary" className="w-full">Records</Button>
        </Link>
        {onLogout ? <Button variant="secondary" className="w-full sm:w-auto" onClick={onLogout}>Logout</Button> : null}
      </div>
    </header>
  );
}
