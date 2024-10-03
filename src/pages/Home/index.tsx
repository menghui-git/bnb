import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'app/store';
import { loadNewPage, updateRooms } from 'pages/Home/roomListSlice';
import { searchRooms } from '../../data';
import { Card } from './components/Card';
import styles from './index.module.scss';

export const HomePage = () => {
  const lastCardRef = useRef(null);
  const currency = 'TWD';

  const roomListData = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRooms = async () => {
      const roomData = await searchRooms(
        roomListData.pageCount,
        roomListData.pageIndex,
      );

      dispatch(updateRooms(roomData));
    };
    getRooms();
  }, [roomListData.pageIndex]);

  useEffect(() => {
    const lastCard = lastCardRef.current;

    if (!lastCard) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(loadNewPage());
      }
    });

    if (lastCard) {
      observer.observe(lastCard);
    }

    return () => {
      if (lastCard) {
        observer.unobserve(lastCard);
      }
    };
  }, [roomListData.rooms]);

  return (
    <>
      <div className={`${styles['grid-container']} ${styles['result']}`}>
        {roomListData.rooms.map((room, index) => (
          <Card
            key={room.id + index}
            ref={index === roomListData.rooms.length - 1 ? lastCardRef : null}
            room={room}
            currency={currency}
          />
        ))}
      </div>
    </>
  );
};
