import { ChangeEventHandler, FocusEventHandler } from "react";

interface NumberInputProps {
  label: string;
  value: string;
  name: string;
  suffix?: string;
  error?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
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
            ? "tg-ui-text-red-500 tg-ui-text-xs tg-ui-font-bold tg-ui-mb-2"
            : "tg-ui-text-gray-700 tg-ui-text-xs tg-ui-font-bold tg-ui-mb-2"
        }
      >
        {label}
      </label>
      <div
        className={
          error
            ? "tg-ui-flex tg-ui-border-b tg-ui-border-red-500 tg-ui-text-red-500"
            : "tg-ui-flex tg-ui-border-b tg-ui-border-gray-300"
        }
      >
        <input
          data-testid={`NumberInput-${name}`}
          className="tg-ui-bg-transparent tg-ui-border-none tg-ui-w-full tg-ui-text-xl tg-ui-font-bold tg-ui-text-gray-700 tg-ui-px-2 focus:tg-ui-outline-none"
          type="number"
          min={0.01}
          step="0.01"
          id={name}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {suffix && (
          <div className={error ? "tg-ui-text-red-500" : "tg-ui-text-gray-300"}>
            {suffix}
          </div>
        )}
      </div>
      {error && <div className="tg-ui-text-red-500">{error}</div>}
    </div>
  );
};
