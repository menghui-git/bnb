import { useRef, useState } from 'react';

import { Calendar } from 'common/components/Calendar';
import styles from './index.module.scss';

type Props = {
  className: string;
  startDate?: Date;
  setStartDate: (value: Date) => void;
  endDate?: Date;
  setEndDate: (value: Date) => void;
};

const monthCount = 12;
const tabList = ['Dates', 'Months', 'Flexible'];

export const DateRangePopup = ({
  className,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(tabList[0]);
  const [hoveredDate, setHoveredDate] = useState<null | Date>(null);

  const refCalendarRow = useRef<HTMLDivElement>(null);

  const getMonthYearList = (month: number, year: number, count: number) => {
    const list = [
      { month: month, year: year },
      { month: month, year: year },
    ];
    for (let i = 0; i < count; i++) {
      if (month < 11) {
        month++;
      } else {
        year++;
        month = 0;
      }
      list.push({ month: month, year: year });
    }

    return list;
  };

  const monthYearList = getMonthYearList(month, year, monthCount);

  const isFirstMonth = () => monthIndex === 0;

  const isLastMonth = () => monthIndex + 2 === monthCount;

  const resetPosition = (direction: 1 | -1) => {
    setTimeout(() => {
      setMonthIndex(monthIndex + direction);
      refCalendarRow.current!.style.setProperty(
        '--transition-position',
        'none',
      );
      refCalendarRow.current!.style.setProperty('--position', '0px');
    }, 500);
  };

  const setCalendarProps = (direction: 1 | -1) => {
    const node = refCalendarRow.current;
    if (node) {
      node.style.setProperty(
        '--position',
        `${node.children[0].scrollWidth * direction}px`,
      );
      node.style.setProperty('--transition-position', 'transform .5s');
    }
  };

  const onLeftButtonClick = (e: ReactEventClick) => {
    if (!isFirstMonth()) {
      setCalendarProps(1);
      resetPosition(-1);
    }
  };

  const onRightButtonClick = (e: ReactEventClick) => {
    if (!isLastMonth()) {
      setCalendarProps(-1);
      resetPosition(1);
    }
  };

  return (
    <div
      className={styles['calender-popup'] + ' ' + className}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles['tab-list']}>
        {tabList.map((tab, index) => (
          <button
            key={tab}
            className={styles.tab}
            data-selected={tab === selectedTab}
            onClick={() => setSelectedTab(tabList[index])}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles['calendar-row']} ref={refCalendarRow}>
        <Calendar
          month={monthYearList[monthIndex]['month']}
          year={monthYearList[monthIndex]['year']}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate!}
          setEndDate={setEndDate}
          hoveredDate={hoveredDate!}
          setHoveredDate={setHoveredDate}
        />
        <Calendar
          month={monthYearList[monthIndex + 1]['month']}
          year={monthYearList[monthIndex + 1]['year']}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate!}
          setEndDate={setEndDate}
          hoveredDate={hoveredDate!}
          setHoveredDate={setHoveredDate}
          showLeftButton={!isFirstMonth()}
          onLeftButtonClick={onLeftButtonClick}
        />
        <Calendar
          month={monthYearList[monthIndex + 2]['month']}
          year={monthYearList[monthIndex + 2]['year']}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate!}
          setEndDate={setEndDate}
          hoveredDate={hoveredDate!}
          setHoveredDate={setHoveredDate}
          showRightButton={!isLastMonth()}
          onRightButtonClick={onRightButtonClick}
        />
        <Calendar
          month={monthYearList[monthIndex + 3]['month']}
          year={monthYearList[monthIndex + 3]['year']}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate!}
          setEndDate={setEndDate}
          hoveredDate={hoveredDate!}
          setHoveredDate={setHoveredDate}
        />
      </div>
    </div>
  );
};
