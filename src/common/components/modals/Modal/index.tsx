import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

type Props = {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ show, title, children, onClose }: Props) => {
  // TODO: solve https://github.com/menghui-git/bnb/pull/15#discussion_r1770771233

  const className = `${styles.modal} ${show ? '' : 'hidden'}`;

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
          <div className={styles.name}>{title}</div>
        </div>
        {children}
      </div>
    </div>
  );
};
