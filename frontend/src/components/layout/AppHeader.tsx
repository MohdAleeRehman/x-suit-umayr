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
    <header className="card card-outline card-danger mx-auto w-full max-w-5xl">
      <div className="card-body flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded border border-slate-200 bg-white">
            <Image
              src="/icons/icon-192.svg"
              alt="X Suite Logo"
              width={28}
              height={28}
              priority
            />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--ink-soft)">
              X Suite Control
            </p>
          </div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h1>
          <p className="text-sm text-(--ink-soft)">{subtitle}</p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <Link href="/dashboard" className="w-[calc(50%-0.25rem)] sm:w-auto">
            <Button variant="secondary" className="w-full">Dashboard</Button>
          </Link>
          <Link href="/records" className="w-[calc(50%-0.25rem)] sm:w-auto">
            <Button variant="secondary" className="w-full">Records</Button>
          </Link>
          {onLogout ? <Button variant="primary" className="w-full sm:w-auto" onClick={onLogout}>Logout</Button> : null}
        </div>
      </div>
    </header>
  );
}
