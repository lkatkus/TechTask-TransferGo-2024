export const NumberInput = ({
  label,
  value,
  error,
  name,
  suffix,
  onBlur,
  onChange,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div>{label}</div>
      <div className="flex">
        <input
          className="flex-1"
          type="number"
          min={0.01}
          step="0.01"
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
