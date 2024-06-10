import React from 'react';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

export const IconButton = ({ icon, onClick, disabled = false }) => {
  const className = 'icon-btn ' + (disabled ? 'hidden' : '');
  return (
    <div className={className} onClick={onClick}>
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

export const LeftButton = ({ disabled = false, onClick }) => {
  return (
    <IconButton icon={faChevronLeft} onClick={onClick} disabled={disabled} />
  );
};

export const RightButton = ({ disabled = false, onClick }) => {
  return (
    <IconButton icon={faChevronRight} onClick={onClick} disabled={disabled} />
  );
};
