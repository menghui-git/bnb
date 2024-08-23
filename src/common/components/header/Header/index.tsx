import { useState } from 'react';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LeftButton, RightButton } from 'common/components/buttons';
import { Toggle } from 'common/components/toggle';
import { Preference } from '../Preference';
import { SearchBar } from '../SearchBar';
import styles from './index.module.scss';

// TODO: integrate with Card
const CategoryScroller = ({ categories }: { categories: string[] }) => {
  const onRightButtonClick = () => {};

  const onLeftButtonClick = () => {};

  return (
    <>
      <LeftButton onClick={() => onLeftButtonClick()} />
      <div className={styles['category-scroller']}>
        <div className={styles['category-container']}>
          {categories.map((category) => (
            <div className={styles.category} key={category}>
              <FontAwesomeIcon
                icon={faHouse}
                className={styles['category-icon']}
              />
              <div className={styles['category-name']}>{category}</div>
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
    <div className={styles.header}>
      <div className={styles.nav}>
        <FontAwesomeIcon icon={faAirbnb} />
        <Preference />
      </div>
      <div className={styles['nav-search']}>
        <SearchBar />
      </div>
      <div className={styles['filter-set']}>
        <CategoryScroller categories={categories} />
        <div className={styles.filter}>
          <div className={styles.content}>
            <FontAwesomeIcon icon={faSliders} />
          </div>
          <div className={styles.content}>Filters</div>
        </div>
        <div className={styles.filter}>
          <div className={styles.content}>Display total before taxes</div>
          <div className={styles.content}>
            <Toggle toggled={toggled} onClick={() => setToggled(!toggled)} />
          </div>
        </div>
      </div>
    </div>
  );
};
