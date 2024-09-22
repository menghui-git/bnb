import { useContext } from 'react';

import { AuthContext } from 'pages/PageLayout';
import styles from './index.module.scss';

type Props = {
  showPopup: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
};

export const LoginPopup = ({
  showPopup,
  onLoginClick,
  onSignupClick,
}: Props) => {
  const className = `${styles.popup} ${showPopup ? '' : 'hidden'}`;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const logout = authContext.logout;

  const options = [];
  if (user) {
    options.push({ name: 'Log out', onClick: logout });
  } else {
    options.push({ name: 'Log in', onClick: onLoginClick });
    options.push({ name: 'Sign up', onClick: onSignupClick });
  }

  return (
    <div className={className}>
      {options.map(({ name, onClick }, index) => (
        <div className={styles.option} key={index} onClick={onClick}>
          {name}
        </div>
      ))}
    </div>
  );
};
