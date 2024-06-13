import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

type IconButtonProps = {
  icon: IconProp;
  disabled: boolean;
  onClick: (e: ReactEventClick) => void;
};

type ChevronButtonProps = Omit<IconButtonProps, 'icon'>;

export const IconButton = ({
  icon,
  onClick,
  disabled = false,
}: IconButtonProps) => {
  const className = 'icon-btn ' + (disabled ? 'hidden' : '');
  return (
    <div className={className} onClick={onClick}>
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

export const LeftButton = ({
  disabled = false,
  onClick,
}: ChevronButtonProps) => {
  return (
    <IconButton icon={faChevronLeft} onClick={onClick} disabled={disabled} />
  );
};

export const RightButton = ({
  disabled = false,
  onClick,
}: ChevronButtonProps) => {
  return (
    <IconButton icon={faChevronRight} onClick={onClick} disabled={disabled} />
  );
};
