export const SelectInput = ({ label, value, name, options, onChange }) => {
  return (
    <div className="flex-1">
      <div>{label}</div>
      <select className="w-full" name={name} value={value} onChange={onChange}>
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
