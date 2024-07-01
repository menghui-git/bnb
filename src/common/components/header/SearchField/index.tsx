import { forwardRef } from 'react';

import { GuestPopup } from 'common/components/header/GuestPopup';

export const SearchField = ({
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

type GuestSearchFieldProps = {
  label: string;
  placeholder: string;
  value: GuestData;
  showDropdown: boolean;
  onClick: () => void;
  onChange: (value: GuestData) => void;
};

// TODO: integrate search field components
// TODO: fix position
export const GuestSearchField = forwardRef<
  HTMLDivElement,
  GuestSearchFieldProps
>((props, ref) => {
  const { label, placeholder, value, showDropdown, onClick, onChange } = props;

  const getDisplayValue = ({ adult, child, infant, pet }: GuestData) => {
    let displayGuestData = '';

    if (adult + child > 0) {
      displayGuestData += `${adult + child} guests`;
    }

    if (infant > 0) {
      displayGuestData += `, ${infant} infants`;
    }

    if (pet > 0) {
      displayGuestData += `, ${pet} pets`;
    }

    return displayGuestData;
  };

  return (
    <div className="search-field" onClick={onClick} ref={ref}>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={getDisplayValue(value)}
        className="input"
        readOnly
      />
      <GuestPopup
        className={showDropdown ? '' : 'hidden'}
        value={value}
        onValueChange={onChange}
      />
    </div>
  );
});
