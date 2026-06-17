export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-8 md:px-10">
      <div className="w-full max-w-5xl rounded-2xl border border-white/60 bg-(--panel) p-6 shadow-[0_18px_50px_rgba(28,36,48,0.12)]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--ink-soft)">
          X Suite
        </p>
        <h1 className="mt-2 text-xl font-bold text-foreground">Loading workspace...</h1>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-(--brand)" />
        </div>
      </div>
    </main>
  );
}
