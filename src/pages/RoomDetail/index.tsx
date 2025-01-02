import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../common/components/header/Header';
import { getRoom } from '../../data';
import { getBookingForm } from './BookingForm';
import styles from './index.module.scss';
import { getRoomOverview } from './Overview';
import { getReview } from './Review';
import { getRoomInfo } from './RoomInfo';

export const RoomDetail = () => {
  const roomId = useParams().roomId!;
  const [room, setRoom] = useState<API.RoomDetail>({} as API.RoomDetail);

  useEffect(() => {
    const queryRoom = async () => {
      const roomData = await getRoom(roomId);
      setRoom(roomData);
    };
    queryRoom();
  }, [roomId]);

  const RoomOverview = getRoomOverview(room);
  const RoomInfo = getRoomInfo(room);
  const BookingForm = getBookingForm(room);
  const Review = getReview(room);

  return (
    <>
      {Header}
      <div className={styles['room-page']}>
        {RoomOverview}
        <div className={styles['page-body']}>
          <div className={styles['info-container']}>{RoomInfo}</div>
          <div className={styles['form-container']}>{BookingForm}</div>
        </div>
        <div className={styles['info-box']}>{Review}</div>
        <div className={styles['info-box']}>
          <h2>Neighborhood highlights</h2>
          <div>{room.neighborhood_overview}</div>
          <div>Show more </div>
        </div>
      </div>
    </>
  );
};
