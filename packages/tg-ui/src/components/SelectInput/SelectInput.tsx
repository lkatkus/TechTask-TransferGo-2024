import { ChangeEventHandler } from "react";

export interface SelectInputOption {
  value: string;
  label: string;
  disabled?: boolean;
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
    <div className="tg-ui-flex tg-ui-flex-col tg-ui-border-b tg-ui-border-gray-300 tg-ui-py-2">
      <label
        htmlFor={name}
        className="tg-ui-block tg-ui-text-gray-700 tg-ui-text-xs tg-ui-font-bold tg-ui-mb-2"
      >
        {label}
      </label>
      <select
        className="tg-ui-bg-transparent tg-ui-border-none tg-ui-w-full tg-ui-text-xl tg-ui-text-gray-700 tg-ui-px-2 focus:tg-ui-outline-none"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, label, disabled }) => {
          return (
            <option
              className="tg-ui-bg-red-100"
              key={value}
              value={value}
              disabled={disabled}
            >
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
