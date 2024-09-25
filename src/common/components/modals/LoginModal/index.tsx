import { useContext, useState } from 'react';

import { Modal } from 'common/components/modals/Modal';
import { AuthContext } from 'pages/PageLayout';

import styles from './index.module.scss';

type Props = {
  show: boolean;
  onClose: () => void;
};

export const LoginModal = ({ show, onClose }: Props) => {
  const [account, setAccount] = useState('');

  const { login } = useContext(AuthContext);

  const onLogin = () => {
    login(account);
    closeOverlay();
  };

  const closeOverlay = () => {
    setAccount('');
    onClose();
  };

  return (
    <Modal show={show} title="Log in" onClose={closeOverlay}>
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
    </Modal>
  );
};
