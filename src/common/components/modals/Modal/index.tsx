import { useState } from 'react';

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
  const className = `${styles.modal} ${show ? '' : 'hidden'}`;
  const [canClose, setCanClose] = useState(true);

  return (
    <div
      className={className}
      data-backdrop
      onClick={() => {
        if (canClose) {
          onClose();
        }
      }}
      onMouseUp={(e) => {
        setTimeout(() => {
          setCanClose(true);
        }, 0);
      }}
    >
      <div
        className={styles.popup}
        data-dialog
        onMouseDown={(e) => {
          setCanClose(false);
        }}
        onClick={(e) => {
          // prevent to close the modal
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
