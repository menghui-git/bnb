// @ts-check

import React from 'react';

import {
  faBars,
  faCircleUser,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Preference = () => {
  return (
    <div className="preference">
      <div>Airbnb your home</div>
      <FontAwesomeIcon icon={faGlobe} />
      <div>
        <FontAwesomeIcon icon={faBars} />
        <FontAwesomeIcon icon={faCircleUser} />
      </div>
    </div>
  );
};
