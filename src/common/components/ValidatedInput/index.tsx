import { ReactNode } from 'react';
import styles from './index.module.scss';

type ValidatedInputProps = {
  value: string;
  type?: string;
  placeholder: string;
  icon?: null | ReactNode;
  error: null | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ValidatedInput = ({
  value,
  type = 'text',
  placeholder,
  icon = null,
  error,
  onChange,
}: ValidatedInputProps) => {
  return (
    <div className={styles['input-set']}>
      <div className={styles.container}>
        <span className={styles.icon}>{icon}</span>
        <input
          className={styles.input}
          type={type}
          value={value}
          placeholder={placeholder}
          data-error={error !== ''}
          onChange={onChange}
        />
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  );
};
