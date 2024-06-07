import React, { useState } from 'react';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faHouse, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Preference } from '../Preference';
import { SearchBar } from '../SearchBar';
import { LeftButton, RightButton } from 'common/components/buttons';
import './index.scss';

// TODO: integrate with Card
const CategoryScroller = ({ categories }) => {
  const onRightButtonClick = (e) => {};

  const onLeftButtonClick = (e) => {};

  return (
    <>
      <LeftButton disabled={false} onClick={onLeftButtonClick} />
      <div className="category-scroller">
        <div className="category-container">
          {categories.map((category) => (
            <div className="category" key={category}>
              <FontAwesomeIcon icon={faHouse} className="category-icon" />
              <div className="category-name">{category}</div>
            </div>
          ))}
        </div>
      </div>
      <RightButton disabled={false} onClick={onRightButtonClick} />
    </>
  );
};

const Toggle = ({ toggled, onClick }) => {
  return (
    <div className={toggled ? 'toggled' : 'untoggled'}>
      <div className="button" onClick={onClick}>
        <div className="check-icon">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    </div>
  );
};

export const Header = ({ categories = [], onSearch = () => null }) => {
  const [toggled, setToggled] = useState(false);

  const onToggleClick = (e) => {
    setToggled(!toggled);
  };

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
        <CategoryScroller categories={categories} />
        <div className="filter">
          <div className="content">
            <FontAwesomeIcon icon={faSliders} />
          </div>
          <div className="content">Filters</div>
        </div>
        <div className="filter">
          <div className="content">Display total before taxes</div>
          <div className="content">
            <Toggle toggled={toggled} onClick={onToggleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
