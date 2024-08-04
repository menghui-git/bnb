import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from '../../buttons';
import './index.scss';

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
    <div className="option-panel">
      <IconButton
        icon={faMinus}
        buttonType="flat"
        disabled={disabled}
        onClick={(e) => onMinusClick(e)}
      />
      <span className="count">{count}</span>
      <IconButton icon={faPlus} buttonType="flat" onClick={onPlusClick} />
    </div>
  );
};

type Props = {
  className: string;
  value: GuestData;
  onValueChange: (value: GuestData) => void;
};

export const GuestPopup = ({ className, value, onValueChange }: Props) => {
  // TODO: set adult to 1 while other fields are set first
  // TODO: handle max count
  const optionList = [
    {
      name: 'Adults',
      desc: 'Ages 13 or above',
      count: value.adult,
      disabled:
        value.adult === 0 ||
        (value.adult === 1 && value.child + value.infant + value.pet > 0),
      setCount: (v: number) => onValueChange({ ...value, adult: v }),
    },
    {
      name: 'Children',
      desc: 'Ages 2 - 12',
      count: value.child,
      disabled: value.child === 0,
      setCount: (v: number) => onValueChange({ ...value, child: v }),
    },
    {
      name: 'Infants',
      desc: 'under 2',
      count: value.infant,
      disabled: value.infant === 0,
      setCount: (v: number) => onValueChange({ ...value, infant: v }),
    },
    {
      name: 'Pets',
      desc: 'Bringing a service animal?',
      count: value.pet,
      disabled: value.pet === 0,
      setCount: (v: number) => onValueChange({ ...value, pet: v }),
    },
  ];

  return (
    <div
      className={`guest-popup ${className}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {optionList.map((option, index) => (
        <div key={index} className="option">
          <div>
            <div className="name">{option.name}</div>
            <div className="desc">{option.desc}</div>
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
