import {
  faBed,
  faDumbbell,
  faElevator,
  faFan,
  faFire,
  faKitchenSet,
  faKitMedical,
  faTv,
  faWifi,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import roomPageStyles from '../index.module.scss';

const getAmenities = (amenities: string[] = []) => {
  const amenityIconMap: { [key: string]: IconDefinition } = {
    'Air conditioning': faFan,
    'Buzzer/wireless intercom': faWifi,
    'Elevator in building': faElevator,
    'First aid kit': faKitMedical,
    Gym: faDumbbell,
    Heating: faFire,
    Internet: faWifi,
    Kitchen: faKitchenSet,
    TV: faTv,
    'Wireless Internet': faWifi,
  };
  const DisplayCount = 8;
  // show the first 8 amenities
  const amenityItems = amenities.slice(0, DisplayCount).map((amenity) => (
    <div className={styles.amenity} key={amenity}>
      <FontAwesomeIcon
        className={styles['amenity-icon']}
        icon={amenityIconMap[amenity]}
      />
      {amenity}
    </div>
  ));

  return (
    <>
      <div className={styles['amenity-container']}>{amenityItems}</div>
      <div className={styles['amenity-info-box']}>
        Show all {amenities.length} amenities
      </div>
    </>
  );
};

export const getRoomInfo = (room: API.RoomDetail) => {
  const Amenities = getAmenities(room.amenities);

  const hostSince = new Date(room.host_since);
  const now = new Date();

  return (
    <>
      <div className={roomPageStyles['info-box']}>
        <section>
          <h2>
            {room.room_type} in {room.host_location}
          </h2>
          <div>
            {room.accommodates} guests {room.bedrooms} bedrooms {room.beds}
          </div>
        </section>
      </div>
      <div className={roomPageStyles['info-box'] + ' ' + styles['host-box']}>
        <img
          className={styles['host-pic']}
          src={room.host_picture_url}
          alt=""
        />
        <div>
          <div>Hosted by {room.host_name}</div>
          <div className={styles['host-info']}>
            {now.getFullYear() - hostSince.getFullYear()} years hosting
          </div>
        </div>
      </div>
      <div className={roomPageStyles['info-box']}>
        <div>
          <div>{room.summary}</div>
          <br />
          <h3>The space</h3>
          <div>{room.space}</div>
        </div>
      </div>
      <div className={roomPageStyles['info-box']}>
        <h2>Where you&apos;ll sleep</h2>
        <div className={styles['room-info-box']}>
          <FontAwesomeIcon icon={faBed} />
          <div>Bedroom</div>
          <div>
            {room.beds} {room.bed_type}
          </div>
        </div>
      </div>
      <div className={roomPageStyles['info-box']}>
        <h2>What this place offers</h2>
        {Amenities}
      </div>
    </>
  );
};
