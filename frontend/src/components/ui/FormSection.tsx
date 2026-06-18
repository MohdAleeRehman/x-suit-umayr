import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function FormSection({ title, subtitle, children }: Props) {
  return (
    <section className="card card-outline card-light mb-3 shadow-sm">
      <div className="card-header d-flex flex-column gap-1">
        <h3 className="card-title mb-0" style={{ fontSize: 16, lineHeight: 1.3 }}>{title}</h3>
        {subtitle ? (
          <p className="text-muted mb-0" style={{ fontSize: 13, lineHeight: 1.4 }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="card-body">{children}</div>
    </section>
  );
}
