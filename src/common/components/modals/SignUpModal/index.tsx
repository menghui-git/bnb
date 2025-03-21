import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { signUpAsync } from 'app/authSlice';
import { RootState, useAppDispatch } from 'app/store';
import { Modal } from 'common/components/modals/Modal';
import { ValidatedInput } from 'common/components/ValidatedInput';
import { AuthContext } from 'pages/PageLayout';
import styles from './index.module.scss';
import {
  setFullName,
  setEmail,
  setPassword,
  setPassword2,
  validateAllFields,
  toggleDisplayPassword,
  toggleDisplayPassword2,
  clearData,
} from './signUpSlice';

type Props = {
  show: boolean;
  onClose: () => void;
};

export const SignUpModal = ({ show, onClose }: Props) => {
  const { login } = useContext(AuthContext);

  const signUpData = useSelector((state: RootState) => state.signUp); // TODO: prepare useSelector with RootState
  const dispatch = useAppDispatch();

  const {
    fullName,
    email,
    password,
    password2,
    passwordHidden,
    passwordHidden2,
    fullNameError,
    emailError,
    passwordError,
    password2Error,
  } = signUpData.data;

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
    dispatch(validateAllFields());
    if (canSignUp()) {
      dispatch(signUpAsync({ username: fullName, email, password, password2 }));
      login(fullName, '');
      closeModal();
    }
  };

  const closeModal = () => {
    dispatch(clearData());
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
            dispatch(setFullName(e.target.value));
          }}
          error={fullNameError}
        />

        <ValidatedInput
          value={email}
          placeholder="Email"
          onChange={(e) => {
            dispatch(setEmail(e.target.value));
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
              onClick={() => dispatch(toggleDisplayPassword())}
            />
          }
          onChange={(e) => {
            dispatch(setPassword(e.target.value));
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
              onClick={() => dispatch(toggleDisplayPassword2())}
            />
          }
          onChange={(e) => {
            dispatch(setPassword2(e.target.value));
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
