import { ChangeEventHandler } from "react";

interface SelectInputOption {
  value: string;
  label: string;
  disabled: boolean;
}
interface SelectInputProps {
  label: string;
  value: string;
  name: string;
  options: SelectInputOption[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const SelectInput = ({
  label,
  value,
  name,
  options,
  onChange,
}: SelectInputProps) => {
  return (
    <div className="flex-1">
      <label
        htmlFor={name}
        className="block text-gray-700 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <select
        className="w-full"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, label, disabled }) => {
          return (
            <option key={value} value={value} disabled={disabled}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
