import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-2xl rounded-2xl border border-white/60 bg-(--panel) p-10 shadow-[0_20px_70px_rgba(28,36,48,0.12)]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--ink-soft)">
          X Suite Platform
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
          Real Estate Operations Dashboard
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-(--ink-soft)">
          Live frontend and backend are connected with single-superadmin access, module records,
          shareable WhatsApp payloads, and responsive mobile navigation.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-(--brand) px-5 text-sm font-semibold text-white transition hover:bg-(--brand-dark)"
          >
            Open Login
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-foreground hover:bg-slate-50"
          >
            Open Operations
          </Link>
        </div>
      </section>
    </main>
  );
}
