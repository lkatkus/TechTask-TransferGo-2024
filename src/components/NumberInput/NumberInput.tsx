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
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={
          error
            ? "text-red-500 text-xs font-bold mb-2"
            : "text-gray-700 text-xs font-bold mb-2"
        }
      >
        {label}
      </label>
      <div
        className={
          error
            ? "flex border-b border-red-500 text-red-500"
            : "flex border-b border-gray-300"
        }
      >
        <input
          className="bg-transparent border-none w-full text-2xl font-bold text-gray-700 px-2 focus:outline-none"
          type="number"
          min={0.01}
          step="0.01"
          id={name}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {suffix && <div>{suffix}</div>}
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
