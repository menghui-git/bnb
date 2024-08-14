import styles from './index.module.scss';

type Props = {
  isLoading: boolean;
};

export const Skeleton = ({ isLoading }: Props) => {
  // TODO
  return (
    <div className={styles.skeleton + ' ' + (isLoading ? '' : 'not-display')}>
      <div className={styles.rect} />
      <div className={styles.line + ' ' + styles.line1} />
      <div className={styles.line + ' ' + styles.line2} />
    </div>
  );
};
