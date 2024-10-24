import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  faArrowUpFromBracket,
  faBed,
  faCircleCheck,
  faDumbbell,
  faElevator,
  faFan,
  faFire,
  faHeart,
  faKey,
  faKitchenSet,
  faKitMedical,
  faMap,
  faMessage,
  faSprayCanSparkles,
  faStar,
  faTag,
  faTv,
  faWifi,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Header } from '../../common/components/header/Header';
import { getRoom } from '../../data';
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

const ScoreBar = ({
  score,
  percentage,
}: {
  score: string;
  percentage: string;
}) => {
  const ratingBar = useRef<HTMLDivElement>(null);
  // const ratingBar = useRef<ElementRef<"div">>(null);

  if (ratingBar.current) {
    ratingBar.current.style.setProperty('--bar-width', percentage);
  }

  return (
    <div className={styles['rating-item']}>
      <span>{score}</span>
      <span className={styles['rating-bar']}>
        <div className={styles['bar-body']} ref={ratingBar} />
      </span>
    </div>
  );
};

const ReviewType = ({
  name,
  value,
  icon,
}: {
  name: string;
  value: number;
  icon: IconDefinition;
}) => {
  return (
    <div className={styles['score-item']}>
      <div>
        <div>{name}</div>
        <div className={styles['score-number']}>{value}</div>
      </div>
      <div className={styles['score-icon']}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

const getReview = (room: API.RoomDetail) => {
  const point = room.review_scores_rating / 20;
  const reviews = room.number_of_reviews;
  const reviewData = [
    {
      name: 'Cleanliness',
      value: room.review_scores_cleanliness / 2,
      icon: faSprayCanSparkles,
    },
    {
      name: 'Accuracy',
      value: room.review_scores_accuracy / 2,
      icon: faCircleCheck,
    },
    { name: 'Check-in', value: room.review_scores_checkin / 2, icon: faKey },
    {
      name: 'Communication',
      value: room.review_scores_communication / 2,
      icon: faMessage,
    },
    { name: 'Location', value: room.review_scores_location / 2, icon: faMap },
    { name: 'Value', value: room.review_scores_value / 2, icon: faTag },
  ];

  return (
    <div className={styles['info-box']}>
      <h2 className={styles['review-overall']}>
        <FontAwesomeIcon icon={faStar} />
        {point} {reviews} reviews
      </h2>
      <div className={styles['review-container']}>
        <div className={styles['score-item']}>
          <div>Overall rating</div>
          {room.ratings?.map((rating: API.Rating) => (
            <ScoreBar
              score={rating.label}
              percentage={rating.localized}
              key={rating.label}
            />
          ))}
        </div>
        {reviewData.map((review) => (
          <ReviewType
            name={review.name}
            value={review.value}
            icon={review.icon}
            key={review.name}
          />
        ))}
      </div>
    </div>
  );
};

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

  const PhotoGrids = getPhotoGrids(room);
  const Amenities = getAmenities(room.amenities);
  const Review = getReview(room);

  const hostSince = new Date(room.host_since);
  const now = new Date();

  return (
    <>
      {Header}
      <div className={styles['room-body']}>
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
        <div className={styles['general-info']}>
          <section>
            <h2>
              {room.room_type} in {room.host_location}
            </h2>
            <div>
              {room.accommodates} guests {room.bedrooms} bedrooms {room.beds}
            </div>
          </section>
        </div>
        <div className={styles['room-info']}>
          <div className={styles['info-box'] + ' ' + styles['host-box']}>
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
          <div className={styles['info-box']}>
            <div>
              <div>{room.summary}</div>
              <br />
              <h3>The space</h3>
              <div>{room.space}</div>
            </div>
          </div>
          <div className={styles['info-box']}>
            <h2>Where you&apos;ll sleep</h2>
            <div className={styles['room-info-box']}>
              <FontAwesomeIcon icon={faBed} />
              <div>Bedroom</div>
              <div>
                {room.beds} {room.bed_type}
              </div>
            </div>
          </div>

          <div className={styles['info-box']}>
            <h2>What this place offers</h2>
            {Amenities}
          </div>
        </div>
        {Review}

        <div className={styles['info-box']}>
          <h2>Neighborhood highlights</h2>
          <div>{room.neighborhood_overview}</div>
          <div>Show more </div>
        </div>
      </div>
    </>
  );
};
