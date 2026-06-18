export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-8 md:px-10">
      <section className="card card-outline card-danger w-full max-w-2xl rounded-2xl border border-white/60 bg-(--panel) p-6 shadow-[0_18px_50px_rgba(28,36,48,0.12)]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--ink-soft)">
          X Suite
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">Offline Mode</h1>
        <p className="mt-2 text-sm text-(--ink-soft)">
          Network is currently unavailable. Reconnect to continue syncing live records.
        </p>
      </section>
    </main>
  );
}
