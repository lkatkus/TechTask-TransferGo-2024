import { ChangeEventHandler, FocusEventHandler } from "react";

interface NumberInputProps {
  label: string;
  value: string;
  name: string;
  suffix?: string;
  error?: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const NumberInput = ({
  label,
  value,
  error,
  name,
  suffix,
  onBlur,
  onChange,
}: NumberInputProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <label
        htmlFor={name}
        className="block text-gray-700 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <div className="flex">
        <input
          className="flex-1"
          type="number"
          min={0.01}
          step="0.01"
          id={name}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {suffix && <div className="ml-4">{suffix}</div>}
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
