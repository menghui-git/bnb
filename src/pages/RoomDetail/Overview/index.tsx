import {
  faArrowUpFromBracket,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

const getPhotoGrids = (room: API.RoomDetail) => {
  return (
    <div className={styles['photo-grid-container']}>
      <div className={`${styles['photo']} ${styles['photo-main']}`}>
        <img src={room.xl_picture_url} alt="" />
      </div>
      <div className={styles['photo']}>
        <img src={room.xl_picture_url} alt="" />
      </div>
      <div className={styles['photo']}>
        <img src={room.xl_picture_url} alt="" />
      </div>
      <div className={styles['photo']}>
        <img src={room.xl_picture_url} alt="" />
      </div>
      <div className={styles['photo']}>
        <img src={room.xl_picture_url} alt="" />
      </div>
    </div>
  );
};

export const getRoomOverview = (room: API.RoomDetail) => {
  const PhotoGrids = getPhotoGrids(room);

  return (
    <>
      <div className={styles['room-header']}>
        <h1>{room.name}</h1>
        <div className={styles['action-nav']}>
          <div className={styles['action']}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <div>Share</div>
          </div>
          <div className={styles['action']}>
            <FontAwesomeIcon icon={faHeart} />
            <div>Save</div>
          </div>
        </div>
      </div>
      {PhotoGrids}
    </>
  );
};
