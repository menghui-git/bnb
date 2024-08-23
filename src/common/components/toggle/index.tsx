import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

type Props = {
  toggled: boolean;
  onClick: () => void;
};

export const Toggle = ({ toggled, onClick }: Props) => {
  return (
    <div className={styles.toggle} data-toggled={toggled}>
      <div className={styles.button} onClick={onClick}>
        <div className={styles['check-icon']}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    </div>
  );
};
