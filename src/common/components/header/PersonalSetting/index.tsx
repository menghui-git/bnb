import { useContext, useEffect, useState } from 'react';
import {
  faBars,
  faCircleUser,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoginPopup } from 'common/components/header/LoginPopup';
import { LoginModal } from 'common/components/modals/LoginModal';
import { SignUpModal } from 'common/components/modals/SignUpModal';
import { AuthContext } from 'pages/PageLayout';

import styles from './index.module.scss';

export const PersonalSetting = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const { user } = useContext(AuthContext);

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
    }

    return <div className={styles.user}>{user[0]}</div>;
  };

  return (
    <div className={styles.preference}>
      <div className={styles.item}>Airbnb your home</div>
      <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
      <button
        className={`${styles.item} ${styles['login-button']}`}
        onClick={(e: ReactEventClick) => {
          e.stopPropagation();
          if (!showLoginModal && !showSignUpModal) setShowPopup(!showPopup);
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`${styles.menu} ${styles.icon}`}
        />
        <UserIcon />
        <LoginPopup
          show={showPopup}
          onLoginClick={() => {
            setShowPopup(false);
            setShowLoginModal(true);
          }}
          onSignupClick={() => {
            setShowPopup(false);
            setShowSignUpModal(true);
          }}
        />
        <LoginModal
          show={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
          }}
        />
        <SignUpModal
          show={showSignUpModal}
          onClose={() => {
            setShowSignUpModal(false);
          }}
        />
      </button>
    </div>
  );
};
