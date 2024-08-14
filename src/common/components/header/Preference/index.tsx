import {
  faBars,
  faCircleUser,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

export const Preference = () => {
  return (
    <div className={styles.preference}>
      <div>Airbnb your home</div>
      <FontAwesomeIcon icon={faGlobe} />
      <div>
        <FontAwesomeIcon icon={faBars} />
        <FontAwesomeIcon icon={faCircleUser} />
      </div>
    </div>
  );
};
