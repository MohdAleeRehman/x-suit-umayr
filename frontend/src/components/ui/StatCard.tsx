type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatCard({ title, value, subtitle }: Props) {
  return (
    <article className="info-box shadow-sm">
      <span className="info-box-icon bg-danger"><i className="fas fa-chart-line" /></span>
      <div className="info-box-content">
        <span className="info-box-text text-xs uppercase">{title}</span>
        <span className="info-box-number">{value}</span>
        {subtitle ? <span className="text-xs text-(--ink-soft)">{subtitle}</span> : null}
      </div>
    </article>
  );
}
