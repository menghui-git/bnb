import { useState } from 'react';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LeftButton, RightButton } from 'common/components/buttons';
import { Toggle } from 'common/components/toggle';
import { Preference } from '../Preference';
import { SearchBar } from '../SearchBar';
import './index.scss';

// TODO: integrate with Card
const CategoryScroller = ({ categories }: { categories: string[] }) => {
  const onRightButtonClick = () => {};

  const onLeftButtonClick = () => {};

  return (
    <>
      <LeftButton onClick={() => onLeftButtonClick()} />
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
      <RightButton onClick={onRightButtonClick} />
    </>
  );
};

type Props = {
  categories: string[];
};

export const Header = ({ categories = [] }: Props) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="header">
      <div className="nav">
        <FontAwesomeIcon icon={faAirbnb} />
        <Preference />
      </div>
      <div className="nav-search">
        <SearchBar />
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
            <Toggle toggled={toggled} onClick={() => setToggled(!toggled)} />
          </div>
        </div>
      </div>
    </div>
  );
};
