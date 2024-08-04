import { LeftButton, RightButton } from '../buttons';
import './index.scss';

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
    <div className="weekday-grid">
      <div className="weekday">{day}</div>
    </div>
  );
};

const CalendarDate = ({
  date,
  state,
  disabled,
  inRange,
  onClick,
  onMouseOver,
}: {
  date: number;
  disabled: boolean;
  state: 'none' | 'left' | 'right';
  inRange: boolean;
  onClick: () => void;
  hoveredDate?: Date;
  onMouseOver: () => void;
}) => {
  return (
    <div className="date-bg" data-in-range={inRange} data-state={state}>
      <button
        className="date"
        disabled={disabled}
        data-selected={state === 'left' || state === 'right'}
        onClick={onClick}
        onMouseOver={onMouseOver}
      >
        {date}
      </button>
    </div>
  );
};

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const Calendar = ({
  month,
  year,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  hoveredDate,
  setHoveredDate,
  showLeftButton = false,
  onLeftButtonClick,
  showRightButton = false,
  onRightButtonClick,
}: {
  month: number;
  year: number;
  startDate?: Date;
  setStartDate: (value: Date) => void;
  endDate?: Date;
  setEndDate: (value: Date) => void;
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

  const onClick = (date: null | Date) => {
    if (!startDate) {
      setStartDate(date!);
    } else if (date! < startDate) {
      setStartDate(date!);
      setEndDate(null!);
    } else {
      setEndDate(date!);
    }
  };

  const onMouseOver = (date: null | Date) => {
    if (date && date >= today) setHoveredDate(date);
  };

  const getDateState = (date: number) => {
    const targetEndDate = endDate ? endDate : hoveredDate;
    if (!startDate) return 'none';
    if (month === startDate?.getMonth() && date === startDate?.getDate()) {
      return 'left';
    }
    if (
      month === targetEndDate?.getMonth() &&
      date === targetEndDate?.getDate()
    ) {
      return 'right';
    }

    return 'none';
  };

  const isInRange = (date: null | Date) => {
    if (!date) return false;

    const targetEndDate = endDate ? endDate : hoveredDate;
    if (!startDate || !targetEndDate) return false;

    return (
      startDate < targetEndDate && date >= startDate! && date <= targetEndDate!
    );
  };

  return (
    <div className="calendar">
      <div className="title">
        <LeftButton
          className={!showLeftButton ? 'hidden' : ''}
          onClick={onLeftButtonClick!}
        />
        <div className="month">{`${monthName} ${year}`}</div>
        <RightButton
          className={!showRightButton ? 'hidden' : ''}
          onClick={onRightButtonClick!}
        />
      </div>
      <div className="date-container">
        {weekdays.map((day, index) => (
          <WeekDay key={day} day={day} />
        ))}
        {dates.map((dateNumber, index) => {
          const date = dateNumber ? new Date(year, month, dateNumber) : null;

          return (
            <CalendarDate
              key={index}
              date={dateNumber}
              onClick={() => onClick(date)}
              disabled={date ? date < today! : true}
              state={getDateState(dateNumber)}
              inRange={isInRange(date)}
              hoveredDate={hoveredDate}
              onMouseOver={() => onMouseOver(date)}
            />
          );
        })}
      </div>
    </div>
  );
};
