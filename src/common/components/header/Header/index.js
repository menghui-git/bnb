import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faSliders } from '@fortawesome/free-solid-svg-icons';

import { Preference } from '../Preference';
import { SearchBar } from '../SearchBar';
import './index.scss';

export const Header = ({ groups = [], onSearch = () => null }) => {
  return (
    <div className="header">
      <div className="nav">
        <FontAwesomeIcon icon={faAirbnb} />
        <Preference />
      </div>
      <div className="nav-search">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="filter-set">
        <div className="group-container">
          {groups.map((group) => (
            <div className="group" key={group}>
              <FontAwesomeIcon icon={faHouse} className="icon" />
              <div className="group-name">{group}</div>
            </div>
          ))}
        </div>
        <div className="filter">
          <div>
            <FontAwesomeIcon icon={faSliders} />
          </div>
          <div>Filters</div>
        </div>
      </div>
    </div>
  );
};
