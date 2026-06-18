import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function FormSection({ title, subtitle, children, className = "" }: Props) {
  return (
    <section className={`card card-outline card-secondary mb-3 ${className}`}>
      <div className="card-header">
        <h3 className="card-title text-sm font-bold">{title}</h3>
        {subtitle ? <p className="mb-0 mt-1 text-xs text-(--ink-soft)">{subtitle}</p> : null}
      </div>
      <div className="card-body">{children}</div>
    </section>
  );
}
