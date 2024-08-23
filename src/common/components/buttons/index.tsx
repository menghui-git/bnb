import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

type IconButtonProps = {
  icon: IconProp;
  buttonType?: 'flat' | 'default';
  className?: string;
  disabled?: boolean;
  onClick: (e: ReactEventClick) => void;
};

type ChevronButtonProps = Omit<IconButtonProps, 'icon'>;

export const IconButton = ({
  icon,
  buttonType = 'default',
  className = '',
  disabled = false,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      className={styles['icon-button'] + ' ' + className}
      data-type={buttonType}
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export const LeftButton = ({ className = '', onClick }: ChevronButtonProps) => {
  return (
    <IconButton icon={faChevronLeft} className={className} onClick={onClick} />
  );
};

export const RightButton = ({
  className = '',
  onClick,
}: ChevronButtonProps) => {
  return (
    <IconButton icon={faChevronRight} className={className} onClick={onClick} />
  );
};
