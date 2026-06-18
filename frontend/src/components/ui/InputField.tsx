import { memo } from "react";

type Props = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "password" | "date";
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
    <label className="form-group mb-3 block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.05em] text-(--ink-soft)">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
        disabled={disabled}
        className="form-control"
      />
    </label>
  );
}

export const InputField = memo(InputFieldBase);
InputField.displayName = "InputField";
