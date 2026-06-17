import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-(--brand) text-white hover:bg-(--brand-dark) border border-transparent",
  secondary:
    "bg-white text-foreground border border-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-foreground border border-transparent hover:bg-white/60",
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`h-11 rounded-xl px-4 text-sm font-semibold transition active:scale-[0.99] touch-manipulation disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    />
  );
}
