import { useContext, useState } from 'react';

import { AuthContext } from 'pages/PageLayout';
import { Overlay } from '../overlay';

import styles from './index.module.scss';

type LoginOverlayProps = { onClose: () => void; showOverlay: boolean };

export const LoginOverlay = ({ onClose, showOverlay }: LoginOverlayProps) => {
  const [account, setAccount] = useState('');

  const login = useContext(AuthContext).login;

  const onLogin = () => {
    login(account);
    closeOverlay();
  };

  const closeOverlay = () => {
    setAccount('');
    onClose();
  };

  return (
    <Overlay
      showOverlay={showOverlay}
      titleName="Log in"
      onClose={closeOverlay}
    >
      <div className={styles.content}>
        <div className={styles.header}>Welcome to Airbnb</div>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        />
        <button className={styles.button} onClick={onLogin}>
          Continue
        </button>
      </div>
    </Overlay>
  );
};
