import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const styles: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-outline-secondary",
  ghost: "btn btn-light",
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`${styles[variant]} ${className}`.trim()}
    />
  );
}
