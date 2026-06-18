type Props = {
  title?: string;
  subtitle?: string;
};

export function AppLoadingScreen({
  title = "Loading workspace...",
  subtitle = "Preparing modules, records, and secure session.",
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-8 md:px-10">
      <section className="card card-outline card-danger w-full max-w-5xl rounded-2xl border border-white/60 bg-(--panel) p-6 shadow-[0_18px_50px_rgba(28,36,48,0.12)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--ink-soft)">
              X Suite
            </p>
            <h1 className="mt-2 text-xl font-bold text-foreground">{title}</h1>
            <p className="mt-2 text-sm text-(--ink-soft)">{subtitle}</p>
          </div>

          <div className="mx-auto flex h-16 w-16 items-center justify-center md:mx-0">
            <div className="loader-ring h-14 w-14 rounded-full border-4 border-slate-200 border-t-(--brand)" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="skeleton h-4 w-2/3 rounded-lg" />
          <div className="skeleton h-4 w-4/5 rounded-lg" />
          <div className="skeleton h-28 w-full rounded-xl" />
        </div>
      </section>
    </main>
  );
}
