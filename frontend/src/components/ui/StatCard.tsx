type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatCard({ title, value, subtitle }: Props) {
  return (
    <article className="rounded-2xl border border-white/60 bg-(--panel) p-5 shadow-[0_10px_30px_rgba(28,36,48,0.08)]">
      <p className="text-sm text-(--ink-soft)">{title}</p>
      <h2 className="mt-2 text-xl font-bold text-foreground">{value}</h2>
      {subtitle ? <p className="mt-1 text-sm text-(--ink-soft)">{subtitle}</p> : null}
    </article>
  );
}
