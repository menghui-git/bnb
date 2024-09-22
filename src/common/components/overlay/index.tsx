import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

type OverlayProps = {
  showOverlay: boolean;
  titleName: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const Overlay = ({
  showOverlay,
  titleName,
  children,
  onClose,
}: OverlayProps) => {
  const className = `${styles.overlay} ${showOverlay ? '' : 'hidden'}`;

  return (
    <div className={className} onClick={onClose}>
      <div
        className={styles.popup}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={styles.title}>
          <button className={styles['close-button']} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className={styles.name}>{titleName}</div>
        </div>
        {children}
      </div>
    </div>
  );
};
