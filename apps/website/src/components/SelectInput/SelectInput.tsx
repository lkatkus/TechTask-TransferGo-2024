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
    <div className="flex flex-col border-b border-gray-300 py-2">
      <label
        htmlFor={name}
        className="block text-gray-700 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <select
        className="bg-transparent border-none w-full text-xl text-gray-700 px-2 focus:outline-none"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, label, disabled }) => {
          return (
            <option
              className="bg-red-100"
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
