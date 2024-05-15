import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faBars,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

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
