import { useEffect, useRef, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GuestSearchField, SearchField } from '../SearchField';

import './index.scss';

export const SearchBar = () => {
  // search data
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestData, setGuestData] = useState({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  });

  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const guestFieldRef = useRef(null);

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      if (
        guestFieldRef.current &&
        !(guestFieldRef.current as HTMLElement).contains(
          e.target as HTMLElement,
        )
      ) {
        setShowGuestPopup(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const onGuestFieldClick = () => {
    setShowGuestPopup(!showGuestPopup);
  };

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
          <GuestSearchField
            ref={guestFieldRef}
            onClick={onGuestFieldClick}
            label="Who"
            placeholder="Add guests"
            value={guestData}
            showDropdown={showGuestPopup}
            onChange={(value) => setGuestData(value)}
          />
          <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </form>
    </div>
  );
};
