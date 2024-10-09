import { useContext } from 'react';

import { AuthContext } from 'pages/PageLayout';
import styles from './index.module.scss';

type Props = {
  show: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
};

export const LoginPopup = ({ show, onLoginClick, onSignupClick }: Props) => {
  const className = `${styles.popup} ${show ? '' : 'hidden'}`;
  const { username, logout } = useContext(AuthContext);

  const options = [];
  if (username) {
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
