import { memo } from "react";

type Props = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "password";
  placeholder?: string;
  min?: number;
  step?: number;
  disabled?: boolean;
};

function InputFieldBase({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  step,
  disabled,
}: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
        disabled={disabled}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-foreground"
      />
    </label>
  );
}

export const InputField = memo(InputFieldBase);
InputField.displayName = "InputField";
