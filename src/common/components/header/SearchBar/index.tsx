import { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DateRangePopup } from '../CalenderPopup';
import { GuestPopup } from '../GuestPopup';
import { LocationSearchField, SearchField } from '../SearchField';
import './index.scss';

export const SearchBar = () => {
  // search data
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<null | Date>(null);
  const [checkOut, setCheckOut] = useState<null | Date>(null);
  const [guestData, setGuestData] = useState({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  });

  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      setShowDatePopup(false);
      setShowGuestPopup(false);
    };

    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const onDateFieldClick = (e: ReactEventClick) => {
    e.stopPropagation();
    setShowDatePopup(!showDatePopup);
    setShowGuestPopup(false);
  };

  const onGuestFieldClick = (e: ReactEventClick) => {
    e.stopPropagation();
    setShowDatePopup(false);
    setShowGuestPopup(!showGuestPopup);
  };

  const getDateString = (date?: Date) => {
    if (date)
      return date.toLocaleString('default', { month: 'short', day: 'numeric' });
  };

  const getGuestString = ({ adult, child, infant, pet }: GuestData) => {
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
    <div className="search-bar-outer">
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <LocationSearchField
          label="Where"
          placeholder="Search destinations"
          value={location}
          onChange={setLocation}
        />
        <SearchField
          label="Check in"
          placeholder="Add dates"
          value={getDateString(checkIn!)}
          onClick={onDateFieldClick}
        />
        <SearchField
          label="Check out"
          placeholder="Add dates"
          value={getDateString(checkOut!)}
          onClick={onDateFieldClick}
        />
        <div className="search">
          <SearchField
            onClick={onGuestFieldClick}
            label="Who"
            placeholder="Add guests"
            value={getGuestString(guestData)}
          />
          <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </form>
      <div className="popup-container">
        <DateRangePopup
          className={showDatePopup ? '' : 'hidden'}
          startDate={checkIn!}
          setStartDate={setCheckIn}
          endDate={checkOut!}
          setEndDate={setCheckOut}
        />
        <GuestPopup
          className={showGuestPopup ? '' : 'hidden'}
          value={guestData}
          onValueChange={(value) => setGuestData(value)}
        />
      </div>
    </div>
  );
};
