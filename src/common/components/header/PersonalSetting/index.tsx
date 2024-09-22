import { useContext, useEffect, useState } from 'react';
import {
  faBars,
  faCircleUser,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoginOverlay } from 'common/components/LoginOverlay';
import { SignUpOverlay } from 'common/components/SignUpOverlay';
import { AuthContext } from 'pages/PageLayout';
import { LoginPopup } from '../LoginPopup';

import styles from './index.module.scss';

export const PersonalSetting = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showSignUpOverlay, setShowSignUpOverlay] = useState(false);

  const user = useContext(AuthContext).user;

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      setShowPopup(false);
    };

    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const UserIcon = () => {
    if (!user) {
      return (
        <FontAwesomeIcon icon={faCircleUser} className={styles['user-icon']} />
      );
    } else {
      return <div className={styles.user}>{user[0]}</div>;
    }
  };

  return (
    <div className={styles.preference}>
      <div className={styles.item}>Airbnb your home</div>
      <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
      <button
        className={`${styles.item} ${styles['login-button']}`}
        onClick={(e: ReactEventClick) => {
          e.stopPropagation();
          if (!showLoginOverlay && !showSignUpOverlay) setShowPopup(!showPopup);
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`${styles.menu} ${styles.icon}`}
        />
        <UserIcon />
        <LoginPopup
          showPopup={showPopup}
          onLoginClick={() => {
            setShowPopup(false);
            setShowLoginOverlay(true);
          }}
          onSignupClick={() => {
            setShowPopup(false);
            setShowSignUpOverlay(true);
          }}
        />
        <LoginOverlay
          showOverlay={showLoginOverlay}
          onClose={() => {
            setShowLoginOverlay(false);
          }}
        />
        <SignUpOverlay
          showOverlay={showSignUpOverlay}
          onClose={() => {
            setShowSignUpOverlay(false);
          }}
        />
      </button>
    </div>
  );
};
