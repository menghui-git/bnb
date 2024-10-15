import { useSelector } from 'react-redux';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { RootState, useAppDispatch } from 'app/store';
import { IconButton } from '../../buttons';
import { setGuestData } from '../SearchBar/SearchBarSlice';
import styles from './index.module.scss';

const Panel = ({
  count,
  disabled,
  onCountChange,
}: {
  count: number;
  disabled: boolean;
  onCountChange: (value: number) => void;
}) => {
  const onMinusClick = (e: ReactEventClick) => {
    e.stopPropagation();
    if (count > 0) {
      onCountChange(count - 1);
    }
  };

  const onPlusClick = (e: ReactEventClick) => {
    e.stopPropagation();
    onCountChange(count + 1);
  };

  return (
    <div className={styles['option-panel']}>
      <IconButton
        icon={faMinus}
        buttonType="flat"
        disabled={disabled}
        onClick={(e) => onMinusClick(e)}
      />
      <span className={styles.count}>{count}</span>
      <IconButton icon={faPlus} buttonType="flat" onClick={onPlusClick} />
    </div>
  );
};

type Props = {
  className: string;
};

export const GuestPopup = ({ className }: Props) => {
  // TODO: set adult to 1 while other fields are set first
  // TODO: handle max count
  const dispatch = useAppDispatch();
  const searchBar = useSelector((state: RootState) => state.searchBar);
  const value = searchBar.guestData;
  const { adult, child, infant, pet } = searchBar.guestData;

  const optionList = [
    {
      name: 'Adults',
      desc: 'Ages 13 or above',
      count: adult,
      disabled: adult === 0 || (adult === 1 && child + infant + pet > 0),
      setCount: (v: number) => dispatch(setGuestData({ ...value, adult: v })),
    },
    {
      name: 'Children',
      desc: 'Ages 2 - 12',
      count: child,
      disabled: child === 0,
      setCount: (v: number) => dispatch(setGuestData({ ...value, child: v })),
    },
    {
      name: 'Infants',
      desc: 'under 2',
      count: infant,
      disabled: infant === 0,
      setCount: (v: number) => dispatch(setGuestData({ ...value, infant: v })),
    },
    {
      name: 'Pets',
      desc: 'Bringing a service animal?',
      count: pet,
      disabled: pet === 0,
      setCount: (v: number) => dispatch(setGuestData({ ...value, pet: v })),
    },
  ];

  return (
    <div
      className={styles['guest-popup'] + ' ' + className}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {optionList.map((option, index) => (
        <div key={index} className={styles.option}>
          <div>
            <div className={styles.name}>{option.name}</div>
            <div className={styles.desc}>{option.desc}</div>
          </div>
          <Panel
            count={option.count}
            disabled={option.disabled}
            onCountChange={option.setCount}
          />
        </div>
      ))}
    </div>
  );
};
