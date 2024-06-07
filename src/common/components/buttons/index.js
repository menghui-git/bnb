import React from 'react';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

export const IconButton = ({ icon, buttonClass, onClick }) => {
  return (
    <div className={buttonClass} onClick={onClick}>
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

export const LeftButton = ({ disabled = false, onClick }) => {
  const buttonClass = 'icon-btn ' + (disabled ? 'hidden' : '');

  return (
    <IconButton
      icon={faChevronLeft}
      buttonClass={buttonClass}
      onClick={onClick}
    />
  );
};

export const RightButton = ({ disabled = false, onClick }) => {
  const buttonClass = 'icon-btn ' + (disabled ? 'hidden' : '');

  return (
    <IconButton
      icon={faChevronRight}
      buttonClass={buttonClass}
      onClick={onClick}
    />
  );
};
