import { useContext, useState } from 'react';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from 'common/components/modals/Modal';
import { ValidatedInput } from 'common/components/ValidatedInput';
import { AuthContext } from 'pages/PageLayout';
import styles from './index.module.scss';

type Props = {
  show: boolean;
  onClose: () => void;
};

export const SignUpModal = ({ show, onClose }: Props) => {
  // values
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // hide password
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordHidden2, setPasswordHidden2] = useState(true);
  // errors
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const { login } = useContext(AuthContext);

  // validators
  const validateFullName = (fullName: string) => {
    if (!fullName) {
      setFullNameError('Please enter');
    } else if (fullName.length <= 3) {
      setFullNameError('Too short');
    } else {
      setFullNameError('');
    }
  };

  const validateEmail = (email: string) => {
    const isValidEmail = () => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    };

    if (!email) {
      setEmailError('Please enter');
    } else if (!isValidEmail()) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password: string) => {
    const isValidPassword = () => {
      return password.match(/^[a-zA-Z0-9]{8,}$/);
    };

    if (!password) {
      setPasswordError('Please enter');
    } else if (!isValidPassword()) {
      setPasswordError('Must contain 8 digits of alphabets and numbers');
    } else {
      setPasswordError('');
    }
  };

  const validatePassword2 = (password2: string) => {
    if (!password2) {
      setPassword2Error('Please enter');
    } else if (password2 !== password) {
      setPassword2Error('Wrong password');
    } else {
      setPassword2Error('');
    }
  };

  const canSignUp = () => {
    return (
      fullName !== '' &&
      email !== '' &&
      password !== '' &&
      password2 !== '' &&
      fullNameError === '' &&
      emailError === '' &&
      passwordError === '' &&
      password2Error === ''
    );
  };

  const onSignUp = () => {
    validateFullName(fullName);
    validateEmail(email);
    validatePassword(password);
    validatePassword2(password2);
    if (canSignUp()) {
      login(fullName);
      closeModal();
    }
  };

  const closeModal = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setPassword2('');
    setPasswordHidden(true);
    setPasswordHidden2(true);
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setPassword2Error('');

    onClose();
  };

  return (
    <Modal show={show} title="Sign up" onClose={closeModal}>
      <div className={styles.content}>
        <div className={styles.header}>Sign up and start Airbnb right now</div>

        <ValidatedInput
          value={fullName}
          placeholder="Full name"
          onChange={(e) => {
            setFullName(e.target.value);
            validateFullName(e.target.value);
          }}
          error={fullNameError}
        />

        <ValidatedInput
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          error={emailError}
        />

        <ValidatedInput
          value={password}
          type={passwordHidden ? 'password' : 'text'}
          placeholder="Password"
          icon={
            <FontAwesomeIcon
              icon={passwordHidden ? faEyeSlash : faEye}
              onClick={() => setPasswordHidden(!passwordHidden)}
            />
          }
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          error={passwordError}
        />

        <ValidatedInput
          value={password2}
          type={passwordHidden2 ? 'password' : 'text'}
          placeholder="Confirm your password"
          icon={
            <FontAwesomeIcon
              icon={passwordHidden2 ? faEyeSlash : faEye}
              onClick={() => setPasswordHidden2(!passwordHidden2)}
            />
          }
          onChange={(e) => {
            setPassword2(e.target.value);
            validatePassword2(e.target.value);
          }}
          error={password2Error}
        />

        <button
          className={styles.button}
          onClick={onSignUp}
          disabled={!canSignUp()}
        >
          Sign up
        </button>
      </div>
    </Modal>
  );
};
