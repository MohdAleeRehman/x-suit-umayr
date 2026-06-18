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
    <label className="form-group mb-3 d-block">
      <span className="d-block mb-1 text-muted" style={{ fontWeight: 600, fontSize: 13 }}>{label}</span>
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
