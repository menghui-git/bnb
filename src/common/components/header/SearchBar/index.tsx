import { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

const SearchField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string | number;
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

export const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numPerson, setNumPerson] = useState(0);

  return (
    <div className="search-bar-outer">
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <SearchField
          label="Where"
          placeholder="Search destinations"
          value={location}
          onChange={setLocation}
        />
        <SearchField
          label="Check in"
          placeholder="Add dates"
          value={checkIn}
          onChange={setCheckIn}
        />
        <SearchField
          label="Check out"
          placeholder="Add dates"
          value={checkOut}
          onChange={setCheckOut}
        />
        <div className="search">
          <SearchField
            label="Who"
            placeholder="Add guests"
            value={numPerson}
            onChange={(value) => setNumPerson(Number(value))}
          />
          <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </form>
    </div>
  );
};
