import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function FormSection({ title, subtitle, children, className = "" }: Props) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(16,24,40,0.06)] ${className}`}>
      <div className="mb-4 border-b border-slate-200 pb-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-(--ink-soft)">{title}</p>
        {subtitle ? <p className="mt-1 text-xs text-(--ink-soft)">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
