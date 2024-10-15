import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'app/store';
import { LeftButton, RightButton } from '../buttons';
import { setCheckDates } from '../header/SearchBar/SearchBarSlice';
import styles from './index.module.scss';

const daysInMonth = (month: number, year: number) => {
  // Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
  // but by using 0 as the day it will give us the last day of the prior
  // month.

  return new Date(year, month + 1, 0).getDate();
};

const getMonthInfo = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1);

  return {
    firstWeekDay: firstDay.getDay(),
    monthDays: daysInMonth(month, year),
  };
};

const getDateList = (month: number, year: number) => {
  const { firstWeekDay, monthDays } = getMonthInfo(month, year);
  const dateList = Array(firstWeekDay).fill('');
  for (let i = 1; i <= monthDays; i++) {
    dateList.push(i);
  }
  if ((firstWeekDay + monthDays) % 7 !== 0) {
    const paddingCount = 7 - ((firstWeekDay + monthDays) % 7);
    for (let i = 1; i <= paddingCount; i++) {
      dateList.push('');
    }
  }

  return dateList;
};

const WeekDay = ({ day }: { day: string }) => {
  return (
    <div className={styles['weekday-grid']}>
      <div className={styles.weekday}>{day}</div>
    </div>
  );
};

const CalendarDate = ({
  date,
  disabled,
  hoveredDate,
  onMouseOver,
}: {
  date: null | Date;
  disabled: boolean;
  hoveredDate?: Date;
  onMouseOver: () => void;
}) => {
  const dispatch = useAppDispatch();
  const searchBar = useSelector((state: RootState) => state.searchBar);
  const { checkIn, checkOut } = searchBar;
  const startDate = new Date(checkIn!);
  const endDate = new Date(checkOut!);

  const targetEndDate = endDate ?? hoveredDate;

  const inRange = () => {
    if (!date) return false;

    if (!startDate || !targetEndDate) return false;

    return (
      startDate < targetEndDate && date >= startDate! && date <= targetEndDate!
    );
  };

  const getDateState = () => {
    if (!startDate || !date) return 'none';
    if (+date === +startDate) {
      return 'left';
    }
    if (+date === +targetEndDate) {
      return 'right';
    }

    return 'none';
  };
  const state = getDateState();

  return (
    <div
      className={styles['date-bg']}
      data-in-range={inRange()}
      data-state={state}
    >
      <button
        className={styles.date}
        disabled={disabled}
        data-selected={state === 'left' || state === 'right'}
        onClick={() => dispatch(setCheckDates(date!.toISOString()))}
        onMouseOver={onMouseOver}
      >
        {date ? date.getDate() : null}
      </button>
    </div>
  );
};

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const Calendar = ({
  month,
  year,
  hoveredDate,
  setHoveredDate,
  showLeftButton = false,
  onLeftButtonClick,
  showRightButton = false,
  onRightButtonClick,
}: {
  month: number;
  year: number;
  hoveredDate?: Date;
  setHoveredDate: (value: Date) => void;
  showLeftButton?: boolean;
  onLeftButtonClick?: (e: ReactEventClick) => void;
  showRightButton?: boolean;
  onRightButtonClick?: (e: ReactEventClick) => void;
}) => {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const monthName = firstDay.toLocaleString('default', { month: 'long' });
  const dates = getDateList(month, year);

  const onMouseOver = (date: null | Date) => {
    if (date && date >= today) {
      setHoveredDate(date);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.title}>
        <LeftButton
          className={!showLeftButton ? 'hidden' : ''}
          onClick={onLeftButtonClick!}
        />
        <div className={styles.month}>{`${monthName} ${year}`}</div>
        <RightButton
          className={!showRightButton ? 'hidden' : ''}
          onClick={onRightButtonClick!}
        />
      </div>
      <div className={styles['date-container']}>
        {weekdays.map((day) => (
          <WeekDay key={day} day={day} />
        ))}
        {dates.map((dateNumber, index) => {
          const date = dateNumber ? new Date(year, month, dateNumber) : null;

          return (
            <CalendarDate
              key={index}
              date={date}
              disabled={date ? date < today! : true}
              hoveredDate={hoveredDate}
              onMouseOver={() => onMouseOver(date)}
            />
          );
        })}
      </div>
    </div>
  );
};
