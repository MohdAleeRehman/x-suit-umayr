type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatCard({ title, value, subtitle }: Props) {
  return (
    <article className="info-box shadow-sm mb-3">
      <span className="info-box-icon bg-primary"><i className="bi bi-bar-chart" /></span>
      <div className="info-box-content">
        <div className="text-muted" style={{ fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4 }}>
          {title}
        </div>
        <div className="info-box-number" style={{ fontSize: 22, lineHeight: 1.3 }}>
          {value}
        </div>
        {subtitle ? (
          <div className="text-muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </article>
  );
}
