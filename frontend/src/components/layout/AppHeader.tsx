"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string;
  subtitle: string;
  onLogout?: () => void;
};

export function AppHeader({ title, subtitle, onLogout }: Props) {
  return (
    <header className="card card-outline card-danger mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-white/60 bg-(--panel) px-4 py-4 shadow-[0_18px_50px_rgba(28,36,48,0.12)] sm:px-5 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
            <Image
              src="/icons/icon-192.svg"
              alt="X Suite Logo"
              width={28}
              height={28}
              priority
            />
          </span>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--ink-soft)">
            X Suite Control
          </p>
        </div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h1>
        <p className="text-xs text-(--ink-soft)">{subtitle}</p>
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
