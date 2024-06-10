// @ts-check

import React, { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

const SearchField = ({ label, placeholder, value, onChange }) => {
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

export const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numPerson, setNumPerson] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(location, checkIn, checkOut, numPerson);
  };

  return (
    <div className="search-bar-outer">
      <form className="search-bar" onSubmit={onSubmit}>
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
            onChange={setNumPerson}
          />
          <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </form>
    </div>
  );
};
