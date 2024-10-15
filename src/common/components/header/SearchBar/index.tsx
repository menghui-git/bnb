import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState, useAppDispatch } from 'app/store';
import { DateRangePopup } from '../CalenderPopup';
import { GuestPopup } from '../GuestPopup';
import { LocationSearchField, SearchField } from '../SearchField';
import styles from './index.module.scss';
import { setLocation } from './SearchBarSlice';

export const SearchBar = () => {
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const dispatch = useAppDispatch();
  const searchBar = useSelector((state: RootState) => state.searchBar);
  const { location, checkIn, checkOut, guestData } = searchBar;

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

  const getDateString = (date?: string) => {
    if (date)
      return new Date(date).toLocaleString('default', {
        month: 'short',
        day: 'numeric',
      });
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
    <div className={styles['search-bar-outer']}>
      <form
        className={styles['search-bar']}
        onSubmit={(e) => e.preventDefault()}
      >
        <LocationSearchField
          label="Where"
          placeholder="Search destinations"
          value={location}
          onChange={(e) => {
            dispatch(setLocation(e.target.value));
          }}
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
        <div className={styles.search}>
          <SearchField
            label="Who"
            placeholder="Add guests"
            value={getGuestString(guestData)}
            onClick={onGuestFieldClick}
          />
          <div className={styles['search-icon']}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </form>
      <div className={styles['popup-container']}>
        <DateRangePopup className={showDatePopup ? '' : 'hidden'} />
        <GuestPopup className={showGuestPopup ? '' : 'hidden'} />
      </div>
    </div>
  );
};
