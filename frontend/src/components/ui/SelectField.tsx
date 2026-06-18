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
    <label className="form-group mb-3 d-block">
      <span className="d-block mb-1 text-muted" style={{ fontWeight: 600, fontSize: 13 }}>{label}</span>
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
