import { memo } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
};

function SelectFieldBase({ label, value, onChange, options, disabled }: Props) {
  return (
    <label className="form-group mb-3 block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.05em] text-(--ink-soft)">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="form-control"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export const SelectField = memo(SelectFieldBase);
SelectField.displayName = "SelectField";
