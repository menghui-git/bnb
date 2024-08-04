export const LocationSearchField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="search-field">
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size={placeholder.length + 1}
      />
    </div>
  );
};

type SearchFieldProps = {
  label: string;
  placeholder: string;
  value?: string;
  onClick: (e: ReactEventClick) => void;
};

export const SearchField = ({
  label,
  placeholder,
  value,
  onClick,
}: SearchFieldProps) => {
  return (
    <div className="search-field" onClick={onClick}>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className="input"
        readOnly
      />
    </div>
  );
};
